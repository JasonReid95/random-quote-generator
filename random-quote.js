// Creates newQuoteButton and twitterButton variables and stores a reference to them in index.html
const newQuoteButton = document.querySelector("#js-new-quote");
const twitterButton = document.querySelector("#js-tweet");

// Creates jsLoadIndicator variable and stores a reference to the js load indicator in index.html
const jsLoadIndicator = document.querySelector("#js-load-indicator");

// Creates endpoint variable and stores the address to "What Does Trump Think?"
const endpoint = "https://api.whatdoestrumpthink.com/api/v1/quotes/random";

// Function that assigns the quote variable to the textContent property of quoteText variable
// and calls on setTwitterButton fucntion using quote variable as parameter
function displayQuote(quote) {
    const quoteText = document.querySelector("#js-quote-text");
    quoteText.textContent = quote;
    setTwitterButton(quote);
}

// Function that assigns the href attribute the value of
// https://twitter.com/share?text=${quote} - Donald Trump 
function setTwitterButton (quote) {
    twitterButton.href = `https://twitter.com/share?text=${quote} - Donald Trump`;
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
    catch(error) {
        console.log("Failed to fetch new quote:", error)
        alert("Failed to fetch new quote.");
    }
    finally {
// Re-enables new quote button whether new quote is generated or not
        newQuoteButton.disabled = false;
// Adds hidden class back to js load indicator whether new quote is generated or not
        jsLoadIndicator.classList.add("hidden");
    }
}

// Adds event listeners that invoke getQuote function when newQuoteButton is clicked and 
// opens a window to tweet when twitter button is clicked 
newQuoteButton.addEventListener("click", getQuote);
twitterButton.addEventListener("click", function() {
    window.open(twitterButton.href, "_blank", "width=600,height=300")
});

getQuote();