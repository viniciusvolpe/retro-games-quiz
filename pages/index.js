import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import db from '../db.json';
import {
  Button,
  ExternalQuizWidget, Input, Page, Widget,
} from '../src/components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

export default function Home({ repositories }) {
  const router = useRouter();
  const [name, setName] = useState();

  function handleInputChange(event) {
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    router.push({
      pathname: 'quiz',
      query: {
        name,
      },
    });
  }

  return (
    <Page background={db.bg} projectUrl={db.projectUrl}>
      <Widget
        as={motion.section}
        variants={{
          show: { opacity: 1, y: '0' },
          hidden: { opacity: 0, y: '100%' },
        }}
        transition={{ delay: 0.5, duration: 0.5 }}
        initial="hidden"
        animate="show"
      >
        <Widget.Header>
          <h1>{db.title}</h1>
        </Widget.Header>
        <Widget.Content>
          <Form onSubmit={handleSubmit}>
            <Input placeholder="Digite seu nome" name="name" autoComplete="off" onChange={handleInputChange} />
            <Button type="submit" disabled={!name}>Jogar</Button>
          </Form>
        </Widget.Content>
      </Widget>
      <ExternalQuizWidget repositories={repositories} disabled={!name} />
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
