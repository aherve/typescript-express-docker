import { Request, Response, RequestHandler } from 'express'

export enum ErrorName {
  'BadRequestError',
  'Forbidden',
  'LimitRateExceeded',
  'MongoError',
  'NotFound',
  'Unauthorized',
  'Unknown',
  'ValidationError',
}

// Define a standard format for throwing exceptions
export interface ApiError {
  name: ErrorName
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
export function handleError(res: Response, error: ApiError) {
  if (!('name' in error)) {
    console.error(error)
    return res.status(500).send({ error })
  }

  switch (error.name) {
    case ErrorName.ValidationError:
    case ErrorName.BadRequestError:
      return res.status(400).send({ error })
    case ErrorName.Unauthorized:
      return res.status(401).send({ error })
    case ErrorName.Forbidden:
      return res.status(403).send({ error })
    case ErrorName.NotFound:
      return res.status(404).send({ error })
    case ErrorName.LimitRateExceeded:
      return res.status(509).send({ error })
    case ErrorName.MongoError:
      return res.status(400).send({ error })
    case ErrorName.Unknown:
      return res.status(500).send({ error })
    default:
      assertUnreachable(error.name)
      break
  }
}

function assertUnreachable(_: never): never {
  throw new Error('Did not expect to reach this code')
}

export function getIp(req: Request): string {
  return (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string
}
