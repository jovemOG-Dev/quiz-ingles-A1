/**
 * VIEW
 * Responsável apenas por manipular o DOM: renderizar telas,
 * atualizar progresso, mostrar feedback visual.
 * Não decide se uma resposta está certa - só exibe o que o
 * Controller manda.
 */
class QuizView {
  constructor() {
    this.app = document.getElementById("app");

    // cache dos elementos usados com frequência
    this.els = {
      progressFill: document.getElementById("progress-fill"),
      progressLabel: document.getElementById("progress-label"),
      categoryTag: document.getElementById("category-tag"),
      dialogue: document.getElementById("dialogue"),
      question: document.getElementById("question-text"),
      optionsList: document.getElementById("options-list"),
      openWrap: document.getElementById("open-answer-wrap"),
      openInput: document.getElementById("open-answer-input"),
      revealBtn: document.getElementById("reveal-answer-btn"),
      feedback: document.getElementById("feedback"),
      nextBtn: document.getElementById("next-btn"),
      prevBtn: document.getElementById("prev-btn"),
      quizScreen: document.getElementById("quiz-screen"),
      startScreen: document.getElementById("start-screen"),
      resultScreen: document.getElementById("result-screen"),
    };
  }

  showScreen(name) {
    ["start-screen", "quiz-screen", "result-screen"].forEach((id) => {
      document.getElementById(id).classList.toggle("hidden", id !== name);
    });
  }

  renderProgress(currentIndex, total) {
    const pct = Math.round((currentIndex / total) * 100);
    this.els.progressFill.style.width = `${pct}%`;
    this.els.progressLabel.textContent = `Pergunta ${currentIndex + 1} de ${total}`;
  }

  /**
   * Renderiza a pergunta atual. Ramifica pelo tipo:
   * - "mc"   -> lista de opções (onSelect)
   * - "open" -> textarea + botão de revelar gabarito (onReveal)
   */
  renderQuestion(question, { onSelect, onReveal }) {
    this.els.categoryTag.textContent = question.category;
    this.els.dialogue.textContent = question.dialogue || "";
    this.els.dialogue.classList.toggle("hidden", !question.dialogue);
    this.els.question.textContent = question.question;

    this.els.feedback.className = "feedback hidden";
    this.els.feedback.textContent = "";
    this.els.nextBtn.disabled = true;

    const isOpen = question.type === "open";
    this.els.optionsList.classList.toggle("hidden", isOpen);
    this.els.openWrap.classList.toggle("hidden", !isOpen);

    if (isOpen) {
      this.els.openInput.value = "";
      this.els.openInput.disabled = false;
      this.els.openInput.placeholder = question.placeholder || "Escreva sua resposta em inglês...";
      this.els.revealBtn.disabled = false;
      this.els.revealBtn.textContent = "Ver resposta esperada";
      this.els.revealBtn.onclick = () => onReveal(this.els.openInput.value);
      return;
    }

    this.els.optionsList.innerHTML = "";
    question.options.forEach((optionText, index) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "option-btn";
      if (optionText.length > 40) btn.classList.add("option-btn--sentence");
      btn.textContent = optionText;
      btn.dataset.index = index;
      btn.addEventListener("click", () => onSelect(index, btn));
      li.appendChild(btn);
      this.els.optionsList.appendChild(li);
    });
  }

  /**
   * Marca visualmente as opções após a resposta ser validada (mc).
   */
  showAnswerFeedback({ correct, correctIndex, explanation }, selectedBtn) {
    const buttons = [...this.els.optionsList.querySelectorAll(".option-btn")];

    buttons.forEach((btn) => {
      btn.disabled = true;
      const idx = Number(btn.dataset.index);
      if (idx === correctIndex) btn.classList.add("correct");
      if (idx !== correctIndex && btn === selectedBtn) btn.classList.add("incorrect");
    });

    this.els.feedback.classList.remove("hidden");
    this.els.feedback.classList.add(correct ? "correct" : "incorrect");
    this.els.feedback.textContent = correct
      ? `✅ Correto! ${explanation}`
      : `❌ Quase! ${explanation}`;

    this.els.nextBtn.disabled = false;
  }

  /**
   * Mostra o "gabarito" de uma questão dissertativa: exemplo de
   * resposta + outras formas aceitáveis + dica. Não julga certo/errado.
   */
  showOpenFeedback(question) {
    this.els.openInput.disabled = true;
    this.els.revealBtn.disabled = true;

    const alternatives = question.acceptableAnswers
      .map((alt) => `• ${alt}`)
      .join("\n");

    this.els.feedback.classList.remove("hidden");
    this.els.feedback.classList.add("neutral");
    this.els.feedback.innerHTML =
      `<strong>Sugestão de resposta:</strong> ${question.exampleAnswer}` +
      `<br><br><strong>Outras formas aceitáveis:</strong><br>${alternatives.replace(/\n/g, "<br>")}` +
      `<br><br><em>${question.tip}</em>`;

    this.els.nextBtn.disabled = false;
  }

  updateNavButtons({ isFirst, isLast, answered }) {
    this.els.prevBtn.disabled = isFirst;
    this.els.nextBtn.textContent = isLast ? "Ver resultado" : "Próxima";
    this.els.nextBtn.disabled = !answered;
  }

  renderResult({ score, objectiveTotal, openTotal, percentage, level }) {
    document.getElementById("result-score").textContent = `${score} / ${objectiveTotal}`;
    document.getElementById("result-percentage").textContent = `${percentage}%`;
    document.getElementById("result-level").textContent = level;

    const note = document.getElementById("result-open-note");
    note.textContent = openTotal
      ? `Você também praticou ${openTotal} questão${openTotal > 1 ? "ões" : ""} dissertativa${openTotal > 1 ? "s" : ""}.`
      : "";

    const ring = document.getElementById("result-ring-fill");
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (percentage / 100) * circumference;
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${offset}`;
  }

  applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    const btn = document.getElementById("theme-toggle");
    if (btn) btn.setAttribute("aria-pressed", theme === "dark");
  }
}