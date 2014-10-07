var expect = require("chai").expect;


xcontext("parser", () => {
  it('should be able to instantiate a new parser', () => {
    let parser = new Parser();
    expect(parser).to.be.an.instanceof(Parser);
  });

  context("parse method", ()=>{

    describe("without arguments", ()=>{
      it('should return an empty card object', () => {
        let parser = new Parser();
        let object = parser.parse();
        expect(object).to.be.an.instanceof(Object);
      });
    });

    describe("with a single line argument", () => {
      it('should return an object', () => {
        let parser = new Parser();
        let object = parser.parse('title: Hello World');
        expect(object.title).to.equal("Hello World");
      });
    })

    describe("with a single line argument", () => {
      it('should erase redundant whitespace', () => {
        let parser = new Parser();
        let object = parser.parse("title:     Goodbye World");
        expect(object.title).to.equal("Goodbye World");
      });
    })
  })
});
