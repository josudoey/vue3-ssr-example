import { createMatcher } from '../../router.js'

const matcher = createMatcher()
// ref https://github.com/vuejs/router/blob/a1611b6099403cfe9539ee8d4e9308b3a6a0175c/packages/router/src/router.ts#L434C4-L437C8
export function existsRoute (path) {
  const matchedRoute = matcher.resolve({ path: path })
  if (!matchedRoute.matched.length) {
    return false
  }
  return true
}
