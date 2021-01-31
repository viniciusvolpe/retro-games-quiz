import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import NotFound from '../../src/screens/NotFound';
import Quiz from '../../src/screens/Quiz';

function ExternalQuizPage({ externalDB, notFound }) {
  return (
    <>
      {notFound && <NotFound />}
      {!notFound && (
        <ThemeProvider theme={externalDB.theme}>
          <Quiz db={externalDB} />
        </ThemeProvider>
      ) }
    </>
  );
}

export async function getServerSideProps(context) {
  const defaultReturn = {
    props: {
      notFound: true,
    },
  };
  try {
    const { url } = context.query;
    if (!url) return defaultReturn;
    const serverUrl = url.endsWith('/') ? url : `${url}/`;
    const externalDB = await fetch(`${serverUrl}api/db`).then((r) => r.json());
    return {
      props: {
        externalDB,
      },
    };
  } catch (error) {
    console.error(error);
    return defaultReturn;
  }
}

ExternalQuizPage.propTypes = {
  externalDB: PropTypes.object,
  notFound: PropTypes.bool,
};

ExternalQuizPage.defaultProps = {
  notFound: false,
  externalDB: {},
};

export default ExternalQuizPage;
