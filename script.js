let startButton = document.getElementById('start-button')
let timerEl = document.getElementById('timer');
let totalSeconds = 75;
let secondsElapsed = 0;

let questions = [
	'Commonly used Data Types DO NOT include:', 
	'The condition in an if / else statement is enclosed within __________:',
	'Arrays in JavaScript can be used to store _________',
	'String values must be enclosed within ______ when being assigned to variables',
	'A very useful tool used during development and debugging for printing content to the debugger is:'
];
let answers = [
	['strings', 'booleans', 'alerts', 'numbers'],
	['quotes', 'curly brackets', 'parenthesis', 'square brackets'],
	['numbers and strings', 'other arrays', 'booleans', 'all of the above'],
	['commas', '']
];

/**
 * Starts the quiz, called on click of the start button
 */
function startQuiz() {
	//Start timer
	interval = setInterval(tick, 1000);
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
 * Check the answer that was clicked, if it was right go to the next question,
 * if it was wrong, before going to the next question subtract 10 from the timer
 * @param {*} event 
 */
function checkAnswer(event) {

}

startButton.addEventListener("click", startQuiz);
answers.addEventListener("click", checkAnswer);
