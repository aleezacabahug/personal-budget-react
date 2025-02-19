const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Require the file system module

const app = express();
const port = 3000;

app.use(cors());

// Function to read the budget data from the JSON file
function getBudgetData() {
    // Read the file synchronously; you can also use async/await pattern if preferred
    const jsonData = fs.readFileSync('data.json');
    const budget = JSON.parse(jsonData);
    return budget;
}

// Endpoint to get budget data
app.get('/budget', (req, res) => {
    const budgetData = getBudgetData();
    console.log('!!!' + budgetData); 
    res.json(budgetData);
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});
