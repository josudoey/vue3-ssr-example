export function renderPiniaStateScriptTag (app) {
  const { $pinia } = app.config.globalProperties
  if (!$pinia) {
    return ''
  }
  return `<script>window.__pinia=${JSON.stringify($pinia.state.value)}</script>`
}
