const questions = [
    {
        question: "What is Alex's role?",
        answers: [
            { text: "Plumber", correct: false},
            { text: "Front End Developer", correct: true},
            { text: "Zookeeper", correct: false},
            { text: "Astronaut", correct: false},
        ]
    },
    {
        question: "What is Alex's favorite movie?",
        answers: [
            { text: "John Wick", correct: false},
            { text: "Lord of the Rings", correct: false},
            { text: "Harry Potter", correct: true},
            { text: "Fast and Furious", correct: false},
        ]
    },
    {
        question: "What is Alex's Harry Potter House?",
        answers: [
            { text: "Gryffindor", correct: false},
            { text: "Hufflepuff", correct: true},
            { text: "Ravenclaw", correct: false},
            { text: "Slytherin", correct: false},
        ]
    },
    {
        question: "What is Alex's passion?",
        answers: [
            { text: "Running", correct: false},
            { text: "Working Out", correct: false},
            { text: "Shopping", correct: false},
            { text: "Coding", correct: true},
        ]
    },
    {
        question: "What is a skill Alex has that not many people have?",
        answers: [
            { text: "Can see things from other people's perspective", correct: true},
            { text: "Can do a handstand", correct: false},
            { text: "Can fly", correct: false},
            { text: "Lazer vision", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();