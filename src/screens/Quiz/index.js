import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import LoadingWidget from '../../components/LoadingWidget';
import Page from '../../components/Page';
import QuestionWidget from '../../components/QuestionWidget';
import ResultWidget from '../../components/ResultWidget';

const PAGE_STATES = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

function Quiz({ db, rank }) {
  const { query: { name } } = useRouter();
  const [pageState, setPageState] = useState(PAGE_STATES.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState([]);
  const [playerScore, setPlayerScore] = useState({});
  const total = db.questions.length;
  const question = db.questions[currentQuestion];

  useEffect(() => {
    setTimeout(() => setPageState(PAGE_STATES.QUIZ), 1 * 1000);
  }, []);

  async function calculateAndSaveScore() {
    const correctAnswers = results.filter((result) => result).length;
    const score = correctAnswers * 20;
    const calculatedScore = {
      correctAnswers,
      score,
      total,
    };
    await fetch('/api/rank', {
      method: 'POST',
      body: JSON.stringify({ name, score }),
    });
    setPlayerScore(calculatedScore);
    setPageState(PAGE_STATES.RESULT);
  }

  function handleSubmit(isCorrect) {
    setResults([...results, isCorrect]);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < total) {
      setCurrentQuestion(nextQuestion);
    } else {
      calculateAndSaveScore();
    }
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
          name={name}
          rank={rank}
          {...playerScore}
        />
      )}
    </Page>
  );
}

Quiz.propTypes = {
  db: PropTypes.object.isRequired,
  rank: PropTypes.array,
};

Quiz.defaultProps = {
  rank: [],
};

export default Quiz;
