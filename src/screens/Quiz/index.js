import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import LoadingWidget from '../../components/LoadingWidget';
import Page from '../../components/Page';
import QuestionWidget from '../../components/QuestionWidget';
import ResultWidget from '../../components/ResultWidget';

const PAGE_STATES = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

function Quiz({ db }) {
  const [pageState, setPageState] = useState(PAGE_STATES.QUIZ);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const total = db.questions.length;
  const question = db.questions[currentQuestion];

  useEffect(() => {
    // setTimeout(() => setPageState(PAGE_STATES.QUIZ), 1 * 1000);
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

Quiz.propTypes = {
  db: PropTypes.object.isRequired,
};

export default Quiz;
