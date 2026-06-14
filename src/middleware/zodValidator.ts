import type { NextFunction, Request, Response } from 'express'
import type { ZodObject } from 'zod'

export const validatorMiddleware =
  (validatorZod: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await validatorZod.parseAsync(req)

      return next()
    } catch (error) {
      next(error)
    }
  }
