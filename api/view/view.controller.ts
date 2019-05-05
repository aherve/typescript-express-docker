import { View, IView } from './view.model'
import { apiMethod, getIp } from '../helpers';

export const visit = apiMethod<{ count: number; lastVisit: Partial<IView> }>(async req => {
  const lastVisit = await View.create({
    visitedAt: new Date(),
    visitedBy: getIp(req),
  })

  const count = await View.countDocuments({})
  return {data: {
    count,
    lastVisit: {
      visitedBy: lastVisit.visitedBy,
      visitedAt: lastVisit.visitedAt,
    }
  }}
})
