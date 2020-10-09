let startButton = document.getElementById('start-btn')
let timerEl = document.getElementById('timer-span');
let questionTextEl = document.getElementById('question-text');
let answerOptionsDiv = document.getElementById('multiple-choices-div');
let totalSeconds = 75;
let secondsElapsed = 0;
let currentQuestion = 0;

let questionsAndAnswers = [
	{
		question: 'Commonly used Data Types DO NOT include:',
		answers: ['strings', 'booleans', 'alerts', 'numbers'],
		correctAnswer: 2
	},
	{
		question: 'The condition in an if / else statement is enclosed within __________:',
		answers: ['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
		correctAnswer: 2
	},
	{
		question: 'Arrays in JavaScript can be used to store _________',
		answers: ['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
		correctAnswer: 3
	},
	{
		question: 'String values must be enclosed within ______ when being assigned to variables',
		answers: ['commas', 'curly brackets', 'quotes', 'parenthesis'],
		correctAnswer: 2
	},
	{
		question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
		answers: ['JavaScript', 'terminal / bash', 'for loops', 'console log'],
		correctAnswer: 3
	}
]

/**
 * Starts the quiz, called on click of the start button
 */
function startQuiz() {
	//Start timer
	interval = setInterval(tick, 1000);	
	setQuestionAndAnswerText();
	questionTextEl.classList.remove('text-center');
}

/**
 * Increment the timer and update the DOM
 */
function tick() {
	//Calculate the total # of seconds left
	secondsElapsed++;
	let totalSecondsLeft = totalSeconds - secondsElapsed;

	//Update the timer element to display the seconds left
	timerEl.textContent = totalSecondsLeft;
}

/**
 * Get the current question and set the question and answer text
 */
function setQuestionAndAnswerText() {
	//Set the question text to current question
	let question = questionsAndAnswers[currentQuestion];
	questionTextEl.textContent = question.question;

	answerOptionsDiv.children[0].style.display = 'none';
	//append a button to the page for each answer
	for(let i = 0; i < question.answers.length; i++)
	{
		console.log(question.answers[i]);
		let btnDiv = document.createElement('div');
		btnDiv.classList.add('row')

		let btn = document.createElement('button');
		btn.classList.add('bg-purple');
		btn.classList.add('text-white');
		btn.textContent = (i + 1) + '. ' + question.answers[i];

		btnDiv.append(btn);
		answerOptionsDiv.append(btnDiv);
	}
	startButton.style.display = 'none';
}


/**
 * Check the answer that was clicked, if it was right go to the next question,
 * if it was wrong, before going to the next question subtract 10 from the timer
 * @param {*} event 
 */
function checkAnswer(event) {

}

startButton.addEventListener("click", startQuiz);
// answers.addEventListener("click", checkAnswer);
