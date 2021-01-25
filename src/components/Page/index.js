import styled from "styled-components";
import PropTypes from "prop-types";
import { QuizBackground, QuizLogo, Footer, GitHubCorner } from "../";

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

export default function Page({ children, background, projectUrl }) {
  return (
    <QuizBackground backgroundImage={background}>
      <QuizContainer>
        <QuizLogo />
        {children}
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl={projectUrl} />
    </QuizBackground>
  );
}

Page.propTypes = {
  children: PropTypes.node.isRequired,
  background: PropTypes.string.isRequired,
  projectUrl: PropTypes.string.isRequired,
};
