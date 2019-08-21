describe('resource repository', () => {
  let subject, db, idGenerator

  beforeEach(() => {
    const dbProvider = td.replace('../../../src/database-provider')
    idGenerator = td.replace('../../../src/id-generator')
    db = {
      scan: td.func(),
      put: td.func()
    }
    td.when(dbProvider.getInstance()).thenReturn(db)
    subject = require('../../../src/resource-repository')
  })

  describe('getAllResources', () => {
    let actual

    beforeEach(async () => {
      const promise = td.func()
      td.when(db.scan(td.matchers.anything())).thenReturn({ promise })
      td.when(promise()).thenResolve({
        Items: [{ id: 'resource id', resource: { title: 'title', description: 'description' } }]
      })
      actual = await subject.getAllResources()
    })

    it('queries the database', () => {
      const expectedQuery = {
        TableName: 'test-table'
      }
      td.verify(db.scan(expectedQuery))
    })

    it('returns all of the resources', () => {
      expect(actual).toEqual([
        {
          id: 'resource id',
          title: 'title',
          description: 'description'
        }
      ])
    })
  })

  describe('resource repository', () => {
    beforeEach(async () => {
      const promise = td.func()
      td.when(idGenerator.generate()).thenReturn('generated-id')
      td.when(db.put(td.matchers.anything())).thenReturn({ promise })
      td.when(promise()).thenResolve()
      const resource = {
        title: 'test',
        description: 'description',
        link: 'link'
      }
      actual = await subject.saveResource(resource)
    })

    it('saves the resource', () => {
      const expectedQuery = {
        TableName: 'test-table',
        Item: {
          id: 'generated-id',
          resource: {
            title: 'test',
            description: 'description',
            link: 'link'
          }
        }
      }
      td.verify(db.put(expectedQuery))
    })

    it('returns the created resource', () => {
      expect(actual.id).toEqual('generated-id')
      expect(actual.title).toEqual('test')
      expect(actual.description).toEqual('description')
      expect(actual.link).toEqual('link')
    })
  })
})
