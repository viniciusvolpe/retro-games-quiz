import { useEffect, useState } from 'react';
import db from '../../db.json';
import {
  LoadingWidget, Page, QuestionWidget, ResultWidget,
} from '../../src/components';

const PAGE_STATES = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

function Quiz() {
  const [pageState, setPageState] = useState(PAGE_STATES.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const total = db.questions.length;
  const question = db.questions[currentQuestion];

  useEffect(() => {
    setTimeout(() => setPageState(PAGE_STATES.QUIZ), 1 * 1000);
  }, []);

  function handleSubmit(isCorrect) {
    setResults([...results, isCorrect]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < total) {
      setCurrentQuestion(nextQuestion);
    } else {
      setPageState(PAGE_STATES.RESULT);
    }
  }

  function getResults() {
    const correctAnswers = results.filter((result) => result).length;
    const points = correctAnswers * 20;
    return {
      correctAnswers,
      points,
      total,
    };
  }

  return (
    <Page background={db.bg} projectUrl={db.projectUrl}>
      {pageState === PAGE_STATES.LOADING && <LoadingWidget />}
      {pageState === PAGE_STATES.QUIZ && (
        <QuestionWidget
          question={question}
          index={currentQuestion}
          total={total}
          onSubmit={handleSubmit}
        />
      )}
      {pageState === PAGE_STATES.RESULT && (
        <ResultWidget
          {...getResults()}
        />
      )}
    </Page>
  );
}

export default Quiz;
