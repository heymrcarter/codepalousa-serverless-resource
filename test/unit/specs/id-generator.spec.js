describe('id generator', () => {
  let subject

  const idRegex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/

  beforeEach(() => {
    subject = require('../../../src/id-generator')
  })

  it('generates an ID', () => {
    expect(subject.generate()).toMatch(idRegex)
  })
})
