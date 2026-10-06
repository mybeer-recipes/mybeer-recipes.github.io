// Progressive enhancements. Every page works without this script.

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

// Mobile menu
(() => {
  const toggle = $("[data-menu-toggle]");
  const nav = $("#mobile-nav");
  if (!toggle || !nav) return;
  const setOpen = (open) => {
    nav.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    $('[data-menu-icon="open"]', toggle).hidden = open;
    $('[data-menu-icon="close"]', toggle).hidden = !open;
  };
  toggle.addEventListener("click", () => setOpen(nav.hidden));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !nav.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia("(min-width: 64rem)").addEventListener("change", (e) => e.matches && setOpen(false));
})();

// Cookie consent. The cookie keeps the format of the previous site
// ("analytics," when accepted, empty when declined) so earlier choices still apply.
(() => {
  const COOKIE = "mybeer.recipes.privacy";
  const banner = $("#cookie-banner");
  const measurementId = document.currentScript?.dataset.gaId;

  const readChoice = () => {
    const match = document.cookie.split("; ").find((c) => c.startsWith(COOKIE + "="));
    return match === undefined ? null : decodeURIComponent(match.slice(COOKIE.length + 1));
  };

  const saveChoice = (value) => {
    const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${COOKIE}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax; Secure`;
  };

  let analyticsLoaded = false;
  const loadAnalytics = () => {
    if (analyticsLoaded || !measurementId) return;
    analyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", measurementId, { anonymize_ip: true });
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
  };

  const showBanner = () => {
    if (banner) banner.hidden = false;
  };

  $$("[data-cookie-choice]").forEach((button) =>
    button.addEventListener("click", () => {
      const accepted = button.dataset.cookieChoice === "accept";
      saveChoice(accepted ? "analytics," : "");
      banner.hidden = true;
      if (accepted) {
        loadAnalytics();
      } else if (analyticsLoaded) {
        // Analytics was running this visit; reload so it stops.
        window.location.reload();
      }
    })
  );
  $$("[data-cookie-settings]").forEach((button) => button.addEventListener("click", showBanner));

  const choice = readChoice();
  if (choice === null) showBanner();
  else if (choice.split(",").includes("analytics")) loadAnalytics();
})();

// Pricing: monthly/yearly prices and the "What's included" panel for the chosen tier.
(() => {
  const root = $("[data-pricing]");
  if (!root) return;

  const periodToggle = $("[data-period-toggle]", root);
  periodToggle.hidden = false;
  $$("[data-period-button]", root).forEach((button) =>
    button.addEventListener("click", () => {
      const period = button.dataset.periodButton;
      $$("[data-period-button]", root).forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      $$("[data-period]", root).forEach((el) => (el.hidden = el.dataset.period !== period));
    })
  );

  const showPanel = (tier) =>
    $$("[data-tier-panel]", root).forEach((panel) => (panel.hidden = panel.dataset.tierPanel !== tier));
  $$("[data-tier-input]", root).forEach((input) => input.addEventListener("change", () => showPanel(input.value)));

  // Links such as /pricing/#tier-nano select that tier.
  const fromHash = window.location.hash.match(/^#tier-(.+)$/);
  const linked = fromHash && $(`[data-tier-input][value="${CSS.escape(fromHash[1])}"]`, root);
  if (linked) {
    linked.checked = true;
    showPanel(linked.value);
  }
})();

// Blog: filter posts by category.
(() => {
  const filters = $("[data-blog-filters]");
  if (!filters) return;
  filters.hidden = false;
  $$("[data-category]", filters).forEach((button) =>
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      $$("[data-category]", filters).forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      $$("[data-post-category]").forEach(
        (post) => (post.hidden = category !== "All" && post.dataset.postCategory !== category)
      );
    })
  );
})();

// Support: search articles, or pick a topic to list its articles.
(() => {
  const form = $("[data-support-search]");
  if (!form) return;
  const input = $("[data-support-query]", form);
  const title = $("[data-articles-title]");
  const empty = $("[data-articles-empty]");
  const articles = $$("[data-article]");
  form.hidden = false;

  const render = ({ query = "", topic = "" }) => {
    const q = query.trim().toLowerCase();
    let shown = 0;
    articles.forEach((article) => {
      let visible;
      if (topic) visible = article.dataset.topicName === topic;
      else if (q) visible = article.dataset.article.includes(q);
      else visible = !("more" in article.dataset);
      article.hidden = !visible;
      if (visible) shown++;
    });
    title.textContent = topic || (q ? "Results" : "Popular articles");
    empty.hidden = shown > 0;
  };

  input.addEventListener("input", () => render({ query: input.value }));
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    render({ query: input.value });
    $("#articles").scrollIntoView();
  });
  $$("[data-topic]").forEach((link) =>
    link.addEventListener("click", () => {
      input.value = "";
      render({ topic: link.dataset.topic });
    })
  );
})();

// listmonk sign-ups (the beta page, the blog and the waitlists): submit in place
// and show the "check your inbox" state. The beta form can go through the optional
// sign-up Worker instead. If the request can't be made from this page (for example,
// listmonk doesn't allow this site under Trusted URLs), fall back to posting the
// form normally, which shows listmonk's own confirmation page.
$$("[data-signup]").forEach((root) => {
  const form = $("form", root);
  const sent = $("[data-signup-sent]", root);
  const error = $("[data-signup-error]", root);
  const button = $('button[type="submit"]', form);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const email = String(data.get("email")).trim();
    const name = String(data.get("name") ?? "").trim();
    const showSent = () => {
      $("[data-signup-email]", sent).textContent = email;
      form.hidden = true;
      sent.hidden = false;
      sent.focus();
    };

    // Bots fill the honeypot; pretend it worked.
    if (data.get("nonce")) return showSent();

    const endpoint = form.dataset.endpoint;
    let body;
    if (endpoint) {
      const kind = $("[data-kind]:checked", form);
      body = {
        email,
        name,
        kind: kind.dataset.kind,
        brewery: kind.dataset.kind === "Brewery" ? String(data.get("brewery")).trim() : "",
        devices: data.getAll("devices"),
        news: $("[data-news]", form)?.checked || false,
      };
    } else {
      body = { email, name, list_uuids: [...new Set(data.getAll("l").filter(Boolean))] };
    }

    button.disabled = true;
    error.hidden = true;
    let response;
    try {
      response = await fetch(endpoint || form.dataset.api, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch {
      // Blocked or offline: let the browser post the form to listmonk instead.
      form.submit();
      return;
    } finally {
      button.disabled = false;
    }
    if (response.ok) showSent();
    else error.hidden = false;
  });

  $("[data-signup-reset]", sent).addEventListener("click", () => {
    form.reset();
    sent.hidden = true;
    form.hidden = false;
    $('input[name="email"]', form).focus();
  });
});
