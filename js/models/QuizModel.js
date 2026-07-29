/**
 * MODEL
 * Responsável apenas por dados e regras de negócio:
 * - guarda as perguntas (múltipla escolha e dissertativas)
 * - guarda o estado atual (índice, pontuação, respostas dadas)
 * - valida respostas de múltipla escolha
 * - registra respostas dissertativas (sem validação automática)
 * Não sabe nada sobre HTML/DOM.
 */
class QuizModel {
  constructor(questions) {
    this.questions = questions;
    this.objectiveTotal = questions.filter((q) => q.type !== "open").length;
    this.openTotal = questions.filter((q) => q.type === "open").length;
    this.reset();
  }

  reset() {
    this.currentIndex = 0;
    this.score = 0;
    // null = ainda não respondida.
    // "mc"   -> guarda o índice (number) escolhido
    // "open" -> guarda o texto escrito (string, pode ser "")
    this.userAnswers = new Array(this.questions.length).fill(null);
  }

  get total() {
    return this.questions.length;
  }

  getCurrentQuestion() {
    return this.questions[this.currentIndex];
  }

  isLastQuestion() {
    return this.currentIndex === this.total - 1;
  }

  isFirstQuestion() {
    return this.currentIndex === 0;
  }

  hasAnsweredCurrent() {
    return this.userAnswers[this.currentIndex] !== null;
  }

  /**
   * Valida a resposta de múltipla escolha da pergunta atual.
   * Retorna { correct, correctIndex, explanation }
   */
  submitAnswer(selectedIndex) {
    const question = this.getCurrentQuestion();
    const alreadyAnswered = this.hasAnsweredCurrent();
    const correct = selectedIndex === question.answer;

    if (!alreadyAnswered) {
      this.userAnswers[this.currentIndex] = selectedIndex;
      if (correct) this.score += 1;
    }

    return {
      correct,
      correctIndex: question.answer,
      explanation: question.explanation
    };
  }

  /**
   * Registra a resposta dissertativa (sem validação automática).
   * Retorna a própria pergunta, que já contém exampleAnswer,
   * acceptableAnswers e tip para a View exibir o "gabarito".
   */
  submitOpenAnswer(text) {
    const question = this.getCurrentQuestion();
    if (!this.hasAnsweredCurrent()) {
      const trimmed = (text || "").trim();
      this.userAnswers[this.currentIndex] = trimmed.length ? trimmed : "";
    }
    return question;
  }

  goNext() {
    if (!this.isLastQuestion()) this.currentIndex += 1;
  }

  goPrevious() {
    if (!this.isFirstQuestion()) this.currentIndex -= 1;
  }

  getScoreSummary() {
    const percentage = this.objectiveTotal
      ? Math.round((this.score / this.objectiveTotal) * 100)
      : 0;
    let level = "A1";
    if (percentage >= 90) level = "A2 avançado";
    else if (percentage >= 70) level = "A2";
    else if (percentage >= 50) level = "A1 avançado";
    else level = "A1 iniciante";

    return {
      score: this.score,
      objectiveTotal: this.objectiveTotal,
      openTotal: this.openTotal,
      percentage,
      level
    };
  }
}