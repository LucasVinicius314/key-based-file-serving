import * as cors from 'cors'
import * as express from 'express'
import * as fs from 'fs'

import { keysDescriptor, router } from './routes'

const port = '3005'

const app = express()

app.use(cors({ origin: '*' }))

app.use(router)

app.listen(port, () => {
  if (!fs.existsSync(keysDescriptor)) {
    fs.writeFileSync(keysDescriptor, '[]')
  }

  console.log(`Listening on ${port}`)
})
