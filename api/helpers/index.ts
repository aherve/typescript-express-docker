import { Request, Response, RequestHandler } from 'express'

// Define a standard format for throwing exceptions
export interface ApiError {
  name: 'ValidationError' | 'Unauthorized' | 'Unknown' | 'BadRequestError' | 'NotFound' | 'Forbidden' | 'MongoError' | 'LimitRateExceeded'
  message: string
  code?: number
}

interface ApiMethodResponse<T> {
  statusCode?: number
  data: T
}

type ApiMethodDefinition<T> = (req: Request) => Promise<ApiMethodResponse<T>>

/*
 * Useful decorator. Helps to type the output of any api endpoint, and
 * always handle any exception if any
 */
export function apiMethod<T>(f: ApiMethodDefinition<T>): RequestHandler {
  return async function (req: Request, res: Response) {
    try {
      const { statusCode, data } = await f(req)
      if (data) {
        res.status(statusCode || 200).send(data)
      } else {
        res.sendStatus(statusCode || 200)
      }
    } catch (e) {
      handleError(res, e)
    }
  }
}

/*
 * Provide a nice error code
 */
export function handleError(res: Response, error: ApiError): void {
  if ('name' in error && (error.name === 'ValidationError' || error.name === 'BadRequestError')) {
    res.status(400).send({ error })
  } else if ('name' in error && error.name === 'Unauthorized') {
    res.status(401).send({ error })
  } else if ('name' in error && error.name === 'Forbidden') {
    res.status(403).send({ error })
  } else if ('name' in error && error.name === 'NotFound') {
    res.status(404).send({ error })
  } else if ('name' in error && error.name === 'LimitRateExceeded') {
    res.status(509).send({ error })
  } else if ('name' in error && error.name === 'MongoError' && error.code === 11000) {
    res.status(400).send({ name: 'Duplicate', message: 'DuplicateError' })
  } else {
    console.error(error)
    res.status(500).send({ error })
  }
  return
}

export function getIp(req: Request): string {
  return (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string
}
