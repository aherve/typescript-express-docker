import { Request, Response, RequestHandler } from 'express'

export enum ErrorName {
  'BadRequestError' = 'BadRequestError',
  'Forbidden' = 'Forbidden',
  'LimitRateExceeded' = 'LimitRateExceeded',
  'MongoError' = 'MongoError',
  'NotFound' = 'NotFound',
  'Unauthorized' = 'Unauthorized',
  'Unknown' = 'Unknown',
  'ValidationError' = 'ValidationError',
}

// Define a standard format for throwing exceptions
export interface ApiError {
  name: ErrorName
  message?: string
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

export function getIp(req: Request): string {
  return (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string
}

function handleError(res: Response, error: any): void {
  if (isApiError) {
    handleApiError(res, error)
  } else {
    res.status(500).send({ error })
  }
}

/*
 * Provide a nice error code for proper ApiErrors
 */
function handleApiError(res: Response, error: ApiError): void {

  // error code can be overriden if necessary
  if (error.code) {
    res.status(error.code).send({ error })
    return
  }

  switch (error.name) {
    case ErrorName.ValidationError:
    case ErrorName.BadRequestError:
      res.status(400).send({ error })
      break
    case ErrorName.Unauthorized:
      res.status(401).send({ error })
      break
    case ErrorName.Forbidden:
      res.status(403).send({ error })
      break
    case ErrorName.NotFound:
      res.status(404).send({ error })
      break
    case ErrorName.LimitRateExceeded:
      res.status(509).send({ error })
      break
    case ErrorName.MongoError:
      res.status(400).send({ error })
      break
    case ErrorName.Unknown:
      res.status(500).send({ error })
      break
    default:
      assertUnreachable(error.name)
  }
}

function isApiError(err: any): err is ApiError {
  return typeof err === 'object' &&
    'name' in err &&
    Object.keys(ErrorName).includes(err.name) &&
    (['undefined', 'number'].includes(typeof err.code))
}

function assertUnreachable(_: never): never {
  throw new Error('Did not expect to reach this code')
}
