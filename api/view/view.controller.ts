import {IView, View} from './view.model'
import * as express from 'express'

export async function awaitIndex (req: express.Request, res: express.Response) {
  try {
    const lastVisit: IView = await View.create({
      visitedAt: new Date(),
      visitedBy: getIp(req),
    })

    const count: number = await View.count({})
    res.send({ count, lastVisit: lastVisit.public })

  } catch (error) {
    res.status(500).send({error: error.toString()})
  }
}

export async function promiseIndex (req: express.Request, res: express.Response) {
  View.create({
    visitedAt: new Date(),
    visitedBy: getIp(req),
  })
  .then((lastVisit: IView) => {
    View.count({}).then(count => {
      return res.send({count, lastVisit: lastVisit.public})
    })
  })
  .catch((error: Error) => {
    res.status(500).send({error: error.toString()})
  })
}

function getIp (req: express.Request): string {
  return (req.headers['x-forwarded-for'] || req.connection.remoteAddress) as string
}
