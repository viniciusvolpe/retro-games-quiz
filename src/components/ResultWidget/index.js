import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import Link from '../Link';
import Widget from '../Widget';

const ResultContainer = styled.div`
  p {
    margin-top: 20px;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const RankWidget = styled.div`
  padding: 10px;
  height: 200px;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 3px;
  }
  &::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => `${theme.colors.secondary}`};
    outline: 1px solid ${({ theme }) => `${theme.colors.mainBg}`};
  }
`;

const Medal = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  border: 2px solid black;
  border-radius: 50%;
  background-color: white;
  &[data-position="1"] {
    background-color: gold;
  }
  &[data-position="2"] {
    background-color: silver;
  }
  &[data-position="3"] {
    background-color: coral;
  }
`;

const PlayerScoreContainer = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const PalyerName = styled.span`
  flex: 1;
  margin-left: 10px;
  border-bottom: 1px dashed white;
`;

function PlayerScore({ playerScore, position }) {
  return (
    <PlayerScoreContainer>
      <Medal data-position={position} />
      <PalyerName>{playerScore.name}</PalyerName>
      <span>{playerScore.score}</span>
    </PlayerScoreContainer>
  );
}

PlayerScore.propTypes = {
  playerScore: PropTypes.object.isRequired,
  position: PropTypes.number.isRequired,
};

export default function ResultWidget({
  correctAnswers, score, total, rank, name,
}) {
  const router = useRouter();

  function getPlayerMessage() {
    const percentage = Math.ceil(correctAnswers / total);
    const playerName = name ?? '';
    if (percentage > 0.8) { return `Mandou bem ${playerName}!`; }
    if (percentage > 0.5) { return `Quase lá ${playerName}`; }
    return `Não foi desta vez ${name}!`;
  }

  function goToHome() {
    router.push('/');
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
            <Icon src="https://i.ibb.co/gjg24n3/ezgif-com-gif-maker.gif" alt="Coin icon" />
            {`${score} pontos`}
          </p>
        </ResultContainer>
        <RankWidget as={Widget}>
          <ul>
            {rank.map((playerScore, index) => (
              <PlayerScore playerScore={playerScore} position={index + 1} />
            ))}
          </ul>
        </RankWidget>
        <Button onClick={goToHome}>Voltar para a Home</Button>
      </Widget.Content>
    </Widget>
  );
}

ResultWidget.propTypes = {
  correctAnswers: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  rank: PropTypes.array,
};

ResultWidget.defaultProps = {
  rank: [],
};
