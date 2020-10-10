let startButton = document.getElementById('start-btn')
let timerEl = document.getElementById('timer-span');
let questionTextEl = document.getElementById('question-text');
let answerOptionsDiv = document.getElementById('multiple-choices-div');
let buttonDiv = document.getElementById('button-div');
let wrongAnswerEl = document.getElementById('wrong-answer-text');
let totalSeconds = 75;
let secondsElapsed = 0;
let currentQuestion = 0;
let interval;

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
	//Reset the question and answers
	resetQuestionAndAnswers(); 

	//Set the question text to current question
	let question = questionsAndAnswers[currentQuestion];
	questionTextEl.textContent = question.question;

	answerOptionsDiv.children[0].style.display = 'none';

	let btnDiv = document.createElement('div');
	btnDiv.classList.add('row');
	btnDiv.setAttribute('id', 'btn-div');

	//append a button to the page for each answer
	for(let i = 0; i < question.answers.length; i++)
	{

		let btn = document.createElement('button');
		btn.classList.add('bg-purple');
		btn.classList.add('text-white');
		btn.classList.add('round-border');
		btn.classList.add('answer');
		btn.textContent = (i + 1) + '. ' + question.answers[i];
		btn.setAttribute('data-answer', i);
		btn.addEventListener('click', checkAnswer);

		btnDiv.append(btn);
	}

	answerOptionsDiv.insertBefore(btnDiv, wrongAnswerEl);
	startButton.style.display = 'none';
}

function resetQuestionAndAnswers() {
	//Set question text to empty string
	questionTextEl.textContent = "";
	//remove answer buttons from screend
	let btnDiv = document.getElementById('btn-div');
	if(btnDiv)
		btnDiv.remove();
}

/**
 * Check the answer that was clicked, if it was right go to the next question,
 * if it was wrong, before going to the next question subtract 10 from the timer
 * @param {*} event 
 */
function checkAnswer(event) {
	let btnClicked = event.currentTarget;
	let answer = btnClicked.getAttribute('data-answer');
	console.log(btnClicked);
	let question = questionsAndAnswers[currentQuestion];
	if(parseInt(answer) !== question.correctAnswer)
	{
		totalSeconds -= 10;
		wrongAnswerEl.textContent = 'Wrong!';
	}
	else
		wrongAnswerEl.textContent = 'Correct!';

	wrongAnswerEl.classList.remove('d-none');

	setTimeout(function(){ wrongAnswerEl.classList.add('d-none'); }, 1000);

	if(currentQuestion !== questionsAndAnswers.length - 1)
	{
		currentQuestion++;
		setQuestionAndAnswerText();
	}
	else
		endQuiz();
}

/**
 * End the quiz, set the text to alert the user that they are done
 * Add the input for the user to enter initials and a submit button
 * @param {*} event 
 */
function endQuiz(event) {
	//Set the text
	questionTextEl.textContent = 'All Done!';
	answerOptionsDiv.textContent = 'Your final score is ' + (totalSeconds - secondsElapsed) + '.';

	//Stop the timer
	clearInterval(interval);

	//Create the elements for the initial input and submit button
	initialDiv = document.createElement('div');
	initialLabel = document.createElement('label');
	initialSubmit = document.createElement('button');
	initialInput = document.createElement('input');

	initialDiv.classList.add('d-flex');
	initialDiv.classList.add('mt-2');
	initialDiv.setAttribute('id', 'initial-div');

	initialLabel.textContent = 'Enter Initials:';
	initialLabel.classList.add('mt-2');

	initialInput.classList.add('form-control');

	initialSubmit.classList.add('bg-purple');
	initialSubmit.classList.add('text-white');
	initialSubmit.classList.add('round-border');
	initialSubmit.classList.add('submit-initial');
	initialSubmit.classList.add('ml-2');
	initialSubmit.textContent = 'Submit';

	initialSubmit.addEventListener('click', saveScore);

	initialDiv.append(initialLabel);
	initialDiv.append(initialInput);
	initialDiv.append(initialSubmit);

	answerOptionsDiv.append(initialDiv);
	//on submit save score and initial to localStorage and go to HighScores page
}

function saveScore() {

}

startButton.addEventListener("click", startQuiz);
