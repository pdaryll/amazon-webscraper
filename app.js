const express = require('express');
const {fetchAmazonSearchResults, extractProductDetails} = require('./scraper');

const app = express();
const port = 3000;

// Added "Access Control Allow Origin" headers. Failing to do so
// will result in an error when requesting our api endpoint.
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

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  