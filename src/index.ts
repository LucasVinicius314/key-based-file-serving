import * as cors from 'cors'
import * as express from 'express'
import * as fs from 'fs'

import { router } from './routes'

export const keysDescriptor = './keys.json'

const port = '3005'

const app = express()

app.use(cors({ origin: '*' }))

app.use(router)

app.use((err, req, res, next) => {
  console.error(err.stack)

  res.status(500).send()
})

app.listen(port, () => {
  if (!fs.existsSync(keysDescriptor)) {
    console.info('Generating keys.json')

    fs.writeFileSync(keysDescriptor, '[]')
  }

  console.log(`Running on ${process.env.NODE_ENV}`)

  console.log(`Listening on ${port}`)
})
