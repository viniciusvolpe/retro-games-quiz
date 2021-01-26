import styled from 'styled-components';

const borderColor = ({ theme }) => theme.colors.secondary;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 1px solid ${borderColor};
  margin-bottom: 10px;
  :focus {
    outline: unset;
    caret-color: white;
    border-bottom: 2px solid ${borderColor};
    padding: 5px;
  }
`;

export default Input;
