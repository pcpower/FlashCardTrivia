const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

const categoryContainerElement = document.getElementById('categoryContainer')
const difficultyContainerElement = document.getElementById('difficultyContainer')

let shuffledQuestions, currentQuestionsIndex

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


class trivia {
    //Private Properties
    #BASE_URL = 'https://opentdb.com/api.php?amount=50';

    // Public Properties
    amount = 10;
    category = "";
    currentQuestionIndex = 0;
    difficulty = "";
    myInterval = null;
    score = 0;
    timer = 0;
    type = "multiple";
    
    

    constructor(type) {
        this.type = type;
        this.getCategoryList();
        // this.setNextQuestion();
        

        startButton.addEventListener('click', () => {
            this.resetScore();

            const categoryInput = document.getElementById("categoryAdd");
            // console.log(categoryInput.value);
            if (categoryInput.value == "Select One") {
                alert("Please select a Category")
                return;
            }
        

            const difficultyInput = document.getElementById("difficultySet");
            if (difficultyInput.value == "Select One") {
                alert("Please select a Difficulty!")
                return;
            }

            categoryContainerElement.classList.add('hide');
            difficultyContainerElement.classList.add('hide');
            
            let time = 600,
            display = document.querySelector('#countdown');
            this.startTimer(time, display, function() {alert('Times up!'); });
            
            
            this.startGame(); 
            this.clearStatusClass(document.body)
            this.resetState(); 
            // if (this.questionCount < questions.length) {
               this.showQuestion(shuffledQuestions[this.currentQuestionIndex])
                
            // }
            console.log(questions.length);
           
        })

        nextButton.addEventListener('click', () => {
            this.currentQuestionIndex++
            this.resetState(); 
            this.showQuestion(shuffledQuestions[this.currentQuestionIndex])
            this.clearStatusClass(document.body);
        })
    }

    clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
        console.log("7")
    }

    getQuestions() {
    //     this.difficulty = e.target.options[e.target.options.selectedIndex].value;
    //     console.log(this.difficulty);

        // let categoryList = new Array();


        fetch(this.#BASE_URL)
        .then(function(data) {
          return data.json();
        })
        .then(function(responseJson) {
            const jsonPackage = responseJson;

            console.log(jsonPackage.results);
            
            // const questionList = jsonPackage.results;
            
        
            // // questionList.forEach(function(question) {
            // //     console.log(question.category);
            // //     if (!categoryList.includes(question.category)) {
            // //         categoryList.push(question.category)
                    
            // //     }

            // });
        });
    };
            
    getCategoryList() {
            categoryList.sort();
            console.log(categoryList);

              // Adding Categories to the dropdown list
            const CategoryDropDown = document.getElementById("categoryAdd");

        categoryList.forEach(function(category) {
            
        let opt1 = document.createElement("option");
        console.log(category);
        console.log("1");

        opt1.value = category.id;
        opt1.text = category.name;

        CategoryDropDown.add(opt1, null);

        
        })   

        console.log("4");

          
        return "done";
          
         

        
    
    };

    

    getTriviaQuestion() {
        
        return;
    };

    getTypeList() {return;}

    resetScore() {
        this.score = 0;
    };

    resetState() {
        // otrivia.clearStatusClass(document.body)
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
            
        }
        console.log("4")
    }

    selectAnswer(e) {
        const selectedButton = e.target
        const correct = selectedButton.dataset.correct

        console.log(correct);

        Array.from(answerButtonsElement.children).forEach(button => {
            otrivia.setStatusClass(button, button.dataset.correct)
            button.removeEventListener('click', otrivia.selectAnswer);
        })

        if (correct) {
            document.body.classList.add('correct')
            otrivia.score ++;
        } else {        
            document.body.classList.add('wrong')
        }

        console.log(`the Score is ${otrivia.score}`);

        if (shuffledQuestions.length > otrivia.currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            otrivia.stopTimer();
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
        }
        console.log("5")
    
    };

    // setNextQuestion() {
    //     resetState() {
    //     showQuestion(shuffledQuestions[this.currentQuestionIndex])
    //     console.log("2")
    
    // };

    setStatusClass(element, correct) {
        // otrivia.clearStatusClass(element)
        console.log(element);
        if (correct) {
            element.classList.add('correct')
        } else {
            element.classList.add('wrong')
        }
        

    }

    showQuestion(question) {
        questionElement.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', this.selectAnswer);
            answerButtonsElement.appendChild(button);
        })
        
    };

    startGame() {
        console.log('Started');
        startButton.classList.add('hide');
        shuffledQuestions = questions.sort(() => Math.random() - .5);
        this.currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
        // categoryContainerElement.classList.remove('hide')
        // this.setNextQuestion();
        console.log("1");
    };

    startTimer(duration, display, callback) {

        console.log("startTimer - start");

        let minutes, seconds;

            otrivia.timer = duration,
            minutes, seconds;
    
            this.myInterval = setInterval(function() {
            minutes = parseInt(otrivia.timer / 60, 10)
            seconds = parseInt(otrivia.timer % 60, 10);
    
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;
    
            display.textContent = minutes + ":" + seconds;
    
            if (--otrivia.timer < 0) {
                clearInterval(myInterval);
    
                if(callback) {
                    callback();
                }
            }
        }, 1000);
        console.log("startTimer - End");
    };

    
    stopTimer() {
        clearInterval(otrivia.myInterval);
    }

};



const categoryList = [
    
    {id: 20, name: 'Mythology'},
    {id: 27, name: 'Animals'},
    {id: 21, name: 'Sports'}

];

const multipleType = "multiple";
const otrivia = new trivia(multipleType)

// difficultySet.addEventListener('change', function(e) {otrivia.getCategoryList(e)});

// otrivia.getCategoryList();




// button.onclick = function() {
//     window.clearInterval();
//     let time = 600,
//     display = document.querySelector('#countdown');
//     startTimer(time, display, function() {alert('Times up!'); });

// };

const questions = [
    {
        question: 'What is 2 + 2 = ?',
        answers: [
            {text: '4', correct: true },
            {text: '22', correct: false},
            {text: '7', correct: false},
            {text: '2', correct: false}
        ]
    },
    {
        question: 'What is 2 + 3 = ?',
        answers: [
            {text: '5', correct: true },
            {text: '22', correct: false},
            {text: '7', correct: false},
            {text: '2', correct: false}
        ]
    }
];

