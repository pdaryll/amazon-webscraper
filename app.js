const express = require('express');
const path = require('path');
const {fetchAmazonSearchResults, extractProductDetails} = require('./scraper');

const app = express();
const port = 3000;

// This will make the default endpoint return the required html file and view it
// directly in a browser for easy viewing. This will only work if there is a folder
// named "public" with an "index.html".
app.use(express.static('public'));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

// Fetching the endpoint from the script.js results in it being 
// blocked by the cors policy so we must add "Access Control Allow Origin" 
// in the headers. But sometimes running the code without this is perfectly
// fine for some reason. 
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/api/scrape', async (req, res) => {
    const keyword = req.query.keyword;
  
    if (!keyword) {
      return res.status(400).json({ error: 'Keyword is required' });
    }
  
    const html = await fetchAmazonSearchResults(keyword);
    const products = extractProductDetails(html);
  
    if (products) {
      res.json(products);
    } else {
      res.status(500).json({ error: 'Error scraping Amazon' });
    }
});

// To be shown in the console/terminal.
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log("Use Crtl+C to turn off server")
    console.log("Open page here: http://localhost:3000")
});
  