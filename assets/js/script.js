let questionText = $('#questionText')
let timer = $("#timer");
let ansOptions = $("#questions");
let startButton = $("#startButton");
let timeLeft = 20;
let score = 0;

let quizList = [];
let currentQuestion;

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
        //first clear all the list items from the list of answers
        ansOptions.text("");
        //create a list element for each answer option
        this.options.forEach(ans => {
            let answerEl = $('<li>');
            answerEl.text(ans);
            answerEl.addClass("optionButton");
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

    $('#starterText').remove();
    currentQuestion = 0;
    askQuestion(0);
    let timeout = setInterval(() => {
        timer.text("Time: " + timeLeft);
        timeLeft--;

        if(timeLeft <= 0){
            timer.text("Time: 0");
            score = 0;
            clearInterval(timeout);
        }
    }, 1000)
}

//function to display the question and what to do when the user selects a question
function askQuestion(questNum) {
    //display the question and the answer options for it
    quizList[questNum].setQuestionText();
    quizList[questNum].setAnswerOpts();
    //add event listener for when the list elements are clicked
    ansOptions.on("click", "li", event => {
        //sets the clicked element equal to a jquery object, also increments to next question
        selected = $(event.target);
        currentQuestion++;

        //checks if the selected answer is incorrect, if so it decreases the time by 10 seconds
        if(selected.text() != quizList[questNum].correctAns){
            timeLeft -= 10;
        }

        //checks if the last question has been reached and ends the quiz, otherwise it proceeds to the next question
        if(currentQuestion == quizList.length){
            console.log(currentQuestion + "and" + quizList.length);
            score = timeLeft;
            timeLeft = 0;
        } else if(currentQuestion < quizList.length) {
            askQuestion(currentQuestion);
        }
    });
}

startQuiz();