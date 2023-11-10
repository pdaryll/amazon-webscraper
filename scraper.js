const axios = require('axios');
const cheerio = require('cheerio');

async function fetchAmazonSearchResults(keyword) {
    try {
        const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;

        //Had an experience where axios.get() returned an error,
        //the commented code below should fix that if ever.

        // const response = await axios.get(url, {
        //     headers:{Accept: "application/json",
        //     "User-Agent":"axios 1.6.1"}
        // });
        
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching Amazon search results:', error);
        return null;
    }
}