const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/Users/siwoobaek/dlog/.cache/dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("/Users/siwoobaek/dlog/src/pages/404.js"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("/Users/siwoobaek/dlog/src/pages/index.tsx"))),
  "component---src-pages-profile-js": hot(preferDefault(require("/Users/siwoobaek/dlog/src/pages/profile.js"))),
  "component---src-pages-using-typescript-tsx": hot(preferDefault(require("/Users/siwoobaek/dlog/src/pages/using-typescript.tsx"))),
  "component---src-templates-post-template-tsx": hot(preferDefault(require("/Users/siwoobaek/dlog/src/templates/PostTemplate.tsx")))
}

