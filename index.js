var pug = require('pug'),
  fs = require('fs'); 
var data = {
  title: "Practical Node.js",
  author: {
    twitter: "@azat_co",
    name: "Azat"
  },
  tags: ['express', 'node', 'javascript'],
  tableData:  [{name: "express", idade:2}, {name: "hapi"}, {name: "derby"}]
    
}
data.body = process.argv[2];

fs.readFile('template.pug', 'utf-8', function(error, source){
  var template = pug.compile(source);
  var html = template(data)
  console.log(html)
});
