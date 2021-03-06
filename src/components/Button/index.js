import styled from 'styled-components';

const Button = styled.button`
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  padding: 10px 0;
  text-align: center;
  text-decoration: none;
  margin-top: 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.contrastText};
  border: none;
  box-shadow: 5px 5px #000000;
  &:hover {
    transform: scale(1.05);
    box-shadow: 8px 8px #000000;
  }
  &:disabled{
    transform: unset;
    color: gray;
    box-shadow: 5px 5px #000000;
  }
`;

export default Button;
