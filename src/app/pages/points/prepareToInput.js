var fs = require('fs');
var csv = require('csv-parser');
const { parse } = require('json2csv'); // Import the parse function
var dataArray = [];
var fileName = "prepared-csv.csv"

fs.createReadStream('output.csv')
  .pipe(csv())
  .on('data', function (data) {
    data.companyId = 1
    data.companyName = "Cristallo srls"
    data.status = 'published';
    data.order = '';
    dataArray.push(data);
  })
  .on('end', function(){
    try {
      var opts = { fields: Object.keys(dataArray[0]) }; // Define fields for CSV
      var result = parse(dataArray, opts); // Use the parse function
      fs.writeFileSync(fileName, result);
    } catch (err) {
      console.error(err);
    }
  });
  