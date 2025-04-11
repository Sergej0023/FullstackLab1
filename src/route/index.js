import express from "express";
import {router as dishesRouter} from './dishRoute.js'

export const router = express.Router()

router.use('/api', dishesRouter)

