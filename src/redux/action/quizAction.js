export const FETCH_CURRENT_QUIZ = 'FETCH_CURRENT_QUIZ'

export function currentQuiz(currentQuizData) {
  return {
    type: FETCH_CURRENT_QUIZ,
    payload: currentQuizData,
  }
}
