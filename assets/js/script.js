let questionText = $('#questionText')
let timer = $("#timer");
let questionList = $("#questions");
let startButton = $("#startButton");
let timeLeft = 75;
let score = 0;
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
        //create a list element for each answer option
        this.options.forEach(ans => {
            let answerEl = $('<li>');
            answerEl.text(ans);
            answerEl.addClass("optionButton");
            questionList.append(answerEl);
        });
    }
}

//function to run the quiz, takes the list of questions for the quiz

function startQuiz(quizList) {
    //start the timer for the quiz and set the current question to the first question
    currentQuestion = 0;

    let timeout = setInterval(() => {
        timer.text("Time: " + timeLeft);
        timeLeft--;

        if(timeLeft <= 0){
            timer.text("Time: 0");
            clearInterval(timeout);
        }
    }, 1000)

    //go through each question in the list
    quizList.every(question => {
        //first check if the time is up, if it is it will break out of the loop and set the score
        if(timeLeft <= 0){
            timer.text("Time: 0");
            clearInterval(timeout);
            score = 0;
            return false;
        }

        //display the question text and answer options
        question.setQuestionText();
        question.setAnswerOpts();

        questionList.on("click", "li", event => {
            let selected = $(event.target);
            
            //check if the selected answer is correct, if it is continue to the next question, otherwise subtract 10 from the time remaining and continue to the next question
            if(selected.text == question.correctAns){
                return true;
            } else {
                time-=10;
                return true;
            }
        })
    });
}

// let test = new Question("test", "1", "2", "3", "4");
// test.setAnswerOpts();

startQuiz();