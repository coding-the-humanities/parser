let expect = require("chai").expect;

function Parser(){
}

Parser.prototype.parse = function(inputLine){
  var parsedObject = {};
  if(inputLine){
    var parsedLine = inputLine.match(/(.+)\:\s+(.+)/);
    parsedObject[parsedLine[1]] = parsedLine[2];
  }
  return parsedObject;
}

context("parser", () => {

  it('instantiates a new parser', () => {
    let parser = new Parser();
    expect(parser).to.be.an.instanceof(Parser);
  });

  context("parse method", ()=>{

    describe("without arguments", ()=>{
      it('returns an empty card object', () => {
        let parser = new Parser();
        let object = parser.parse();
        expect(object).to.be.an.instanceof(Object);
      });
    });

    describe("with a single line argument", () => {
      it('returns an object', () => {
        let parser = new Parser();
        let object = parser.parse('title: Hello World');
        expect(object.title).to.equal("Hello World");
      });

      it('correctly parses the input string', () => {
        let parser = new Parser();
        let object = parser.parse("title: Goodbye World");
        expect(object.title).to.equal("Goodbye World");
      });

      it('should erase redundant whitespace', () => {
        let parser = new Parser();
        let object = parser.parse("title:  Goodbye World");
        expect(object.title).to.equal("Goodbye World");
      });
    })
  })
});
