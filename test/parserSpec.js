let expect = require("chai").expect;

class Parser {
  constructor(){
    this.utils = new StringUtilities;
  }

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
        currentLevel[key] = {};
        currentLevel = currentLevel[key];
      } else {
        currentLevel[key] = value;
      }
    })
    console.log(parsedObject);
    return parsedObject;
  }

  parseLine(inputLine){
    let splittedLine = inputLine.split(": ");
    let cleanedLine = splittedLine.map((string) => {
      return this.utils.cleanString(string);
    });
    return cleanedLine;
  }
}


class StringUtilities {
  cleanString(string){
    return string.replace(/^\s+|\:$|\s+$/g, '');
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

    context("with a single line string", () => {

      it('returns an object', () => {
        let object = parser.parse('title: Hello World');
        expect(object.title).to.equal("Hello World");
      });

      it('correctly parses the input string', () => {
        let object = parser.parse("title: Goodbye World");
        expect(object.title).to.equal("Goodbye World");
      });

      it('should erase redundant whitespace before value', () => {
        let object = parser.parse("title:  Goodbye World");
        expect(object.title).to.equal("Goodbye World");
      });

      it('should erase redundant whitespace after value', () => {
        let object = parser.parse("title: Goodbye World   ");
        expect(object.title).to.equal("Goodbye World");
      });
    })

    context("multi line string", () => {

      it('correctly parses the input string', () => {
        let object = parser.parse("title: Goodbye World\ntype: Exercise");
        expect(object.title).to.equal("Goodbye World");
        expect(object.type).to.equal("Exercise");
      });

      desribe("with nested keys", () => {

        it('correctly parses the first level', () => {
          let object = parser.parse("person:\n   firstName: Reika");
          expect(object.person.firstName).to.equal("Reika");
        });

        it('correctly parses deeper levels', () => {
          let object = parser.parse("person:\n name:\n firstName: Reika");
          expect(object.person.name.firstName).to.equal("Reika");
        });
      });
    })
  })
});
