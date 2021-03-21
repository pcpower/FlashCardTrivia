

const startButton = document.getElementById('start-btn')//
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')

const categoryListElement = document.getElementById('categoryList')

let shuffledQuestions, currentQuestionsIndex

const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


class triviaWrapper {
    //Private Properties
    #BASE_URL = 'https://opentdb.com/api.php?amount=50';

    // Public Properties
    amount = 10;
    category = "";
    difficulty = "";
    type = "multiple";

    constructor(type) {
        this.type = type;
        
    }


    getCategoryList() {
    //     this.difficulty = e.target.options[e.target.options.selectedIndex].value;
    //     console.log(this.difficulty);

        let categoryList = new Array();


        fetch(this.#BASE_URL)
        .then(function(data) {
          return data.json();
        })
        .then(function(responseJson) {
            const jsonPackage = responseJson;

            console.log(jsonPackage.results);
            
            const questionList = jsonPackage.results;
            
        
            questionList.forEach(function(question) {
                console.log(question.category);
                if (!categoryList.includes(question.category)) {
                    categoryList.push(question.category);
                    
                }

            });

            categoryList.sort();
            console.log(categoryList);
          
        });        

            // Adding Categories to the dropdown list
        const CategoryListSelect = document.getElementById("categoryAdd");
        let opt1 = document.createElement("option");

        opt1.value = "1";
        opt1.text = "option: Value 1"

        CategoryListSelect.add(opt1, null);
            
        return "done";
    
    }

    getTriviaQuestion() {
        
        return;
    }

    getTypeList() {return;}

    

    
}

const multipleType = "multiple";
const oTriviaWrapper = new triviaWrapper(multipleType)

// difficultySet.addEventListener('change', function(e) {oTriviaWrapper.getCategoryList(e)});

oTriviaWrapper.getCategoryList();


startButton.addEventListener('click', startGame)//
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {//
    console.log('Started')//
    startButton.classList.add('hide')//
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    // categoryListElement.classList.remove('hide')
    setNextQuestion()
    console.log("1")
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
    console.log("2")

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
        console.log("3")
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
        
    }
    console.log("4")
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
  console.log("5")

}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
    console.log("6")
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
    console.log("7")
}


const questions = [
    {
        question: 'What is 2 + 2 = ?',
        answers: [
            {text: '4', correct: true },
            {text: '22', correct: false},
            {text: '7', correct: false},
            {text: '2', correct: false}
        ]
    }
];