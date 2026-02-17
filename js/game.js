const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "¿Quién es el archienemigo de Spider-Man en los cómics?",
    choice1: "Green Goblin",
    choice2: "Venom",
    choice3: "Doctor Octopus",
    choice4: "Todos los anteriores",
    answer: 4,
  },
  {
    question:
      "¿Cómo se llama el sable de luz de color morado que usa Mace Windu en Star Wars?",
    choice1: "Sable de la Fuerza",
    choice2: "Sable Kyber",
    choice3: "Sable Oscuro",
    choice4: "No tiene un nombre especial",
    answer: 4,
  },
  {
    question:
      "En El Señor de los Anillos, ¿qué criatura llevaba el Anillo Único antes de que lo encontrara Bilbo?",
    choice1: "Gollum",
    choice2: "Sauron",
    choice3: "Aragorn",
    choice4: "Elrond",
    answer: 1,
  },
  {
    question: "¿Cuál de estos videojuegos NO pertenece a Nintendo?",
    choice1: "The Legend of Zelda",
    choice2: "Super Smash Bros.",
    choice3: "Halo",
    choice4: "Pokémon",
    answer: 3,
  },

  {
    question: "En Matrix, ¿qué pastilla elige Neo para conocer la verdad?",
    choice1: "Azul",
    choice2: "Roja",
    choice3: "Verde",
    choice4: "Negra",
    answer: 2,
  },

  {
    question: "¿Cuál es el nombre real de Wolverine en los cómics de X-Men?",
    choice1: "Logan",
    choice2: "James Howlett",
    choice3: "Victor Creed",
    choice4: "Scott Summers",
    answer: 2,
  },
  {
    question:
      "En Harry Potter, ¿cómo se llama el elfo doméstico que ayuda a Harry?",
    choice1: "Kreacher",
    choice2: "Dobby",
    choice3: "Winky",
    choice4: "Tobby",
    answer: 2,
  },
  {
    question:
      "¿Cuál es el nombre del androide interpretado por Arnold Schwarzenegger en Terminator?",
    choice1: "T-800",
    choice2: "T-1000",
    choice3: "T-2000",
    choice4: "TX",
    answer: 1,
  },
  {
    question:
      "En Batman: The Dark Knight, ¿qué villano es interpretado por Heath Ledger?",
    choice1: "El Pingüino",
    choice2: "El Acertijo",
    choice3: "El Joker",
    choice4: "Bane",
    answer: 3,
  },
  {
    question: "¿Cómo se llama el planeta natal de los Saiyajin en Dragon Ball?",
    choice1: "Namek",
    choice2: "Vegeta",
    choice3: "Kakarot",
    choice4: "Beerus",
    answer: 2,
  },
  {
    question: "¿En qué año se estrenó Volver al Futuro?",
    choice1: "1983",
    choice2: "1991",
    choice3: "1989",
    choice4: "1985",
    answer: 4,
  },
  {
    question: "¿Cuál de estos personajes NO pertenece a Marvel Comics?",
    choice1: "Deadpool",
    choice2: "Spawn",
    choice3: "Thor",
    choice4: "Doctor Strange",
    answer: 2,
  },
  {
    question:
      "En The Legend of Zelda, ¿cuál es el objetivo principal de Link en la mayoría de los juegos?",
    choice1: "Derrotar a Ganon",
    choice2: "Encontrar la Espada Maestra",
    choice3: "Huir del castillo",
    choice4: "Convertirse en rey",
    answer: 1,
  },
];

const SCORE_POINTS = 1;
const MAX_QUESTIONS = 13;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestions();
};

getNewQuestions = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.href = "./end.html";
  }

  questionCounter++;
  progressText.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTIONS}`;
  progressBarFull.style.height = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestions();
    }, 900);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

//modales

// llamada
const llamada = document.querySelector("#llamada");
const llamadaBtn = document.querySelector("#llamada-btn");
const llamadaText = document.querySelector("#respuesta-llamada");

function activarLlamada() {
  llamadaBtn.addEventListener("click", function () {
    llamada.classList.add("mostrar-modal");

    function printAnswer() {
      let contenedorRespuesta = document.querySelector("#textoLlamada");

      var textoRespuesta = document.createElement("p");

      switch (true) {
        case currentQuestion.answer === 1:
          textoRespuesta.innerText = "Es la Opción A";
          break;
        case currentQuestion.answer === 2:
          textoRespuesta.innerText = "Creo que es B";
          break;
        case currentQuestion.answer === 3:
          textoRespuesta.innerText = "Debe ser C";
          break;
        default:
          textoRespuesta.innerText = "Seguro es la D";
      }

      contenedorRespuesta.appendChild(textoRespuesta);
    }

    printAnswer();
  });
}

activarLlamada();

function save3() {
  llamadaBtn.disabled = true;
  setTimeout(() => {
    llamada.classList.remove("mostrar-modal");
    llamadaBtn.classList.add("disable");
  }, 4000);
}

// publico

const publico = document.querySelector("#publico");
const publicoBtn = document.querySelector("#publico-btn");
let imGraphic = document.getElementById("changeSrc");

function activarPublico() {
  publicoBtn.addEventListener("click", function () {
    publico.classList.toggle("mostrar-modal");

    switch (currentQuestion.answer) {
      case 1:
        imGraphic.src = "img/graficas_a.gif";
        break;

      case 2:
        imGraphic.src = "img/graficas_b.gif";
        break;

      case 3:
        imGraphic.src = "img/graficas_c.gif";
        break;

      default:
        imGraphic.src = "img/graficas_d.gif";
    }
  });
}

activarPublico();

function save2() {
  publicoBtn.disabled = true;

  setTimeout(() => {
    publico.classList.remove("mostrar-modal");
    publicoBtn.classList.add("disable");
  }, 5000);
}

//cincuenta-cincuenta

// const cincuentaBtn = document.querySelector("#cincuenta-btn");

// function save1() {
//     cincuentaBtn.disabled = true;

//     setTimeout(() => {
//         cincuentaBtn.classList.add("disable");
//     }, 1000);
// }

startGame();
