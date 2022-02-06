import fs from 'fs'
import env from './env.cjs'
const { manifestPath } = env
const manifest = JSON.parse(fs.readFileSync(manifestPath).toString())
export default manifest
