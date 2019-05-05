import * as supertest from 'supertest-as-promised'
import app from '../../app'
import { View } from './view.model'
import { expect } from 'chai'

const request = supertest(app)

describe('GET /api/views/visit', () => {

  before(async () => {
    await View.deleteMany({})
  })

  it('returns a new view', async () => {
    const t = await request.get('/api/views/visit')
    expect(t.status).to.equal(200)
    expect(t.body).to.have.property('lastVisit')
    expect(t.body).to.have.property('count', 1)
  })

  it('creates a view', async () => {
    expect(await View.countDocuments({})).to.equal(1)
  })

})
