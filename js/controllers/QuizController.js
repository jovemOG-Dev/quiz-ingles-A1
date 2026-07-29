/**
 * CONTROLLER
 * Conecta Model e View: escuta eventos da interface, chama o
 * Model para validar/alterar estado, e manda a View re-renderizar.
 */
class QuizController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.bindStaticEvents();
    this.initTheme();
  }

  bindStaticEvents() {
    document.getElementById("start-btn").addEventListener("click", () => this.start());
    document.getElementById("restart-btn").addEventListener("click", () => this.start());
    document.getElementById("next-btn").addEventListener("click", () => this.next());
    document.getElementById("prev-btn").addEventListener("click", () => this.previous());
    document.getElementById("theme-toggle").addEventListener("click", () => this.toggleTheme());
  }

  initTheme() {
    const saved = localStorage.getItem("quiz-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    this.view.applyTheme(theme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    localStorage.setItem("quiz-theme", next);
    this.view.applyTheme(next);
  }

  start() {
    this.model.reset();
    this.view.showScreen("quiz-screen");
    this.renderCurrentQuestion();
  }

  renderCurrentQuestion() {
    const question = this.model.getCurrentQuestion();
    this.view.renderProgress(this.model.currentIndex, this.model.total);
    this.view.renderQuestion(question, {
      onSelect: (index, btn) => this.selectAnswer(index, btn),
      onReveal: (text) => this.revealOpenAnswer(text),
    });
    this.view.updateNavButtons({
      isFirst: this.model.isFirstQuestion(),
      isLast: this.model.isLastQuestion(),
      answered: this.model.hasAnsweredCurrent(),
    });

    // se o usuário já respondeu essa pergunta antes (voltou com "Anterior"),
    // reconstrói o feedback visual sem duplicar pontuação.
    if (this.model.hasAnsweredCurrent()) {
      if (question.type === "open") {
        this.view.els.openInput.value = this.model.userAnswers[this.model.currentIndex];
        this.view.showOpenFeedback(question);
      } else {
        const selectedIndex = this.model.userAnswers[this.model.currentIndex];
        const buttons = [...document.querySelectorAll(".option-btn")];
        const result = this.model.submitAnswer(selectedIndex); // não duplica pontuação
        this.view.showAnswerFeedback(result, buttons[selectedIndex]);
      }
    }
  }

  selectAnswer(index, btn) {
    if (this.model.hasAnsweredCurrent()) return; // evita responder 2x
    const result = this.model.submitAnswer(index);
    this.view.showAnswerFeedback(result, btn);
    this.view.updateNavButtons({
      isFirst: this.model.isFirstQuestion(),
      isLast: this.model.isLastQuestion(),
      answered: true,
    });
  }

  revealOpenAnswer(text) {
    if (this.model.hasAnsweredCurrent()) return; // evita revelar 2x
    const question = this.model.submitOpenAnswer(text);
    this.view.showOpenFeedback(question);
    this.view.updateNavButtons({
      isFirst: this.model.isFirstQuestion(),
      isLast: this.model.isLastQuestion(),
      answered: true,
    });
  }

  next() {
    if (!this.model.hasAnsweredCurrent()) return;

    if (this.model.isLastQuestion()) {
      this.finish();
      return;
    }
    this.model.goNext();
    this.renderCurrentQuestion();
  }

  previous() {
    this.model.goPrevious();
    this.renderCurrentQuestion();
  }

  finish() {
    const summary = this.model.getScoreSummary();
    this.view.showScreen("result-screen");
    this.view.renderResult(summary);
  }
}