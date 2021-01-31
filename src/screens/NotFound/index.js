import { Button, Page, Widget } from '../../components';

function NotFound() {
  return (
    <Page>
      <Widget>
        <Widget.Header>
          Não foi possível carregar o quiz
        </Widget.Header>
        <Widget.Content>
          <p>Infelizmente não conseguimos recuperar os dados do quiz selecionado.</p>
          <Button as="a" href="/">Voltar</Button>
        </Widget.Content>
      </Widget>
    </Page>
  );
}

export default NotFound;
