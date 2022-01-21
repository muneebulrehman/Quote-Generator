const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const btnContainer = document.querySelector('.button-container');
const loader = document.querySelector('.loader');

let quotes = [];

function showLoadingSpinner() {
	// loader.hidden = false;
	// quoteContainer.hidden = true;
	quoteContainer.style.display = 'none';
	loader.classList.remove('hidden');
}

function hideLoadingSpinner() {
	// quoteContainer.hidden = false;
	// loader.hidden = true;
	quoteContainer.style.display = 'block';
	loader.classList.add('hidden');
}

// Load each quote
function eachQuote() {
	showLoadingSpinner();
	const quote =
		quotes.AllChapters[Math.floor(Math.random() * quotes.AllChapters.length)];
	if (!quote.En_Sanad) authorText.textContent = 'Unknown';
	authorText.textContent = quote.En_Sanad;
	if (quote.En_Text.length > 150) quoteText.classList.add('long-quote');
	else quoteText.classList.remove('long-quote');
	quoteText.textContent = quote.En_Text;
	hideLoadingSpinner();
}

btnContainer.addEventListener('click', function (e) {
	if (e.target.closest('#twitter')) {
		tweetTheQuote();
	}
	if (e.target.closest('#new-quote')) {
		eachQuote();
	}
});

async function getQuotes() {
	const apiUrl = 'https://ahadith-api.herokuapp.com/api/ahadith/all/en';
	try {
		const data = await fetch(apiUrl);
		quotes = await data.json();
		eachQuote(quotes);
	} catch (error) {
		alert('Something went wrong. Please try again');
	}
}
function tweetTheQuote() {
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
	window.open(twitterUrl, '_blank');
}

getQuotes();
