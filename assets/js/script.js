let questionText = $('#questionText')
let timer = $("#timer");
let questionList = $("#questions");
let startButton = $("#startButton");

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
        for(let i = 0; i < this.options.length; i++) {
            //create list element for each question and set the text to the answer option, then set the class for CSS purposes
            let answerEl = $('<li>');
            answerEl.text(this.options[i]);
            answerEl.addClass("optionButton");
            questionList.append(answerEl);
        }
    }
}