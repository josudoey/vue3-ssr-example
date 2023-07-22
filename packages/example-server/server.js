import http from 'http'

export function createServer (app) {
  return http.createServer(app.callback())
}
