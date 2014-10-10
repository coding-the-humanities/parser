let expect = require("chai").expect;

class Parser {

  parse(inputString){
    let parsedObject = this.parseString(inputString) || {};
    return parsedObject;
  }

  parseString(inputString){
    if(inputString){
      let lines = inputString.split('\n');
      return this.parseLines(lines);
    }
  }

  parseLines(lines){
    let parsedObject = {};
    let currentLevel = parsedObject;
    lines.forEach((line) => {
      let [key, value] = this.parseLine(line);
      if(!value){
        parsedObject[key] = {};
        currentLevel = parsedObject[key];
      } else {
        currentLevel[key] = value;
      }
    })
    return parsedObject;
  }

  parseLine(inputLine){
    let splittedLine = inputLine.split(": ");
    let cleanedLine = splittedLine.map((string)=>{
      let cleanedString= string.replace(/^\s+|\:$/g, '');
      return cleanedString;
    })
    return cleanedLine;
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

      it('correctly handles nested keys', () => {
        let object = parser.parse("person:\n   firstName: Reika");
        expect(object.person.firstName).to.equal("Reika");
      });

    })
  })
});
