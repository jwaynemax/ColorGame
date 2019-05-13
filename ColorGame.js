var numSquares = 6;
//variable colors created to assign to each square a specific color
var colors = [];
//variable pickedColor that specifies the color we have picked to display and be the correct answer
var pickedColor;
//variable squares created to select the each class assigned to the divs that hold the outline of the squares where the colors will go
var squares = document.querySelectorAll(".square");
//variable colorDisplay created which assigns the actual color to the title where we have placed the span tag for the correct answer
var colorDisplay = document.getElementById("colorDisplay");
//variable for message that displays in header div when the selection is right or wrong
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons =  document.querySelectorAll(".mode");

init();

function init(){
    setUpModeButtons();
    setUpSquares();
    reset();
}

function setUpModeButtons(){
    for(var i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            //ternary operator
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            reset();
        });
    }    
}

function setUpSquares(){
    for(var i = 0; i < squares.length; i++) {
        //add an event that when a square is clicked...
        squares[i].addEventListener("click", function(){
            //variable clicked color
            var clickedColor = this.style.backgroundColor;
            //if the clickedColor is equal to the pickedColor
            if(clickedColor === pickedColor) {
                //the answer is correct
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                //run function that changes the colors of all of the squares when answer is correct
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
            //else the answer is wrong
            } else {
                //changes the color to match the background when incorrect
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Try Again!";
            }
        });    
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    resetButton.textContent = "New Colors";
    messageDisplay.textContent = ""; 
    for(var i = 0; i < squares.length; i++){
        //loop assigns each color in variable colors to the class qaure
        if(colors[i]){
        squares[i].style.display = "block";    
        squares[i].style.backgroundColor = colors[i];    
        } else{
            squares[i].style.display = "none";
        }
    }
    h1.style.backgroundColor = "steelblue";
}

resetButton.addEventListener("click", function(){
   reset();    
});

function changeColors(color) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

//when function pickColor is called
function pickColor() {
    //pick a random number between 0-5 which matches the array of colors - assign that value to variable random
    //Math.floor removes everything after the decimal - Math.random generates the random number 
   var random = Math.floor(Math.random() * colors.length);
   //return colors with the number assigned to random
   return colors[random]; 
}

function generateRandomColors(num){
    var arr = [];
    for(var i = 0; i < num; i++){
        arr.push(randomColor())
    }
    return arr;
}

function randomColor(){
    var red = Math.floor(Math.random() * 256)
    var green = Math.floor(Math.random() * 256)
    var blue = Math.floor(Math.random() * 256)
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}