
'use strict';
// A tiny, progressively enhanced comprehension question on each guide.
document.querySelectorAll('[data-quiz]').forEach((quiz) => {
  const answer = Number(quiz.dataset.answer);
  const feedback = quiz.querySelector('.quiz-feedback');
  const buttons = [...quiz.querySelectorAll('button[data-option]')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const correct = Number(button.dataset.option) === answer;
    feedback.textContent = correct ? '✓ Correct! Nicely done.' : 'Not quite. Review the explanation above and try another visit.';
    buttons.forEach(b => b.disabled = true);
    feedback.focus();
  }));
});
