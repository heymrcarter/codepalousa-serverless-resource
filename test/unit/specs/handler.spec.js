describe('handler', () => {
  let subject, resourceRepository

  beforeEach(() => {
    resourceRepository = td.replace('../../../src/resource-repository')
    subject = require('../../../src/handler')
  })

  describe('getResources', () => {
    let actual

    beforeEach(async () => {
      td.when(resourceRepository.getAllResources()).thenResolve(['the resources'])
      actual = await subject.getResources({})
    })

    it('returns the resources', () => {
      expect(actual).toEqual({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        body: '["the resources"]'
      })
    })
  })

  describe('addResource', () => {
    let actual

    beforeEach(async () => {
      const resource = {
        name: 'resource'
      }
      const event = {
        body: JSON.stringify(resource)
      }
      td.when(resourceRepository.saveResource(resource)).thenResolve({ name: 'created resource' })
      actual = await subject.addResource(event)
    })

    it('returns the resources', () => {
      expect(actual).toEqual({
        statusCode: 201,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080'
        },
        body: '{"name":"created resource"}'
      })
    })
  })
})
