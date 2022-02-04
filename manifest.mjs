import fs from 'fs'
import env from './env.js'
const manifest = JSON.parse(fs.readFileSync(env.manifestPath).toString())
export default manifest
