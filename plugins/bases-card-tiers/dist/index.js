// Local Quartz plugin: base cards don't expose frontmatter as attributes, and
// CSS can't select on text. This adds a tiny client script that copies each
// card's `tier` property value onto the card as data-tier="gold|silver|...",
// and marks the first card of each new tier with data-tier-start, so
// custom.scss can outline cards by tier and start each tier on a new row. Plain JS on purpose: no build step.
const script = `
(function () {
  function tagTiers() {
    document.querySelectorAll(".bases-cards").forEach(function (grid) {
      var prev = null
      Array.prototype.forEach.call(grid.querySelectorAll(":scope > .bases-card"), function (card) {
        var el = card.querySelector('[data-property="tier"] .bases-card-value')
        var tier = el ? el.textContent.trim().toLowerCase() : ""
        if (tier) card.dataset.tier = tier
        else delete card.dataset.tier
        // first card of each tier run (cards are sorted by tier in the base)
        if (prev !== null && tier !== prev) card.dataset.tierStart = ""
        else delete card.dataset.tierStart
        prev = tier
      })
    })
  }
  document.addEventListener("nav", tagTiers)
  document.addEventListener("render", tagTiers)
  tagTiers()
})()
`

export const BasesCardTiers = () => ({
  name: "BasesCardTiers",
  // Quartz only accepts transformers that define a processing hook; this one
  // only ships a client script, so the hook is a no-op.
  htmlPlugins() {
    return []
  },
  externalResources() {
    return {
      js: [{ loadTime: "afterDOMReady", contentType: "inline", script }],
    }
  },
})
