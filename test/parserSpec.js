let expect = require("chai").expect;

class Parser {

  constructor(){
    this.parsedObject = {};
  }

  parse(inputString){
    if(inputString){
      let [, key, value] = this.parseLine(inputString);
      this.parsedObject[key]= value;
    }
    return this.parsedObject;
  }

  parseLine(inputLine){
    return inputLine.match(/(.+)\:\s+(.+)/);
  }
}

context("parser", () => {

  let parser;

  beforeEach(() => {
    parser = new Parser();
  })

  it('instantiates a new parser', () => {
    expect(parser).to.be.an.instanceof(Parser);
  });

  context("parse method", ()=>{

    describe("without arguments", ()=>{
      it('returns an empty card object', () => {
        let object = parser.parse();
        expect(object).to.be.an.instanceof(Object);
      });
    });

    describe("with a single line string", () => {

      it('returns an object', () => {
        let object = parser.parse('title: Hello World');
        expect(object.title).to.equal("Hello World");
      });

      it('correctly parses the input string', () => {
        let object = parser.parse("title: Goodbye World");
        expect(object.title).to.equal("Goodbye World");
      });

      it('should erase redundant whitespace', () => {
        let object = parser.parse("title:  Goodbye World");
        expect(object.title).to.equal("Goodbye World");
      });
    })

    describe("with a multi line string", () => {

      it('correctly parses the input string', () => {
        let object = parser.parse("title: Goodbye World\ntype: Exercise");
        expect(object.title).to.equal("Goodbye World");
        expect(object.type).to.equal("Exercise");
      });

    })
  })
});
