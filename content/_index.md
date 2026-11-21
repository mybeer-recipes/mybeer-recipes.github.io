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
  image: images/beer-taps.jpg
  imageAlt: A row of chrome beer taps along a bar wall
  recipe:
    name: Harbour Light Pale Ale
    meta: American Pale Ale · All grain · 23 L
    style: American Pale Ale
    stats:
      - { label: ABV, value: 5.2 % }
      - { label: IBU, value: "38" }
      - { label: OG, value: "1.052" }
      - { label: FG, value: "1.012" }
      - { label: Colour, value: 14 EBC, swatch: true }
    # Each track runs from min to max; the shaded band is the style's range
    # (BJCP 18B American Pale Ale) and the marker is the recipe's value.
    fit:
      - { label: ABV, value: 5.2, low: 4.5, high: 6.2, min: 3, max: 8, text: 5.2 % }
      - { label: IBU, value: 38, low: 30, high: 50, min: 10, max: 70, text: "38" }
      - { label: OG, value: 1.052, low: 1.045, high: 1.060, min: 1.035, max: 1.070, text: "1.052" }
      - { label: Colour, value: 14, low: 10, high: 20, min: 0, max: 40, text: 14 EBC }
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
    label: Example fermentables list in the recipe editor, with a 5 kg grist and an original gravity of 1.052
    summary: 5.00 kg grist · 3 additions
    og: "1.052"
    colour: 14 EBC
    items:
      - { name: Maris Otter, meta: UK · Grain · 3 EBC, amount: "4.20", unit: kg, share: 84 % }
      - { name: Crystal 60, meta: UK · Crystal · 120 EBC, amount: "0.40", unit: kg, share: 8 % }
      - { name: Wheat Malt, meta: DE · Grain · 4 EBC, amount: "0.40", unit: kg, share: 8 % }
  brewday:
    label: Example brew tracker during the boil, with 42 minutes 18 seconds left, the bittering hops added and the next additions due in 27 minutes
    batch: Batch 14 · Harbour Light Pale Ale
    title: Boil · 60 min
    step: Step 3 of 5
    remaining: "42:18"
    # How much of the step has run, as a percentage.
    done: 30
    additions:
      - { name: Magnum 18 g, detail: Bittering · at 60 min, state: Added, done: true }
      - { name: Citra 25 g, detail: Flavour · at 15 min, state: in 27:18 }
      - { name: Whirlfloc 1 tab, detail: Fining · at 15 min, state: in 27:18 }
  inventory:
    label: Example hop and malt stock, with Citra flagged as short for the next batch and two items on the shopping list
    shopping: 2 items on the shopping list
    items:
      - { icon: grass, name: Maris Otter, meta: Lot 2409-A · best before Mar 2027, amount: 21.4 kg }
      - { icon: local_florist, name: Citra, meta: Batch 15 needs 250 g, amount: 180 g, short: 70 g short }
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
    image: images/homebrew-setup.jpg
    imageAlt: Three stainless steel brewing kettles linked by a valve manifold on a workbench
  - title: For breweries
    body: >-
      Run several brewhouses and locations from one account. Give each team
      member a role, keep a stock ledger across sites, and see every batch in
      progress, from a taproom to contract production.
    link: Micro to Macro plans
    image: images/brewery-fermenters.jpg
    imageAlt: A row of numbered stainless steel conical fermenters in a brewery cellar

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
