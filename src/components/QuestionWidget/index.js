import { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import Widget from '../Widget';

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
`;

const QuestionTitle = styled.h4`
  line-height: 24px;
  margin: 0;
`;

const Message = styled.div`
  font-size: 10px;
  width: 100%;
  text-align: center;
  color: ${({ theme, correct }) => theme.colors[correct ? 'success' : 'error']};
`;

const Form = styled.form`
  label {
    background-color: ${({ theme }) => `${theme.colors.primary}60`};
    &[selected="true"] {
      background-color: ${({ theme }) => theme.colors.primary};
    };
    &[confirmed="true"] {
      &[correct="true"] {
        background-color: ${({ theme }) => theme.colors.success};
      };
      &[correct="false"] {
        background-color: ${({ theme }) => theme.colors.error};
      };
    };
  };
`;

export default function QuestionWidget({
  question, index, total, onSubmit,
}) {
  const [answer, setAnswer] = useState();
  const [confirmed, setConfirmed] = useState(false);
  const title = `Pergunta ${index + 1} de ${total}`;
  const isCorrect = answer === question.answer;

  function handleSubmit(event) {
    event.preventDefault();
    if (confirmed) {
      onSubmit(isCorrect);
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
        <Form onSubmit={handleSubmit}>
          <QuestionTitle>{question.title}</QuestionTitle>
          <p>{question.description}</p>
          {question.alternatives.map(mapAlternatives)}
          <Message correct={isCorrect}>{showStatus()}</Message>
          <Button type="submit">
            {getButtonLabel()}
          </Button>
        </Form>
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
