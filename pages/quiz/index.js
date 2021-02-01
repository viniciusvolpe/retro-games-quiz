import PropTypes from 'prop-types';
import db from '../../db.json';
import Quiz from '../../src/screens/Quiz';
import rankJson from '../../public/rank.json';

function QuizPage({ rank }) {
  return <Quiz db={db} rank={rank} />;
}

QuizPage.propTypes = {
  rank: PropTypes.array.isRequired,
};

export default QuizPage;

export async function getServerSideProps() {
  const rank = rankJson.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score < b.score) return 1;
    return 0;
  }).slice(0, 10);
  return {
    props: {
      rank,
    },
  };
}
