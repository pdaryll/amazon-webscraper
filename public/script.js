document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const keywordInput = document.getElementById('keyword');
    const resultsContainer = document.getElementById('results-container');
    
    // Calls the api endpoint from the backend which a keyword is required.
    searchButton.addEventListener('click', () => {
        const keyword = keywordInput.value;

        if (keyword) {
            fetch(`http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`)
                .then(response => response.json())
                .then(data => displayResults(data))
                .catch(error => console.error('Error:', error));
        } else {
            alert('Please enter a keyword to search.');
        }
    });

    function displayResults(products) {
        resultsContainer.innerHTML = '';
  
        if (products && products.length > 0) {
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                <div class="wrapper">
                    <div class="product-img">
                        <img src="${product.imageURL}" height="420" width="327">
                    </div>
                    <div class="product-info">
                        <div class="product-text">
                            <h1>${product.title}</h1>
                            <h2>${product.rating}</h2>
                            <div class="product-price-btn">
                                <button type="button">${product.reviews} reviews</button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                resultsContainer.appendChild(productDiv);
            });
        } else {
          resultsContainer.innerHTML = '<p>No results found.</p>';
        }
    }
});