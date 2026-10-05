---
name: contact-emails
description: Rules for which email addresses may appear on the mybeer.recipes site. Use whenever adding, editing or reviewing contact details, mailto links or email addresses in content/, layouts/, static/, workers/, config.yaml or docs/.
---

# Contact emails

Only these addresses may appear anywhere on the site:

| Address | Use for |
| --- | --- |
| `legal@mybeer.recipes` | Privacy policy, terms and conditions, other legal pages |
| `support@mybeer.recipes` | Help, support, beta sign-up and product questions |
| `email@mybeer.recipes` | General contact that is neither legal nor support |

Never use a personal email address, including the git author email or the email of the signed-in user. If you're unsure which address fits, use `support@mybeer.recipes` and say which one you chose.

## Checking

After any change that touches contact details, search the source and the built output for addresses that are not on the list:

```sh
grep -rnoIE "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}" --exclude-dir=.git --exclude-dir=node_modules . \
  | grep -vE "(legal|support|email)@mybeer\.recipes|you@brewery\.com"
```

`you@brewery.com` is the placeholder text in the sign-up form inputs, so the check ignores it.

Fix every hit in `content/` or `layouts/`, then also fix the matching file in `docs/`, the built site that GitHub Pages serves.
