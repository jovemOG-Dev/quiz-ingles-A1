/**
 * Entry point.
 * Junta as três camadas (Model, View, Controller) do MVC.
 */
document.addEventListener("DOMContentLoaded", () => {
  const model = new QuizModel(QUESTIONS);
  const view = new QuizView();
  new QuizController(model, view);
});