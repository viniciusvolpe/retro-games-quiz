import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import db from '../db.json';
import {
  ExternalQuizWidget, InitialForm, Page, Widget,
} from '../src/components';

export default function Home({ repositories }) {
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
      <ExternalQuizWidget repositories={repositories} />
    </Page>
  );
}

Home.propTypes = {
  repositories: PropTypes.array.isRequired,
};

export async function getStaticProps() {
  try {
    const response = await fetch('https://api.github.com/search/repositories?q=topic:aluraquiz').then((r) => r.json());
    const randomIndex = Math.floor(Math.random() * Math.floor(response.items.length - 3));
    const repositories = response
      .items
      .filter((repository) => !!repository.homepage)
      .splice(randomIndex, 3)
      .map((repository) => {
        const [user, repoName] = repository.html_url.replace('https://github.com/', '').split('/');
        return {
          repoName,
          user,
          url: repository.homepage,
        };
      });
    return {
      props: {
        repositories,
      },
    };
  } catch (error) {
    throw Error(error);
  }
}
