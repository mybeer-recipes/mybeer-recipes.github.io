---
title: mybeer.recipes
seoTitle: "mybeer.recipes: brewing software for homebrewers and breweries"
description: >-
  Brewing software for homebrewers and commercial breweries. Design recipes
  against their style, run each batch from mash to package, and track every lot
  of malt, hops and yeast, synced across your phone, desktop and the web.

hero:
  platforms: iOS · Android · macOS · Windows · Linux · Web
  title: Design the recipe. Brew the batch. Keep the stock straight.
  body: >-
    mybeer.recipes is brewing software for homebrewers and commercial
    breweries. Build recipes against their style, run each batch from mash to
    package, and track every lot of malt, hops and yeast, synced across your
    phone, desktop and the web.
  # Add a photo from assets/images to replace the striped placeholder.
  image: ""
  imageAlt: ""
  recipe:
    name: Harbour Light Pale Ale
    meta: American Pale Ale · All grain · 23 L
    stats:
      - { label: ABV, value: 5.2% }
      - { label: IBU, value: "38" }
      - { label: OG, value: "1.052" }
      - { label: FG, value: "1.012" }
      - { label: SRM, value: "6", swatch: true }
    fit:
      - { label: ABV, from: 30, span: 40, at: 48 }
      - { label: IBU, from: 25, span: 45, at: 52 }
      - { label: SRM, from: 20, span: 50, at: 34 }

features:
  - eyebrow: Recipes
    title: Every change shows what it does to the beer.
    body: >-
      Add fermentables, hops, cultures and water adjustments and watch ABV,
      bitterness, gravity and colour update as you go. Each number is checked
      against the style's range, so you know before brew day whether the recipe
      lands.
    demo: fermentables
  - eyebrow: Batches
    title: From planning to packaging, one batch sheet.
    body: >-
      Turn a recipe into a batch and follow it through planning, brewing,
      fermenting and conditioning. Step timers run on brew day, readings go
      straight onto the sheet, and the finished batch keeps its measured
      numbers beside the targets.
    demo: brewday
  - eyebrow: Inventory
    title: Know what's on the shelf before you brew.
    body: >-
      Book in lots as they arrive and each batch draws down from them. Recipes
      show when an ingredient is short, and the shopping list fills itself from
      what the next brew needs.
    demo: inventory

demos:
  fermentables:
    label: Example fermentables list in the recipe editor, with an estimated original gravity of 1.052
    total: 5.00 kg
    og: "1.052"
    items:
      - { name: Maris Otter, meta: Base malt · 3 EBC, amount: 4.20 kg, share: 84% }
      - { name: Crystal 60, meta: Caramel · 120 EBC, amount: 0.40 kg, share: 8% }
      - { name: Wheat malt, meta: Base malt · 4 EBC, amount: 0.40 kg, share: 8% }
  brewday:
    label: Example brew day timeline, with mash steps done and the boil in progress
    remaining: 42:18 left
    steps:
      - { name: Mash in, detail: 67 °C · 60 min, state: done }
      - { name: Mash out, detail: 76 °C · 10 min, state: done }
      - { name: Boil, detail: 60 min, state: now }
      - { name: Whirlpool, detail: 80 °C · 20 min, state: next }
      - { name: Chill and pitch, detail: 19 °C, state: next }
  inventory:
    label: Example inventory list, with Citra hops flagged as short and two items on the shopping list
    shopping: 2 items on the shopping list
    items:
      - { icon: grass, name: Maris Otter, meta: Lot 2409-A · best before Mar 2027, amount: 21.4 kg }
      - { icon: local_florist, name: Citra, meta: Pellet · 12.1% AA, amount: 180 g, short: true }
      - { icon: bubble_chart, name: US-05, meta: Dry yeast · 11.5 g packs, amount: 3 packs }

band:
  image: images/brewing-kit.jpg
  alt: Brewing kit on a workbench, from a plate chiller and ball valve to a stir plate, swing-top bottle and mash paddle

more:
  title: Also in the app
  items:
    - icon: menu_book
      title: Ingredient library
      body: Fermentables, hops, cultures and miscellaneous additions, plus your own equipment, mash, fermentation, water and packaging profiles.
    - icon: water_drop
      title: Water chemistry
      body: Start from your source water, add salts and acids, and see the projected profile and mash pH.
    - icon: timer
      title: Brew tracker
      body: Step timers with alerts, so the next addition does not depend on you watching the clock.
    - icon: group
      title: Team and roles
      body: Invite your brewery team and choose who can edit recipes, run batches or manage stock.
    - icon: cloud_sync
      title: Works offline
      body: Keep brewing when the signal drops. Changes sync when you reconnect, and conflicts are yours to settle.
    - icon: travel_explore
      title: Shared recipes
      body: Browse recipes other brewers publish, rate them, and copy one into your library.

audiences:
  - title: For homebrewers
    body: >-
      Keep your recipes, brew logs and ingredients in one place instead of a
      notebook and three spreadsheets. Browse recipes other brewers share and
      copy one into your library to make it your own.
    link: Nano from $4.99 a month
    # Add a photo from assets/images to replace the striped placeholder.
    image: ""
    imageAlt: ""
  - title: For breweries
    body: >-
      Run several brewhouses and locations from one account. Give each team
      member a role, keep a stock ledger across sites, and see every batch in
      progress, from a taproom to contract production.
    link: Micro to Macro plans
    image: ""
    imageAlt: ""

download:
  title: On every device you brew with
  body: >-
    One account on all of them. Changes sync when you're back online, so the
    phone on the brew stand and the desktop in the office always agree.
  # Add each store listing's URL when it is live. Platforms without a URL link
  # to params.appURL (the beta sign-up page for now).
  platforms:
    - { icon: phone_iphone, name: iPhone and iPad, store: App Store, url: "" }
    - { icon: android, name: Android, store: Google Play, url: "" }
    - { icon: laptop_mac, name: macOS, store: Mac App Store, url: "" }
    - { icon: desktop_windows, name: Windows, store: Microsoft Store, url: "" }
    - { icon: terminal, name: Linux, store: Snap · Flatpak, url: "" }
    - { icon: language, name: Web, store: Open in your browser, url: "" }

pricingTeaser:
  title: Plans sized to how much you brew
  body: >-
    From $4.99 a month for home brewing to $199.99 for national producers.
    Billed through your app store account, cancel any time.
---
