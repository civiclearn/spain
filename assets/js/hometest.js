// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

const INLINE_TEST_QUESTIONS = [
  {
    q: "¿Quién aprueba los Presupuestos Generales del Estado?",
    a: [
      "El Gobierno de España",
      "Las Cortes Generales",
      "El Tribunal de Cuentas"
    ],
    correct: 1
  },
  {
    q: "¿Quién elige al presidente del Gobierno?",
    a: [
      "El Congreso de los Diputados",
      "El rey",
      "El Tribunal Supremo"
    ],
    correct: 0
  },
  {
    q: "Los ciudadanos deben colaborar con los jueces si se lo piden.",
    a: [
      "Verdadero",
      "Falso"
    ],
    correct: 0
  },
  {
    q: "Los sindicatos pueden participar en negociaciones con empresarios y con el Gobierno.",
    a: [
      "Verdadero",
      "Falso"
    ],
    correct: 0
  },
  {
    q: "En España, los poderes públicos deben proteger la salud y promover el deporte.",
    a: [
      "Verdadero",
      "Falso"
    ],
    correct: 0
  },
  {
    q: "El parque nacional de Ordesa está en…",
    a: [
      "Aragón",
      "Navarra",
      "Castilla-La Mancha"
    ],
    correct: 0
  },
  {
    q: "¿Cuál de estos ríos desemboca en el mar Mediterráneo?",
    a: [
      "El Tajo",
      "El Júcar",
      "El Duero"
    ],
    correct: 1
  },
  {
    q: "¿En qué lugar de España hay un clima con inviernos fríos y veranos muy calurosos?",
    a: [
      "Canarias",
      "Madrid",
      "Comunidad Valenciana"
    ],
    correct: 1
  },
  {
    q: "¿Cuál es la capital de la comunidad autónoma de Extremadura?",
    a: [
      "Mérida",
      "Badajoz",
      "Cáceres"
    ],
    correct: 0
  },
  {
    q: "¿Quién escribió *La casa de Bernarda Alba*?",
    a: [
      "Antonio Machado",
      "Miguel de Cervantes",
      "Federico García Lorca"
    ],
    correct: 2
  },
  {
    q: "¿Quién escribió *Nada*, una novela sobre la posguerra española?",
    a: [
      "Carmen Laforet",
      "Ana María Matute",
      "María Dueñas"
    ],
    correct: 0
  },
  {
    q: "¿Cuál es el nombre de la directora española conocida por su mirada crítica y por modernizar el cine nacional?",
    a: [
      "Pilar Miró",
      "Sara Baras",
      "Penélope Cruz"
    ],
    correct: 0
  },
  {
    q: "¿Qué novela de éxito ha escrito Irene Vallejo?",
    a: [
      "El infinito en un junco",
      "El tiempo entre costuras",
      "El camino"
    ],
    correct: 0
  },
  {
    q: "Juan Mari Arzak es un famoso…",
    a: [
      "escritor",
      "músico",
      "cocinero"
    ],
    correct: 2
  },
  {
    q: "¿Quién fue Clara Campoamor?",
    a: [
      "Una defensora de los derechos de la mujer",
      "Una cantante lírica",
      "Una directora de cine"
    ],
    correct: 0
  },
  {
    q: "¿Qué mujer es autora del cuadro *La verbena*?",
    a: [
      "Maruja Mallo",
      "Carmen Maura",
      "Clara Lago"
    ],
    correct: 0
  },
  {
    q: "¿En qué museo español se puede ver el *Guernica* de Picasso?",
    a: [
      "Museo Reina Sofía",
      "Museo del Prado",
      "Museo Thyssen-Bornemisza"
    ],
    correct: 0
  },
  {
    q: "¿Cuál de estos deportistas juega al tenis?",
    a: [
      "Pau Gasol",
      "Carlos Sainz",
      "Carlos Alcaraz"
    ],
    correct: 2
  },
  {
    q: "¿Quién ha recibido el Premio Nobel de Literatura?",
    a: [
      "María Zambrano",
      "Pablo Picasso",
      "Vicente Aleixandre"
    ],
    correct: 2
  },
  {
    q: "¿En qué ciudad española está el Museo Guggenheim?",
    a: [
      "Valencia",
      "Madrid",
      "Bilbao"
    ],
    correct: 2
  }
];

// ----------------------------
// STATE
// ----------------------------
let correctCount = 0;
let wrongCount = 0;
let answeredCount = 0;
let totalQuestions = INLINE_TEST_QUESTIONS.length;
let currentRow = 0;

