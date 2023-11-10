const express = require('express');
const {fetchAmazonSearchResults, extractProductDetails} = require('./scraper');

const app = express();
const port = 3000;

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
  