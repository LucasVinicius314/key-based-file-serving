import { Router } from 'express'
import { fileRouter } from './filerouter'

export const keysDescriptor = '/keys.json'

export const router = Router()

router.use(fileRouter)
