# Beta sign-up Worker

Optional. Without it, the beta form on `/beta/` posts straight to listmonk's
public API, which only stores the email, name and lists. With it, the brewer
type, brewery name and devices are also saved on each subscriber in listmonk
(as `attribs.beta`), so you can segment on them, e.g.
`subscribers.attribs->'beta'->>'kind' = 'Brewery'`.

## Set up

See "Option 2" in [LISTMONK.md](../../LISTMONK.md) at the repository root.
