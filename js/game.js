const answersQuestion = Array.from(document.getElementsByClassName('option-text'));
const divQuestions = Array.from(document.getElementsByClassName('question-answer'));
const progressBar = document.getElementById('progress-bar');
const loader = document.getElementById('loader');
const containerGame = document.getElementById('container-game');

let gameData;
let numberOfQuestion = 0;
let dataActualQuestion;
let answersActualQuestion;
let pointsUser = 0;
let elementAnswerClicked;
let correctAnswer;

getDataOfQuestions();

function getDataOfQuestions() {

    fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple')
        .then( response => response.json() )
        .then( data => {
            gameData = data.results;
            playGame(gameData);
        })
        .catch( error => {
            alert('Sorry, the game is not working right now :(');
            console.log(error);
        });

}

function playGame(data) {

    loader.style.display = 'none';
    containerGame.style.display = 'block';

    let question = document.querySelector('.title-question');
    dataActualQuestion = data[numberOfQuestion];
    correctAnswer = dataActualQuestion.correct_answer;
    const incorrectAnswers = dataActualQuestion.incorrect_answers;
    answersActualQuestion = [correctAnswer, ...incorrectAnswers];

    question.innerHTML = dataActualQuestion.question;

    answersQuestion.forEach( option => {
        let indexAnswer = option.dataset['option'];
        option.innerHTML = answersActualQuestion[indexAnswer];
    });

    if (elementAnswerClicked) {
        elementAnswerClicked.style.background = '#fff';
    }

}


function checkAnswer(optionSelectedForUser) {

    if ( answersActualQuestion[optionSelectedForUser] == correctAnswer) {
        elementAnswerClicked.style.background = '#64BE78';
        pointsUser ++;
    } else {
        elementAnswerClicked.style.background = '#d32d2d';
    }

    setTimeout(continueGame, 1000)

}

function continueGame() {

    numberOfQuestion++;

    const numberOfQuestionsToAnswer = Object.keys(gameData).length;
    let calculateWidthProgressBar = (numberOfQuestion / numberOfQuestionsToAnswer) * 100;
    progressBar.style.width = `${calculateWidthProgressBar}%`;

    if ( numberOfQuestion < numberOfQuestionsToAnswer) {
        playGame(gameData);
    } else {
        sessionStorage.setItem('points', pointsUser);
        setTimeout(() => {
            window.location = 'ranking.html';
        }, 400)
    }

}

divQuestions.forEach( ( el, index ) => {
    el.addEventListener('click', () => {
        elementAnswerClicked = el.children[1]; 
        checkAnswer(index);
    })
});

