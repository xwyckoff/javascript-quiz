let questionText = $('#questionText')
let timer = $("#timer");
let ansOptions = $("#questions");
let startButton = $("#startButton");
let questionContainer = $("#questionContainer");
let scoreList = $("#scoreList");
let timeLeft = 20;
let score = 0;
let getHighScore = JSON.parse(localStorage.getItem('highScores') || "[]");
let submitScore = $("<button></button>");
let submitName = $("<input>");
let timeout;

let quizList = [];
let currentQuestion;

console.log(getHighScore);
//define a question class that takes the main question text, 3 incorrect answers, and the correct answer
class Question {
    constructor(question, opt1, opt2, opt3, correctAns) {
        this.question = question;
        this.options = [opt1, opt2, opt3, correctAns];
        this.correctAns = correctAns;
    }
    //method to display the question text on the page
    setQuestionText() {
        questionText.text(this.question);
    }

    //method to display all the answer options
    setAnswerOpts() {
        //first clear all the list items from the list of answers and clear the previous event listener
        ansOptions.empty();
        ansOptions.off();
        //randomly shuffles the array of answer options around so they aren't always in the same order (explanation written for future reference)
        //array.sort takes a function that will determine how the array is sorted if a positive or negative number is returned from the function
        //if positive, it will place element a after element b, if negative it places element a before element b, and if equal to 0, it will keep them how they are
        //this function will randomly return a negative or positive number, thus randomly moving the elements around in the array
        this.options.sort((a, b) => 0.5 - Math.random());

        //creates a list element for each answer option
        this.options.forEach(ans => {
            let answerEl = $('<li>');
            let answerElButton = $('<button>')
            answerElButton.text(ans);
            answerElButton.addClass("btn");
            answerEl.append(answerElButton);
            ansOptions.append(answerEl);
        });
    }
}

let test = new Question("test", "1", "2", "3", "4");
let test2 = new Question("test2", "5", "6", "7", "8");
quizList = [test, test2];
//function to run the quiz, takes the list of questions for the quiz

function startQuiz() {
    //start the timer for the quiz, set the current question to the first question, and remove the starter text
    $('#starterText').empty();
    currentQuestion = 0;
    askQuestion(currentQuestion);

    timeout = setInterval(() => {
        timer.text("Time: " + timeLeft);
        timeLeft--;
    
        if(timeLeft == 0){
            timer.empty();
            endQuiz();
        }
    }, 1000);
}

//function to end the quiz, displays high score and gives option to save high score
function endQuiz() {
    //removing the current question text and adding the "all done" screen
    score = timeLeft;
    timer.empty();
    clearInterval(timeout);
    questionText.empty();
    questionText.text("All done!");
    ansOptions.empty();
    startButton.remove();
    $('#starterText').text("Your final score is " + score);

    //create input text box
    submitName.attr("type","text");
    submitName.attr("id","nameInput");
    questionContainer.append(submitName);

    //create submit score button
    submitScore.text("Submit");
    submitScore.addClass("btn");
    submitScore.attr("onclick","sendScore();")
    questionContainer.append(submitScore);
}

//function to display the question and what to do when the user selects a question
function askQuestion(questNum) {
    //display the question and the answer options for it
    quizList[questNum].setQuestionText();
    quizList[questNum].setAnswerOpts();
    //add event listener for when the list elements are clicked
    ansOptions.on("click", "button", event => {
        console.log(questNum);
        //sets the clicked element equal to a jquery object, also increments to next question
        selected = $(event.target);
        currentQuestion++;

        //checks if the selected answer is incorrect, if so it decreases the time by 10 seconds
        if(selected.text() != quizList[questNum].correctAns){
            timeLeft > 10 ? timeLeft -= 10 : timeLeft = 0;
            console.log(questNum);
            console.log(selected.text() + " and " + JSON.stringify(quizList[questNum]));
        }

        //checks if the last question has been reached and ends the quiz, otherwise it proceeds to the next question
        if(currentQuestion == quizList.length){
            endQuiz();
        } else if(currentQuestion < quizList.length) {
            askQuestion(currentQuestion);
        }
        
    });
}
//function to send the high score to localStorage
function sendScore() {
    let highScore = {
        "name": submitName.val(),
        "highScore": score
    }
    getHighScore.push(highScore);
    localStorage.setItem('highScores', JSON.stringify(getHighScore));
    window.location.href = "highscores.html";
}

//function to clear all the high scores from localStorage
function clearScores() {
    localStorage.removeItem('highScores');
    scoreList.empty();
}

//function to display the list of scores on the high score page
function displayScores() {
    getHighScore.forEach((item) => {
        let scoreEl = $('<li>');
        scoreEl.text(item.name + " - " + item.highScore);
        scoreList.append(scoreEl);
    });
}

//startQuiz();