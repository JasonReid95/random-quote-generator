// Creates newQuoteButton variable and stores a reference to the new quote button in index.html
const newQuoteButton = document.querySelector("#js-new-quote");

// Creates jsLoadIndicator variable and stores a reference to the js load indicator in index.html
const jsLoadIndicator = document.querySelector("#js-load-indicator");

// Creates endpoint variable and stores the address to "What Does Trump Think?"
const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

// Function that assigns the quote variable to the textContent property of quoteText variable
function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
}

// Asynchronous function that displays a new quote with flow and error handling
async function getQuote() {
// Removes hidden class from js load indicator when new quote is generating
    jsLoadIndicator.classList.remove("hidden");
// Disables new quote button while new quote is generating
    newQuoteButton.disabled = true;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw Error(response.statusText);
        }
        const json = await response.json();
        displayQuote(json.message);
    }
    catch {
        alert("Failed to fetch new quote.");
    }
    finally {
// Re-enables new quote button whether new quote is generated or not
        newQuoteButton.disabled = false;
// Adds hidden class back to js load indicator whether new quote is generated or not
        jsLoadIndicator.classList.add("hidden");
    }
}

// Adds an event listener that invokes getQuote function when newQuoteButton is clicked 
newQuoteButton.addEventListener("click", getQuote);
