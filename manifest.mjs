import fs from 'fs'
import env from './env.cjs'
const manifest = JSON.parse(fs.readFileSync(env.manifestPath).toString())
export default manifest
