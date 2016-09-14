import * as express from 'express'

export async function ping (req: express.Request, res: express.Response) {
  res.status(200).send({ping: 'pong'})
  await delay(1000)
  console.log('hello. I waited 1000 ms without blocking the thread')
}

function delay (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
