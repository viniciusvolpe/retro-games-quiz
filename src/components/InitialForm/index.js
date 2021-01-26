import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Input from '../Input';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

function InitialForm({ onSubmit }) {
  const [name, setName] = useState();

  function handleOnSubmit(event) {
    event.preventDefault();
    onSubmit({ name });
  }

  function handleInputChange(event) {
    setName(event.target.value);
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <Input placeholder="Digite seu nome para jogar" onChange={handleInputChange} />
      <Button type="submit" disabled={!name}>Jogar</Button>
    </Form>
  );
}

InitialForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default InitialForm;
