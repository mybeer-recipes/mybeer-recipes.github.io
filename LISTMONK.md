# Setting up listmonk for sign-ups

These forms add people to lists in listmonk at
<https://listmonk.mybeer.recipes>. listmonk then emails them a link to confirm
(double opt-in).

| Form | Page | List |
| --- | --- | --- |
| Request an invite | [/beta/](https://mybeer.recipes/beta/) | Beta – Homebrewers or Beta – Breweries, plus Product news if ticked |
| Get new posts by email | [/blog/](https://mybeer.recipes/blog/) | Blog |
| Join the waitlist | [/developers/](https://mybeer.recipes/developers/) | Developer API waitlist |
| Request access | [/data-api/](https://mybeer.recipes/data-api/#access) | Data API early access |

The blog, developers and Data API forms only ask for an email address. Until
their list is set in `config.yaml`, their buttons open an email to
`support@mybeer.recipes` instead.

For the beta page there are two ways to connect it. Start with **Option 1**, and add **Option 2**
later if you want to keep more of what people enter.

| | Option 1: listmonk only | Option 2: with the sign-up Worker |
| --- | --- | --- |
| Stores | Email, name, Homebrewer/Brewery (as the list they join) | Everything in Option 1, plus brewery name, devices and sign-up date |
| Needs | listmonk settings only | A Cloudflare account and a listmonk API user |

Menu names below are from listmonk v6.

---

## Option 1: listmonk only

### 1. Check the general settings

In **Settings → General**:

- **Root URL**: `https://listmonk.mybeer.recipes`, with no trailing slash.
  Confirmation links in emails are built from this.
- **Enable public subscription page**: on. (It's already on.)
- **Send opt-in confirmation**: on. Without it nobody gets the confirmation
  email, and the beta page's "Check your inbox" message would be wrong.

Save. Also check that **Settings → SMTP** can send email: use its test button
to send yourself a message.

### 2. Allow the website to talk to listmonk

In **Settings → Security → Trusted URLs**, add this on its own line:

```
https://mybeer.recipes
```

Save. This lets the site's forms submit in place and show its own
"Check your inbox" message. Without it, sign-ups still work, but people are
taken to listmonk's own confirmation page instead.

> **Leave "Enable CAPTCHA" off.** listmonk's CAPTCHA applies to its own form
> page, which the site's forms use when they can't submit in place (for example,
> with JavaScript turned off). The site's forms have no CAPTCHA widget, so turning
> it on would reject those sign-ups. The double opt-in email already stops
> spam sign-ups from getting mail.

### 3. Create the lists

In **Lists → + New**, create each of these:

| Name | Type | Opt-in |
| --- | --- | --- |
| Beta – Homebrewers | Public | Double opt-in |
| Beta – Breweries | Public | Double opt-in |
| Product news *(optional)* | Public | Double opt-in |
| Blog | Public | Double opt-in |
| Developer API waitlist | Public | Double opt-in |
| Data API early access | Public | Double opt-in |

The lists must be **Public**: listmonk won't let the public sign-up form add
anyone to a private list.

After saving, open each list and copy its **UUID** (the long ID such as
`cb487593-d517-49ee-99d5-a06bb7cb5892`). This is not the short number shown in
the list's URL.

### 4. Put the list IDs in the site config

In `config.yaml`, under `params.listmonk.lists`:

```yaml
  listmonk:
    url: https://listmonk.mybeer.recipes
    lists:
      homebrewer: <UUID of "Beta – Homebrewers">
      brewery: <UUID of "Beta – Breweries">
      news: <UUID of "Product news">   # or "" to hide the product news box
      blog: <UUID of "Blog">
      developers: <UUID of "Developer API waitlist">
      dataApi: <UUID of "Data API early access">
    signupEndpoint: ""
```

The "Also send me product news" box only appears on the beta page when `news`
is set (or when the Worker is set up, see Option 2). Leave `blog`, `developers`
or `dataApi` as `""` to keep that form's button opening an email instead.

Commit and push. The GitHub workflow rebuilds the site.

### 5. Test it

1. Open <https://mybeer.recipes/beta/>, choose **Brewery**, enter an email
   address you can read, and select **Join the waitlist**.
2. You should see **Check your inbox** on the page. If listmonk's own page
   opens instead, recheck step 2.
3. The subscriber shows up in **Subscribers**. Their "Beta – Breweries"
   subscription stays *unconfirmed* until you click the link in the email.
4. Click the link. The subscription changes to *confirmed*.
5. Repeat with the forms on [/blog/](https://mybeer.recipes/blog/),
   [/developers/](https://mybeer.recipes/developers/) and
   [/data-api/](https://mybeer.recipes/data-api/#access). Each should show
   **Check your inbox** under the form and add the subscriber to its own list.
6. Delete the test subscriber.

---

## Option 2: store brewery name and devices (sign-up Worker)

listmonk's public sign-up only accepts an email, a name and lists. To keep the
brewery name and devices too, the form can send sign-ups to a small Cloudflare
Worker (in `workers/beta-signup/`). The Worker adds each subscriber through
listmonk's admin API and stores the extra answers under `beta` in the
subscriber's attributes:

```json
{
  "beta": {
    "kind": "Brewery",
    "brewery": "Harbour Brewing Co",
    "devices": ["iOS", "Web"],
    "news": true,
    "signed_up": "2026-10-01T09:30:00.000Z"
  }
}
```

listmonk still sends the confirmation email. If the Worker can't be reached,
the beta page falls back to Option 1, so no sign-ups are lost.

Do Option 1 first: the Worker uses the same lists and settings. The Worker is
only used by the beta page; the blog, developers and Data API forms always go
straight to listmonk.

### 1. Create roles for the API user

Give the Worker only the access it needs.

1. **Users → User roles → + New**: name it `Beta sign-up`, and tick only
   **subscribers:manage**. Save.
2. **Users → List roles → + New**: name it `Beta lists`. Add "Beta – Homebrewers",
   "Beta – Breweries" and "Product news", each with **Get** and **Manage**
   ticked. Save.

### 2. Create the API user

**Users → + New**:

- **Type**: API
- **Username**: `beta-signup`
- **User role**: Beta sign-up
- **List role**: Beta lists

Save, then copy the **API token**. It's only shown once.

### 3. Deploy the Worker

You need a free Cloudflare account and Node.js (for `npx`).

1. In `workers/beta-signup/wrangler.toml`, set `LIST_HOMEBREWER`,
   `LIST_BREWERY` and `LIST_NEWS` to the same UUIDs as in `config.yaml`.
2. From `workers/beta-signup/`, run:

   ```sh
   npx wrangler login
   npx wrangler secret put LISTMONK_USER    # enter: beta-signup
   npx wrangler secret put LISTMONK_TOKEN   # paste the API token
   npx wrangler deploy
   ```

   `deploy` prints the Worker's URL, such as
   `https://mybeer-beta-signup.<your-subdomain>.workers.dev`.

3. Optional: in the Cloudflare dashboard, add a rate-limiting rule for the
   Worker (for example, 5 requests per minute per IP).

### 4. Point the site at the Worker

In `config.yaml`:

```yaml
    signupEndpoint: https://mybeer-beta-signup.<your-subdomain>.workers.dev
```

Commit and push, then repeat the test from Option 1. Open the test subscriber
in listmonk: the **Attributes** box should show the `beta` details.

People who were already subscribed are added to the lists, but their existing
attributes aren't changed.

---

## Using the sign-ups

In **Subscribers**, use **Advanced** query to filter:

```sql
-- Breweries (Option 2)
subscribers.attribs->'beta'->>'kind' = 'Brewery'

-- Anyone who'd test on Android (Option 2)
subscribers.attribs->'beta'->'devices' ? 'Android'
```

With Option 1 only, filter by list instead: pick "Beta – Breweries" in the list
filter. The same goes for the blog and waitlist sign-ups: pick "Blog",
"Developer API waitlist" or "Data API early access".

To send beta invites, create a campaign for the beta lists. Campaigns to double
opt-in lists only go to subscribers who confirmed.

## At launch

1. Set `params.appURL` in `config.yaml` to the web app's address. The site's
   app links then go to the web app instead of the beta page.
2. Restore the original button labels ("Open web app", "Log in", "Web app").
   Search `layouts/` for `BETA:`. At each match, delete the "Join the beta" line
   below the comment (if there is one), then remove the `{{/* BETA: …` and `*/}}`
   lines around the original.

## Troubleshooting

| What you see | Likely cause |
| --- | --- |
| A form's button opens an email instead of showing an email field | Its list in `config.yaml` (`blog`, `developers` or `dataApi`) is empty |
| listmonk's own page opens after signing up | `https://mybeer.recipes` is missing from **Trusted URLs** |
| "No valid lists selected to subscribe" | A list UUID in `config.yaml` is wrong, or the list is private |
| No confirmation email | **Send opt-in confirmation** is off, the list is single opt-in, or SMTP isn't working |
| "Something went wrong" under a form | listmonk rejected the sign-up. Check the list UUID and that the list is public. On the beta page with Option 2, see the next row |
| "Something went wrong" on the beta page (Option 2) | Check the Worker's logs with `npx wrangler tail`. Usually a wrong token, or the API user's list role is missing a beta list |
