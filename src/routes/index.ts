import { Router } from 'express'
import { fileRouter } from './filerouter'

export const router = Router()

router.use(fileRouter)

router.all('*', (req, res) => {
  res.status(403).send()
})
