// Local Quartz transformer: Obsidian-style `![[file.svg]]` embeds are rendered by
// ObsidianFlavoredMarkdown as <object data="file.svg">, which isolates the SVG
// from page CSS (no theming, opaque backdrop). This swaps each such <object>
// for the SVG's own markup so the site's stylesheets can reach inside it.
// Plain JS on purpose: no build step, no dependencies.
import fs from "node:fs"
import path from "node:path"
import { visit } from "unist-util-visit"

// Minimal XML -> hast parser. Handles elements, attributes, text; skips the
// XML prolog, comments, doctype and CDATA. Sufficient for hand-made SVG files.
function parseSvg(source) {
  const root = { type: "root", children: [] }
  const stack = [root]
  const tokenRe = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<![^>]*>|<\/([\w:.-]+)\s*>|<([\w:.-]+)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>|([^<]+)/g
  const attrRe = /([\w:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
  let m
  while ((m = tokenRe.exec(source))) {
    const parent = stack[stack.length - 1]
    if (m[1]) {
      if (stack.length > 1) stack.pop()
    } else if (m[2]) {
      const properties = {}
      for (const a of (m[3] ?? "").matchAll(attrRe)) {
        const name = a[1]
        const value = decode(a[2] ?? a[3] ?? "")
        if (name.startsWith("xmlns")) continue // implied by the svg space
        properties[toProperty(name)] = name === "class" ? value.split(/\s+/).filter(Boolean) : value
      }
      const el = { type: "element", tagName: m[2], properties, children: [] }
      parent.children.push(el)
      if (!m[4]) stack.push(el)
    } else if (m[5] && stack.length > 1 && m[5].trim()) {
      parent.children.push({ type: "text", value: decode(m[5]) })
    }
  }
  return root.children.find((n) => n.type === "element" && n.tagName === "svg")
}

function toProperty(name) {
  if (name === "class") return "className"
  if (name.includes(":")) return name // e.g. xlink:href, keep verbatim
  if (name.startsWith("aria-") || name.startsWith("data-") || name.includes("-")) {
    return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  }
  return name
}

function decode(s) {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&")
}

export const InlineSvgEmbeds = () => ({
  name: "InlineSvgEmbeds",
  htmlPlugins(ctx) {
    const contentDir = ctx.argv.directory
    return [
      () => (tree, file) => {
        const slug = file.data.slug ?? ""
        const relDir = file.data.relativePath ? path.dirname(file.data.relativePath) : path.dirname(slug)
        visit(tree, "element", (node, index, parent) => {
          if (!parent || index === undefined || node.tagName !== "object") return
          const data = node.properties?.data
          if (node.properties?.type !== "image/svg+xml" || typeof data !== "string") return
          if (/^[a-z]+:\/\//i.test(data)) return

          const target = decodeURI(data.split(/[?#]/)[0])
          const candidates = [
            path.join(contentDir, path.dirname(slug), target),
            path.join(contentDir, relDir, target),
            path.join(contentDir, target),
          ]
          const svgPath = candidates.find((p) => p.startsWith(contentDir) && fs.existsSync(p))
          if (!svgPath) return

          let svg
          try {
            svg = parseSvg(fs.readFileSync(svgPath, "utf8"))
          } catch {
            return
          }
          if (!svg) return

          // Let CSS size it; keep viewBox for aspect ratio.
          delete svg.properties.width
          delete svg.properties.height
          const label = node.properties.ariaLabel
          if (typeof label === "string" && label) svg.properties.ariaLabel = label
          svg.properties.className = [
            ...(svg.properties.className ?? []),
            "inline-svg",
            `inline-svg-${path.basename(svgPath, ".svg")}`,
          ]

          parent.children[index] = svg
        })
      },
    ]
  },
})
