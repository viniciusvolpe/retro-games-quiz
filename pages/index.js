import { useRouter } from 'next/router';
import db from '../db.json';
import { InitialForm, Page, Widget } from '../src/components';

export default function Home() {
  const router = useRouter();

  function handleSubmit({ name }) {
    router.push({
      pathname: 'quiz',
      query: {
        name,
      },
    });
  }

  return (
    <Page background={db.bg} projectUrl={db.projectUrl}>
      <Widget>
        <Widget.Header>
          <h1>{db.title}</h1>
        </Widget.Header>
        <Widget.Content>
          <InitialForm onSubmit={handleSubmit} />
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
