const supertest = require('supertest')

describe('Resource API', () => {
  let request

  beforeEach(() => {
    request = supertest(process.env.RESOURCE_BASE_URL)
  })

  describe('addResource', () => {
    let actual

    beforeEach(async () => {
      const response = await request
        .post('/')
        .send({
          title: 'test-resource-title',
          description: 'test-resource-description',
          link: 'test-link'
        })
        .expect(201)

      actual = response.body
    })

    it('returns the registered clan id', () => {
      const idRegex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/

      expect(actual.title).toEqual('test-resource-title')
      expect(actual.description).toEqual('test-resource-description')
      expect(actual.link).toEqual('test-link')
      expect(actual.id).toMatch(idRegex)
    })
  })

  describe('getResources', () => {
    let actual

    beforeEach(async () => {
      const response = await request.get('/').expect(200)
      actual = response.body
    })

    it('returns the registered clans', () => {
      const idRegex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
      expect(actual.length).toEqual(1)
      expect(actual[0].title).toEqual('test-resource-title')
      expect(actual[0].description).toEqual('test-resource-description')
      expect(actual[0].link).toEqual('test-link')
      expect(actual[0].id).toMatch(idRegex)
    })
  })
})
