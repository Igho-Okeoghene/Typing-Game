const quotes = [
    "HTML is a markup language that defines the structure of your content. HTML consists of a series of elements, which you use to wrap different parts of the content to make it appear a certain way",
    "All HTML documents must start with a document type declaration DOCTYPE html. The visible part of the HTML document is between body.",
    "The DOCTYPE declaration represents the document type, and helps browsers to display web pages correctly. It appears at the top of the page before any HTML tags.",
    "HTML headings are defined with the h1 to h6 tags. h1 defines the most important heading. h6 defines the least important heading.",
    "HTML paragraphs are defined with the p tag and HTML links are defined with the a tag",
    "HTML images are defined with the img tag. HTML attributes provide additional information about HTML elements and usually come in name/value pairs.",
    "HTML comments are not displayed in the browser. With comments you can place notifications and reminders in your HTML code",
    "You are going to be an awesome developer, as long as you keep practicing",
    "The HTML class attribute is used to specify a class for an HTML element. Multiple HTML elements can share the same class.",
    "The HTML id attribute is used to specify a unique id for an HTML element. You cannot have more than one element with the same id in an HTML document."
]
/*Connect the HTML elements to the DOM*/
const quote = document.getElementById("quote");
const input = document.getElementById("typed-value");
const start = document.getElementById("start");
const message = document.getElementById("message");
const details = document.querySelector(".details");
const reset = document.getElementById("reset");
const instructions = document.getElementById("instructions")
//Start button leads player to main game page and starts the game properly

let wordQueue; //This is the array of sentences.
let highlightPosition;
let startTime;

function startGame (){
    instructions.style.display = "none";
    details.style.display = "none";
    input.style.display = "block";
    const quoteIndex = Math.floor(Math.random()*quotes.length);
    const quoteText = quotes[quoteIndex];
    rocket.classList.add("shake-animation");

    wordQueue = quoteText.split(" ");
    //This splits the sentence so every word is checked through.
    quote.innerHTML = wordQueue.map((word) => `<span>${word}</span>`).join("");
    //map() checks through every word for similarities then join() combines the array again.

    highlightPosition = 0;
    quote.childNodes[highlightPosition].className = "highlight";
    // highight feature so the player knows which word he/she is currently typing.
    
    startTime = Date.now();
}

start.addEventListener("click", startGame);
input.addEventListener("input", checkInput);
reset.addEventListener("click", resetGame);
function checkInput(){ //a function to check what is being typed in the input element
    const currentWord = wordQueue[0]//.replaceAll(".","").replaceAll(",","");
    const typedValue = input.value.trim();//trim removes all white spaces when the player is typing to avoid throwing unneccessary errors
   
    if(currentWord !== typedValue){
        input.className = currentWord.startsWith(typedValue)
        ? ""
        : "error";//adds an "error" classname to the input element if the currentWord doesn't match the typed value
        return;//return ends the code here if the word doesn't match
    }
        input.value = ""; //this empties the input box
        wordQueue.shift();//shift removes the first item from an array.
        quote.childNodes[highlightPosition].className = "";// this removes the highlights from the words.
    
    if(wordQueue.length === 0){//if the quotes have been exhausted then game over
        gameOver();
        return;
    }

    highlightPosition ++;
    quote.childNodes[highlightPosition].className = "highlight";//this highlights the first word when a game starts.
}

function gameOver(){
    const elapsedTime = Date.now() - startTime;
    message.style.display="block";
    message.innerHTML = `<span>Congrats! you have completed the game in ${
        elapsedTime / 1000
      } seconds<span /> <br> Tap reset to play again`;//Time it took to finish typing
      reset.style.display = "block";
}

function resetGame(){
    startGame()
    message.style.display = "none";
}
