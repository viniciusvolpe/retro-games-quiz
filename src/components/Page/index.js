import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import QuizBackground from '../QuizBackground';
import QuizLogo from '../QuizLogo';
import Footer from '../Footer';
import GitHubCorner from '../GitHubCorner';

const QuizContainer = styled.aside`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`;

function Page({ children, background, projectUrl }) {
  return (
    <QuizBackground backgroundImage={background}>
      <QuizContainer>
        <QuizLogo />
        {children}
        <Footer
          as={motion.section}
          variants={{
            show: { opacity: 1 },
            hidden: { opacity: 0 },
          }}
          transition={{ delay: 0.5, duration: 0.5 }}
          initial="hidden"
          animate="show"
        />
      </QuizContainer>
      {projectUrl && <GitHubCorner projectUrl={projectUrl} />}
    </QuizBackground>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string,
  projectUrl: PropTypes.string,
};

Page.defaultProps = {
  background: null,
  projectUrl: null,
};

export default React.memo(Page);