// ----------------------------
// UI TARGETS
// ----------------------------
const container = document.getElementById("inline-test-questions");
const expandBtn = document.getElementById("inline-test-expand");

// ----------------------------
// PROGRESS DISPLAY
// ----------------------------
function updateProgressDisplay() {
  document.getElementById("inline-progress-text").textContent =
    `Progreso: ${answeredCount} / ${totalQuestions} preguntas`;
}

function updateProgressBar() {
  const pct = (answeredCount / totalQuestions) * 100;
  document.getElementById("inline-progressbar").style.width = pct + "%";
}

// ----------------------------
// UTILITIES
// ----------------------------
function shuffleAnswers(question) {
  const combined = question.a.map((opt, index) => ({
    text: opt,
    isCorrect: index === question.correct
  }));

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  question.a = combined.map(i => i.text);
  question.correct = combined.findIndex(i => i.isCorrect);
}

function createDonutChart() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const C = 2 * Math.PI * 40;

  return `
    <div class="donut-wrapper">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#ebe6ff" stroke-width="12" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#6d4aff" stroke-width="12" fill="none"
          stroke-dasharray="${(pct / 100) * C} ${(1 - pct / 100) * C}"
          transform="rotate(-90 50 50)" stroke-linecap="round"></circle>
      </svg>
      <div class="donut-center">${pct}%</div>
    </div>
  `;
}

function createEndCard() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const card = document.createElement("div");
  card.className = "inline-question-card end-card";

  const title =
    pct >= 80 ? "¡Excelente resultado!" :
    pct >= 50 ? "¡Buen progreso!" :
    pct >= 25 ? "Buen comienzo" :
    "Sigue practicando";

  card.innerHTML = `
    <h3>${title}</h3>
    ${createDonutChart()}
    <p>
      Has completado las preguntas de prueba.<br>
      Accede al <strong>banco oficial completo del examen CCSE (2026)</strong>,
      simulacros reales y estadísticas detalladas.
    </p>
    <a href="https://civiclearn.com/ccse/checkout.html" class="hero-primary-btn">
      Acceso completo
    </a>
  `;

  return card;
}

// ----------------------------
// BUILD ROWS
// ----------------------------
const rows = [];
for (let i = 0; i < totalQuestions; i += QUESTIONS_PER_ROW) {
  rows.push(INLINE_TEST_QUESTIONS.slice(i, i + QUESTIONS_PER_ROW));
}

INLINE_TEST_QUESTIONS.forEach(q => shuffleAnswers(q));

// ----------------------------
// RENDERING
// ----------------------------
function renderRow(rowIndex) {
  if (!rows[rowIndex]) return;

  rows[rowIndex].forEach((q, offset) => {
    const absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
    container.appendChild(createQuestionCard(q, absoluteIndex));
  });
}

function createQuestionCard(questionObj, absoluteIndex) {
  const card = document.createElement("div");
  card.className = "inline-question-card";

  const title = document.createElement("h3");
  title.textContent = questionObj.q;

  const feedback = document.createElement("div");
  feedback.className = "inline-feedback";

  card.append(title);

  questionObj.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "inline-option-btn";
    btn.textContent = opt;

    btn.onclick = () => {
      answeredCount++;
      updateProgressDisplay();
      updateProgressBar();

      if (i === questionObj.correct) {
        correctCount++;
        feedback.textContent = "Correcto";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        feedback.textContent =
          "Respuesta correcta: " + questionObj.a[questionObj.correct];
        feedback.classList.add("inline-wrong");
      }

      card.querySelectorAll("button").forEach(b => (b.disabled = true));
      card.appendChild(feedback);

      const isLastQuestion = absoluteIndex === totalQuestions - 1;

      if (isLastQuestion) {
        setTimeout(() => container.appendChild(createEndCard()), 300);
      }

      const isLastInRow =
        (absoluteIndex + 1) % QUESTIONS_PER_ROW === 0 &&
        absoluteIndex !== totalQuestions - 1;

      if (isLastInRow) {
        currentRow++;
        renderRow(currentRow);
      }
    };

    card.appendChild(btn);
  });

  return card;
}

// ----------------------------
// INITIAL RENDER
// ----------------------------
renderRow(0);
updateProgressDisplay();
updateProgressBar();

// ----------------------------
// CONTINUE BUTTON
// ----------------------------
expandBtn.onclick = () => {
  currentRow = 1;
  renderRow(currentRow);
  expandBtn.style.display = "none";
};
