// Beta sign-up for mybeer.recipes/beta/.
//
// listmonk's public subscription API only accepts an email, a name and lists, so
// this Worker uses the admin API to also store what the form asks for (brewer
// type, brewery name, devices) as subscriber attributes under "beta".
// listmonk still sends its double opt-in confirmation email.

const DEVICES = ["iOS", "Android", "macOS", "Windows", "Linux", "Web"];
const KINDS = ["Homebrewer", "Brewery"];

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": env.ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "86400",
      Vary: "Origin",
    };
    const reply = (status, body) =>
      new Response(JSON.stringify(body), { status, headers: { ...cors, "Content-Type": "application/json" } });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return reply(405, { error: "Method not allowed" });
    if (request.headers.get("Origin") !== env.ALLOWED_ORIGIN) return reply(403, { error: "Forbidden" });

    let input;
    try {
      input = await request.json();
    } catch {
      return reply(400, { error: "Invalid JSON" });
    }

    const text = (value, max) => String(value ?? "").trim().slice(0, max);
    const email = text(input.email, 320).toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return reply(400, { error: "Invalid email" });
    const kind = KINDS.includes(input.kind) ? input.kind : "Homebrewer";
    const beta = {
      kind,
      brewery: kind === "Brewery" ? text(input.brewery, 200) : "",
      devices: Array.isArray(input.devices) ? DEVICES.filter((d) => input.devices.includes(d)) : [],
      news: input.news === true,
      signed_up: new Date().toISOString(),
    };
    const name = text(input.name, 200);
    const listUUIDs = [
      ...new Set([kind === "Brewery" ? env.LIST_BREWERY : env.LIST_HOMEBREWER, beta.news ? env.LIST_NEWS : ""].filter(Boolean)),
    ];

    const base = env.LISTMONK_URL.replace(/\/$/, "");
    const admin = (path, init = {}) =>
      fetch(base + path, {
        ...init,
        headers: {
          Authorization: `token ${env.LISTMONK_USER}:${env.LISTMONK_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

    // The admin API takes list IDs; map the configured UUIDs to IDs.
    const listsRes = await admin("/api/lists?per_page=all&minimal=true");
    if (!listsRes.ok) return reply(502, { error: "Could not reach the mailing list" });
    const lists = (await listsRes.json()).data;
    const listIDs = (Array.isArray(lists) ? lists : lists.results || [])
      .filter((l) => listUUIDs.includes(l.uuid))
      .map((l) => l.id);

    const created = await admin("/api/subscribers", {
      method: "POST",
      body: JSON.stringify({
        email,
        name: name || email.split("@")[0],
        status: "enabled",
        lists: listIDs,
        attribs: { beta },
        preconfirm_subscriptions: false,
      }),
    });
    if (created.ok) return reply(200, { ok: true });

    // Already a subscriber: add them to the lists through the public endpoint,
    // which handles existing subscribers and sends the opt-in email.
    if (created.status === 409) {
      const res = await fetch(`${base}/api/public/subscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, list_uuids: listUUIDs }),
      });
      if (res.ok) return reply(200, { ok: true });
    }

    console.log("listmonk sign-up failed", created.status, await created.text());
    return reply(502, { error: "Could not add you to the list" });
  },
};
