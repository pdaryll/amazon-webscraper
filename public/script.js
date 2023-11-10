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
});