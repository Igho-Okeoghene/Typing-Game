const quotes = [
    "he is a boy",
    "she is a girl",
    "they are both children"
]
/*Connect the HTML elements to the DOM*/
const quote = document.getElementById("quote");
const input = document.getElementById("typed-value");
const start = document.getElementById("start");
const message = document.getElementById("message");
//Start button leads player to main game page and starts the game properly

let wordQueue; //This is the array of sentences.
let highlightPosition;
let startTime;

function startGame (){
  
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

function checkInput(){ //a function to check what is being typed in the input element
    const currentWord = wordQueue[0].replaceAll(".","").replaceAll(",","");
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
    message.innerHTML = `<span>Congrats you have finished the game in ${
        elapsedTime / 1000
      } seconds<span />`;//Time it took to finish typing

}


