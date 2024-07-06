const fs = require('fs');
const csv = require('output-onlinetools.csv');

// Array to store converted data
let convertedData = [];

// Read data from CSV file
fs.createReadStream('input.csv')
    .pipe(csv({ separator: ';' }))
    .on('data', (row) => {
        // Format the data as desired
        const formattedData = {
            capName: row.capName && typeof row.capName === 'string' ? row.capName.trim() : row.capName,
            capCode: parseInt(row.capCode),
            capProvinceShort: row.capProvinceShort && typeof row.capProvinceShort === 'string' ? row.capProvinceShort.trim() : row.capProvinceShort,
            capProvince: row.capProvince && typeof row.capProvince === 'string' ? row.capProvince.trim() : row.capProvince,
            capLat: parseFloat(row.capLat),
            capLon: parseFloat(row.capLon),
            company: {
                name: row.companyName && typeof row.companyName === 'string' ? row.companyName.trim() : row.companyName,
                id: parseInt(row.companyId)
            },
            status: row.status && typeof row.status === 'string' ? row.status.trim() : row.status,
            order: row.ord && typeof row.ord === 'string' ? row.ord.trim() : row.ord
        };
        
        convertedData.push(formattedData);
    })
    .on('end', () => {
        // Function to write the converted data to a new CSV file
        function writeConvertedDataToCSV(data, filename) {
            let csvContent = '"capName";"capCode";"capProvinceShort";"capProvince";"capLat";"capLon";"companyName";"companyId";"status";"order"\n';

            data.forEach(row => {
                csvContent += `"${row.capName}";"${row.capCode}";"${row.capProvinceShort}";"${row.capProvince}";"${row.capLat}";"${row.capLon}";"${row.company.name}";"${row.company.id}";"${row.status}";"${row.order}"\n`;
            });

            fs.writeFileSync(filename, csvContent);
        }

        writeConvertedDataToCSV(convertedData, 'output.csv');
    });