import * as fs from 'fs'

import { Entry } from '../typescript'
import { Router } from 'express'
import { keysDescriptor } from '..'

import path = require('path')

export const fileRouter = Router()

fileRouter.get(/\w+/, (req, res) => {
  const reqPath = req.path.substring(1)

  const data = fs.readFileSync(keysDescriptor).toString()

  const decoded = JSON.parse(data) as Entry[]

  const entry = decoded.find((f) => f.path === reqPath)

  if (entry === undefined) {
    res.status(403).send()

    return
  }

  const count = entry.count

  const descriptor = entry.descriptor

  if (count <= 0) {
    res.status(403).send()

    return
  }

  entry.count--

  decoded[decoded.indexOf(entry)] = entry

  const encoded = JSON.stringify(decoded)

  fs.writeFileSync(keysDescriptor, encoded)

  const targetPath = path.resolve(`./content/${descriptor}`)

  res.sendFile(targetPath)
})
