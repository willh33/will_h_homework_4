let startButton = document.getElementById('start-btn')
let viewScoresButton = document.getElementById('view-highscores')
let timerEl = document.getElementById('timer-span');
let questionTextEl = document.getElementById('question-text');
let answerOptionsDiv = document.getElementById('multiple-choices-div');
let buttonDiv = document.getElementById('button-div');
let wrongAnswerEl;
let totalSeconds = 75;
let secondsElapsed = 0;
let currentQuestion = 0;
let interval;
let score = 0;

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
	totalSeconds = 75;
	secondsElapsed = 0;
	currentQuestion = 0;
	interval = setInterval(tick, 1000);	
	questionTextEl.classList.remove('text-center');

	let answerText = document.createElement('div');
	answerText.setAttribute('id', 'wrong-answer-text');
	answerText.classList.add('d-none');
	answerText.classList.add('border-top');
	answerText.classList.add('text-muted');
	answerText.classList.add('font-italic');
	
	wrongAnswerEl = answerText;
	answerOptionsDiv.append(wrongAnswerEl);

	setQuestionAndAnswerText();
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
	if(totalSecondsLeft <= 0) {
		endQuiz();
	}
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

	answerOptionsDiv.children[0].classList.add('d-none');

	let btnDiv = document.createElement('div');
	btnDiv.setAttribute('id', 'btn-div');

	//append a button to the page for each answer
	for(let i = 0; i < question.answers.length; i++)
	{

		let btn = document.createElement('button');
		addClassesToButton(btn);
		btn.classList.add('row');
		// btn.classList.add('bg-purple');
		// btn.classList.add('text-white');
		// btn.classList.add('round-border');
		btn.classList.add('answer');
		btn.textContent = (i + 1) + '. ' + question.answers[i];
		btn.setAttribute('data-answer', i);
		btn.addEventListener('click', checkAnswer);

		btnDiv.append(btn);
	}

	answerOptionsDiv.insertBefore(btnDiv, wrongAnswerEl);
	startButton.classList.add('d-none');
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
	let question = questionsAndAnswers[currentQuestion];

	//Check if they got the write answer
	if(parseInt(answer) !== question.correctAnswer)
	{
		totalSeconds -= 10;
		timerEl.textContent = totalSeconds - secondsElapsed;
		wrongAnswerEl.textContent = 'Wrong!';
	}
	else
		wrongAnswerEl.textContent = 'Correct!';

	wrongAnswerEl.classList.remove('d-none');

	setTimeout(function(){ wrongAnswerEl.classList.add('d-none'); }, 1000);

	//Check if we're on the last question and ready to end the quiz
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
	//set the score
	score = totalSeconds - secondsElapsed;
	//Set the text
	questionTextEl.textContent = 'All Done!';
	answerOptionsDiv.textContent = 'Your final score is ' + score + '.';

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
	initialInput.setAttribute('id', 'initial-input');

	initialSubmit.classList.add('bg-purple');
	initialSubmit.classList.add('text-white');
	initialSubmit.classList.add('round-border');
	initialSubmit.classList.add('submit-initial');
	initialSubmit.classList.add('ml-2');
	initialSubmit.textContent = 'Submit';

	initialSubmit.addEventListener('click', saveScore);

	//Append the initial elements to the DOM
	initialDiv.append(initialLabel);
	initialDiv.append(initialInput);
	initialDiv.append(initialSubmit);

	answerOptionsDiv.append(initialDiv);
	//on submit save score and initial to localStorage and go to HighScores page
}

/**
 * Save the score to localStorage
 */
function saveScore() {
	//Get the initials from the input
	let input = document.getElementById('initial-input');

	//save initials and score to localStorage
	addScoreToLocalStorage(input.value, score)
}

/**
 * Add the score to the localStorage scores array
 * @param {*} initials 
 * @param {*} score 
 */
function addScoreToLocalStorage(initials, score) {
	//Get the scores from localStorage
	let scores = localStorage.scores;
	if(scores)
		scores = JSON.parse(scores);
	else 
		scores = [];

	//Add new entry to the array
	scores.push({initial: initials, score: score});

	//Sort the array by score
	scores.sort((a, b) => {
		return b.score - a.score;
	});
	localStorage.scores = JSON.stringify(scores);
	showHighScores();
}

/**
 * Get the highscores from localstorage and append them to the DOM in a list
 */
function showHighScores() {
	//Get the Highscores from localStorage
	let highScores = localStorage.scores;
	startButton.classList.add("d-none");
	if(highScores)
		highScores = JSON.parse(highScores);
	else
		highScores = [];

	//Set the content
	questionTextEl.textContent = 'Highscores';

	let scoreLi = document.createElement('ol');

	//Add the high scores
	for(let i = 0; i < highScores.length; i++)
	{
		let score = highScores[i];
		let li = document.createElement('li');
		li.textContent = score.initial + ' - ' + score.score;
		li.classList.add('list-group-item-secondary');
		li.classList.add('list-group-item');
		scoreLi.append(li);
	}

	//Append them to the DOM
	answerOptionsDiv.textContent = "";
	answerOptionsDiv.append(scoreLi);

	//Create a back button
	let btn = document.createElement('button');
	btn.textContent = 'Go Back';
	addClassesToButton(btn);
	btn.setAttribute('id', 'back-button');
	btn.addEventListener('click', resetPage);

	answerOptionsDiv.append(btn);

	//Create a button to clear the scores
	btn = document.createElement('button');
	btn.textContent = 'Clear Highscores';
	addClassesToButton(btn);
	btn.setAttribute('id', 'clear-scores');
	btn.addEventListener('click', clearHighscores);

	answerOptionsDiv.append(btn);
}

/**
 * Clear the highscores tthen call the method to show the scores
 */
function clearHighscores() {
	localStorage.scores = "";
	showHighScores();
}

/**
 * Add classes to the button to make it have a purple background and white text
 * @param {} button 
 */
function addClassesToButton(button) {
	button.classList.add('bg-purple');
	button.classList.add('text-white');
	button.classList.add('round-border');
}

/**
 * Reset the page back to the start before clicking start quiz
 */
function resetPage() {
	//Reset the header text
	questionTextEl.classList.add('text-center');
	questionTextEl.textContent = 'Coding Quiz Challenge';

	//Reset to the beginning text
	answerOptionsDiv.textContent = "";
	let p = document.createElement('p');
	p.textContent = 'Try to answer the following code-related questions within the time limit. Keep in mind incorrect answers will penalize your score / time by 10 seconds!';
	answerOptionsDiv.append(p);
	startButton.classList.remove('d-none');
}

startButton.addEventListener("click", startQuiz);
viewScoresButton.addEventListener("click", showHighScores);
