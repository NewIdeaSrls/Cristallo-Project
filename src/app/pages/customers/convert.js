const fs = require('fs');

// Function to convert JSON to CSV
function jsonToCSV(jsonArray) {
    // Extract column headers by collecting all keys from nested data objects
    const keysSet = new Set();
    jsonArray.forEach(entry => {
        entry.data.forEach(innerEntry => {
            Object.keys(innerEntry.data).forEach(key => {
                keysSet.add(key);
            });
        });
    });
    const headers = Array.from(keysSet);

    // Create CSV string with headers
    let csvContent = headers.join(',') + '\r\n';

    // Loop over the JSON array to build the CSV rows
    jsonArray.forEach(entry => {
        entry.data.forEach(innerEntry => {
            const row = headers.map(header => {
                const value = innerEntry.data[header] || ''; // Use empty string if key is not found
                return `"${value}"`; // Escape double quotes
            }).join(',');
            csvContent += row + '\r\n';
        });
    });

    return csvContent;
}

// Function to load JSON from a file
function loadJsonFromFile(filePath) {
    try {
        // Read the file's content
        const content = fs.readFileSync(filePath, 'utf8');

        // Parse the JSON content and return
        return JSON.parse(content);
    } catch (err) {
        console.error(`Error reading file from disk: ${err}`);
        throw err; // Rethrow error after logging it out
    }
}

// Load JSON data from `data.json`
const jsonData = loadJsonFromFile('data.json');

// Convert the JSON data to CSV
const csvData = jsonToCSV(jsonData);

// Write CSV content to a file
fs.writeFile('output.csv', csvData, 'utf8', (err) => {
    if (err) {
        console.error('There was an error writing the CSV file:', err);
    } else {
        console.log('CSV file has been saved as "output.csv".');
    }
});
