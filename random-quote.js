// Creates newQuoteButton variable and stores a reference to the new quote button in index.html
const newQuoteButton = document.querySelector("#js-new-quote");

// Creates endpoint variable and stores the address to "What Does Trump Think?"
const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

// Function that assigns the quote variable to the textContent property of quoteText variable
function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

// Asynchronous function that displays a new quote with flow and error handling
async function getQuote() {
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        displayQuote(json.message);
    }
    catch (err) {
        console.log(err);
        alert("Failed to fetch new quote.");
    }
}

// Adds an event listener that invokes getQuote function when newQuoteButton is clicked 
newQuoteButton.addEventListener("click", getQuote);

