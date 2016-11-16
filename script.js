var fs = require('fs');
var logStream;
var filesNumber;
var filesRead= 0;
fs.unlink('./output/save.json', function(err) {
  logStream = fs.createWriteStream('./output/save.json', {'flags': 'a'});
  logStream.write('[');
  fs.readdir('./voter_results', function(err, files) {
    filesNumber = files.length;
    files.forEach(function(file) {
      getContentFromFile(file);
    });
  });
});
function getContentFromFile(file){
  fs.readFile('./voter_results/'+ file, 'utf8', function (err,data) {
    if (err) {
      filesRead++;
      return console.log(err);
    }
    var obj = JSON.parse(data);
    console.log(obj.votedFor);
    switch (obj.votedFor){
      case 'Hickory':
        obj.party = 'republican';
        break;
      case 'Donny T':
        obj.party = 'democrat';
        break;
      case 'Herself and Kanye':
        obj.party = 'other';
        break;
    }
    obj.votedFor = 'Ross Perot';
    logStream.write(JSON.stringify(obj));
    filesRead++;
    console.log(filesRead);
    if(filesNumber != filesRead){
      logStream.write(',');
    }else{
      logStream.write(']');
    }
  });
}
