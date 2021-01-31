import db from '../../db.json';
import Quiz from '../../src/screens/Quiz';

function QuizPage() {
  return <Quiz db={db} />;
}

export default QuizPage;
