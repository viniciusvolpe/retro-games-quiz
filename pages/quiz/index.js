import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import db from '../../db.json';
import { Button, Page, Widget } from '../../src/components';

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        [Loading]
      </Widget.Content>
    </Widget>
  );
}

const Image = styled.img`
  width: 100%;
  height: 150px;
`;

const QuestionTitle = styled.h4`
  line-height: 24px;
  margin: 0;
`;

const Message = styled.div`
  font-size: 10px;
  width: 100%;
  text-align: center;
  color: ${({ theme, correct }) => (correct ? theme.colors.success : theme.colors.error)};
`;

function QuestionWidget({
  question, index, total, onSubmit,
}) {
  const [answer, setAnswer] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const title = `Pergunta ${index + 1} de ${total}`;
  const isCorrect = answer === question.answer;

  function handleSubmit(event) {
    event.preventDefault();
    if (confirmed) {
      onSubmit();
      setAnswer(null);
      setConfirmed(false);
    } else {
      setConfirmed(true);
    }
  }

  function handleClick(alternativeIndex) {
    if (!confirmed) {
      setAnswer(alternativeIndex);
    }
  }

  function showStatus() {
    if (!confirmed) return null;
    return isCorrect ? 'Parabens, voce acertou!' : 'Que pena, voce errou';
  }

  function mapAlternatives(alternative, alternativeIndex) {
    const alternativeId = `alternative__${alternativeIndex}`;
    return (
      <Widget.Topic
        htmlFor={alternativeId}
        key={alternativeId}
        onClick={() => handleClick(alternativeIndex)}
        selected={answer === alternativeIndex}
        confirmed={confirmed}
        correct={isCorrect}
      >
        {alternative}
      </Widget.Topic>
    );
  }

  function getButtonLabel() {
    if (!confirmed) return 'Confirmar';
    return index === total - 1 ? 'Ver resultado' : 'Proxima pergunta';
  }

  return (
    <Widget>
      <Widget.Header>
        <h2>
          {title}
        </h2>
      </Widget.Header>
      <Image
        src={question.image}
        alt="Imagem da questao"
      />
      <Widget.Content>
        <form onSubmit={handleSubmit}>
          <QuestionTitle>{question.title}</QuestionTitle>
          <p>{question.description}</p>
          {question.alternatives.map(mapAlternatives)}
          <Message correct={isCorrect}>{showStatus()}</Message>
          <Button type="submit">
            {getButtonLabel()}
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

QuestionWidget.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const PAGE_STATES = {
  LOADING: 'LOADING',
  QUIZ: 'QUIZ',
  RESULT: 'RESULT',
};

function Quiz() {
  const [pageState, setPageState] = useState(PAGE_STATES.LOADING);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const total = db.questions.length;
  const question = db.questions[currentQuestion];

  useEffect(() => {
    setTimeout(() => setPageState(PAGE_STATES.QUIZ), 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < total) {
      setCurrentQuestion(nextQuestion);
    } else {
      setPageState(PAGE_STATES.RESULT);
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
    </Page>
  );
}

export default Quiz;
