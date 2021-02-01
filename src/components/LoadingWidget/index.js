import styled from 'styled-components';
import Widget from '../Widget';
import Spinner from '../Spinner';

const LoadingContainer = styled.div`
  width: 100%;
  display: grid;
  place-content: center;
`;

export default function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>
        Carregando...
      </Widget.Header>
      <Widget.Content>
        <LoadingContainer>
          <Spinner size={150} />
        </LoadingContainer>
      </Widget.Content>
    </Widget>
  );
}
