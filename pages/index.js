import db from '../db.json';
import { Page, Widget } from '../src/components';

export default function Home() {
  return (
    <Page background={db.bg} projectUrl={db.projectUrl}>
      <Widget>
        <Widget.Header>
          <h1>{db.title}</h1>
        </Widget.Header>
        <Widget.Content>
          <p>{db.description}</p>
        </Widget.Content>
      </Widget>

      <Widget>
        <Widget.Content>
          <h1>Quizes da Galera</h1>

          <p>lorem ipsum dolor sit amet...</p>
        </Widget.Content>
      </Widget>
    </Page>
  );
}
