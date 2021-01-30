import Widget from '../Widget';

export default function LoadingWidget() {
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
