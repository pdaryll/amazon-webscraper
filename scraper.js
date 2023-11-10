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

function extractProductDetails(html) {
    const $ = cheerio.load(html);
    const products = [];

    //The product class changes depending on if the search results are shown in a list 
    //(if there are only a few items) or in a grid (if there are a lot of items). The initial
    //classes are for when the results are shown in a list.
    let view = "div.sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16";
    let productName = "span.a-size-medium.a-color-base.a-text-normal";

    //Checking if there are list classes. If not, then change it to the grid classes.
    if ($(view).length == 0){
        view = "div.sg-col-4-of-24.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.s-widget-spacing-small.sg-col-4-of-20";
        productName = 'span.a-size-base-plus.a-color-base.a-text-normal';
    }
    
    //Iterating through each product and storing the data.
    $(view).each((index, element) => {
        const item = $(element)
        let review = item.find("span.a-size-base.s-underline-text").text()

        const product = {
        title: item.find(productName).text(),
        rating: item.find('span.a-icon-alt').text(),

        //Checks if there are reviews. If none, then returns "NO".
        reviews: ((review == "")? "NO" : review),

        imageURL: item.find('img.s-image').attr('src'),
        };
        
        products.push(product);
    });

    return products;
};

module.exports = {
    fetchAmazonSearchResults,
    extractProductDetails
};
