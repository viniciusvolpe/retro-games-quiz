import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Widget from '../Widget';

export default function ResultWidget({ correctAnswers, points, total }) {
  const { query: { name } } = useRouter();
  function getPlayerMessage() {
    const percentage = Math.ceil(correctAnswers / total);
    if (percentage > 0.8) { return `Mandou bem ${name}!`; }
    if (percentage > 0.5) { return `Quase lá ${name}`; }
    return `Não foi desta vez ${name}!`;
  }
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>
      <Widget.Content>
        <small>{getPlayerMessage()}</small>
        <p>
          {`Total de pontos: ${points}`}
        </p>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
