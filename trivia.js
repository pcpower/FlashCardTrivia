(function() {

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const scoreLabel = document.getElementById("scoreLabel")
const questionContainerElement = document.getElementById('question-container')
const categoryContainerElement = document.getElementById('categoryContainer')
// const difficultyContainerElement = document.getElementById('difficultyContainer')

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const categoryList = [
    
    {name: 'Arithmatic'},
    {name: 'Science'}
    
];

const questions = [
    {
        category: "Arithmatic",
        question: 'What is 2 + 2 = ?',
        answers: [
            {text: '4', correct: true },
            {text: '22', correct: false},
            {text: '7', correct: false},
            {text: '2', correct: false}
        ]
    },
    {
        category: "Arithmatic",
        question: 'What is 2 + 3 = ?',
        answers: [
            {text: '22', correct: false},
            {text: '7', correct: false},
            {text: '5', correct: true },
            {text: '2', correct: false}
        ]
    },

    {
        category: "Science",
        question: 'Oil, natural gas and coal are examples of …',
        answers: [
            {text: 'Geothermal resources', correct: false},
            {text: 'Fossil fuels', correct: true },
            {text: 'Renewable resources', correct: false},
            {text: 'Biofuels', correct: false}
        ]
    },
    {
        category: "Science",
        question: 'How many bones are in the human body?',
        answers: [
            {text: '206', correct: true },
            {text: '210', correct: false},
            {text: '198', correct: false},
            {text: '186', correct: false}
        ]
    }
];


class trivia {
    //Private Properties
    // #BASE_URL = 'https://opentdb.com/api.php?amount=50';

    // Public Properties
    amount = 10;
    category = "";
    currentQuestionIndex = 0;
    // difficulty = "";
    myInterval = null;
    score = 0;
    timer = 0;
    myShuffledQuestions = [];
    
    constructor() {
        this.loadCategoryList();
        // this.setNextQuestion();
        

        startButton.addEventListener('click', () => {
            this.resetScore();

            const categoryInput = document.getElementById("categoryAdd");
            const categoryValue = categoryInput.value;
            if (categoryValue == "Select One") {
                alert("Please select a Category")
                return;
            }

            let myQuestions = this.getQuestionsByCategory(categoryValue)
            console.log(myQuestions)

            // const difficultyInput = document.getElementById("difficultySet");
            // if (difficultyInput.value == "Select One") {
            //     alert("Please select a Difficulty!")
            //     return;
            // }

            categoryContainerElement.classList.add('hide');
            // difficultyContainerElement.classList.add('hide');
            scoreLabel.classList.add('hide');

            let time = 600,
            display = document.querySelector('#countdown');
            this.startTimer(time, display, function() {alert('Times up!'); });
            
            
            this.startGame(); 
            this.clearStatusClass(document.body);
            this.resetState(); 
            this.myShuffledQuestions = this.shuffle(myQuestions);
            console.log(this.myShuffledQuestions);

            this.showQuestion(this.myShuffledQuestions[this.currentQuestionIndex]);
            console.log(questions.length);
           
        })

        nextButton.addEventListener('click', () => {
            this.currentQuestionIndex++
            this.resetState(); 
            this.showQuestion(this.myShuffledQuestions[this.currentQuestionIndex]);
            this.clearStatusClass(document.body);
        })
    }

    clearStatusClass(element) {
        element.classList.remove('correct')
        element.classList.remove('wrong')
    }

    // getCategories() {
    // //     this.difficulty = e.target.options[e.target.options.selectedIndex].value;
    // //     console.log(this.difficulty);

    //     // let categoryList = new Array();


    //     fetch(this.#BASE_URL)
    //     .then(function(data) {
    //       return data.json();
    //     })
    //     .then(function(responseJson) {
    //         const jsonPackage = responseJson;

    //         console.log(jsonPackage.results);
            
    //         // const questionList = jsonPackage.results;
            
        
    //         // // questionList.forEach(function(question) {
    //         // //     console.log(question.category);
    //         // //     if (!categoryList.includes(question.category)) {
    //         // //         categoryList.push(question.category)
                    
    //         // //     }

    //         // });
    //     });
    // };

    getQuestionsByCategory(category) {
        console.log(category)
        let myQuestions = [];
        questions.forEach(function(question) {
            if (question.category == category) { 
                console.log(`Category = ${question.category}`)
                myQuestions.push(question);
            }
        } )
        
        console.log(myQuestions);
        return myQuestions;
    };
            
    loadCategoryList() {
        categoryList.sort();
        console.log(categoryList);

            // Adding Categories to the dropdown list
        const CategoryDropDown = document.getElementById("categoryAdd");

        categoryList.forEach(function(category) {
            
            let opt1 = document.createElement("option");
            console.log(category);
            console.log("1");   

            opt1.text = category.name;

            CategoryDropDown.add(opt1, null);

        }); 

        return "done";                                             
    };

    resetScore() {
        this.score = 0;
    };

    resetState() {
        nextButton.classList.add('hide')
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
            
        }
       
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

        if (otrivia.myShuffledQuestions.length > otrivia.currentQuestionIndex + 1) {
            nextButton.classList.remove('hide')
        } else {
            otrivia.stopTimer();
            scoreLabel.classList.remove('hide');
            scoreLabel.innerText = `Your score is ${otrivia.score}`;
            startButton.innerText = 'Restart'
            startButton.classList.remove('hide')
        }
       
    
    };

    setStatusClass(element, correct) {
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

    shuffle(myQuestions){
        return myQuestions.sort(() => Math.random() - .5);
    }

    startGame() {
        console.log('Started');
        startButton.classList.add('hide');
        //shuffledQuestions = questions.sort(() => Math.random() - .5);
        this.currentQuestionIndex = 0;
        questionContainerElement.classList.remove('hide');
              
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

// Executing Trivia
const otrivia = new trivia()


// otrivia.getCategories();

})();