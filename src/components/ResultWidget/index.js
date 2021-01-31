import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Widget from '../Widget';

const ResultContainer = styled.div`
  p {
    margin-top: 20px;
  }
`;

export default function ResultWidget({ correctAnswers, points, total }) {
  const { query: { name } } = useRouter();
  function getPlayerMessage() {
    const percentage = Math.ceil(correctAnswers / total);
    const playerName = name ?? '';
    if (percentage > 0.8) { return `Mandou bem ${playerName}!`; }
    if (percentage > 0.5) { return `Quase lá ${playerName}`; }
    return `Não foi desta vez ${name}!`;
  }
  return (
    <Widget>
      <Widget.Header>
        Resultado
      </Widget.Header>
      <Widget.Content>
        <ResultContainer>
          <small>{getPlayerMessage()}</small>
          <p>
            {`Total de pontos: ${points}`}
          </p>
        </ResultContainer>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  points: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};
