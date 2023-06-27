var timerEl = document.getElementById('countdown');
var questionOutputEl = document.querySelector('#question-output');
var choiceSelect = document.querySelector('.choices');
var checker = document.querySelector('#checker');
var inputEl = document.querySelector('#initial-input');
var addBtn = document.querySelector('#add-btn');
var output = document.querySelector('#initial-output');
var score;

//starting function
function onStart() {
  hide("questions");
  hide("countdown");
  hide("checker");
  hide("line");
  hide("gameOver");
  hide("highscores");
}

//quiz start function showing questions
function startQuiz() {
  hide("hideStart");
  onStart();
  showQuestion();
  countdown();
}

//Question index variable
var currentQuestionIndex = 0;

//timer variable
var timerEl = document.getElementById('countdown');
var timeLeft = 60;
//timer
function countdown() {
  show("line");
  show("countdown");
  var timeInterval = setInterval(function(){
    timeLeft--

    timerEl.innerText = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timeInterval);
      displayMessage();
      score = 0;
    }
  }, 1000);
}

//end quiz function
function displayMessage(){
  //time up message or game over screen
  onStart();
  show("gameOver");
  show("initial-input");
}

//question function
function showQuestion() {
  if ((currentQuestionIndex < (questionData.length))==false) {
    score = timeLeft;
    displayMessage();
    hide("main");
  }
  
  show("questions");
  var questionObj = questionData[currentQuestionIndex];
  var answer = questionData[currentQuestionIndex].answer;

  console.log(questionObj);

  questionOutputEl.innerText = questionObj.question;

  document.getElementById("choiceSelect").innerHTML = "";
  
//appends choices to question and tags right and wrong answers before selection
  if (choice === document.createElement("BUTTON")) {
    choice.remove();
  }
  for (var index = 0; index < questionData[currentQuestionIndex].choices.length; index++) {
    var choice = document.createElement("BUTTON");
    var choiceContent = questionData[currentQuestionIndex].choices[index];
    choice.append(choiceContent);
    choiceSelect.append(choice);
    if (choiceContent == answer) {
      choice.setAttribute("onclick", "correct()");
    }
    else {
      choice.setAttribute("onclick", "wrong()");
    }
  }
  currentQuestionIndex++;
}

//correct answer
function correct() { 
  checker.innerText = 'correct!😀';
  show("checker");
  showQuestion();
  setTimeout(() => {
    hide("checker");
  }, 300);
}

//wrong answer
function wrong() {
  checker.innerText = 'wrong.😦';
  show("checker");
  showQuestion();
  setTimeout(() => {
    hide("checker");
  }, 300);
  timeLeft-=2;
}

function show(element) {
  document.getElementById(element).style.display = "block"
}
function hide(element) {
  document.getElementById(element).style.display = "none";
}

//gets initials from storage
function getinitials() {
  var initials = localStorage.getItem('initials');
  var parsed = JSON.parse(initials);

  return parsed || [];
}

//add initials to array
function addinitial() {
  var initials = getinitials();
  var initialText = inputEl.value;
  initialText = initialText + " " + score;

  initials.push(initialText);
  localStorage.setItem('initials', JSON.stringify(initials));

  showinitials();
}

//function that shows the initials on the page
function showinitials() {
  var initials = getinitials();

  output.innerHTML = '';
//no highscores
  if (initials.length === 0) {
    var p = document.createElement('div');
    p.style.color="grey";
    p.innerText = 'No Highscores';

    output.append(p);
  }
//shows initials array
  for (var i = 0; i < initials.length; i++) {
    var initialstr = initials[i];
    var ul = document.createElement('ul');

    ul.innerText = initialstr;
    ul.style.color="#3c2ab0";
    output.prepend(ul);
  }
}

//event listener for adding initials
addBtn.addEventListener('click', addinitial);

//shows all highscores
function submittedInitials() {
  onStart();
  hide("hideStart");
  showinitials();
  show("highscores");
}

//starting function when opening page
onStart();
