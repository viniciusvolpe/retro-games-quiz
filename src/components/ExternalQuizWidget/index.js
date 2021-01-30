import PropTypes from 'prop-types';
import styled from 'styled-components';
import Button from '../Button';
import Widget from '../Widget';

const UserName = styled.small`
    font-size: xx-small;
`;

const RepoName = styled.strong`
    display: block;
`;

const Title = styled.h4`
    margin-bottom: 10px;
`;

export default function ExternalQuizWidget({ repositories }) {
  return (
    <Widget>
      <Widget.Content>
        <Title>Quizes da Galera</Title>
        {repositories.map(({ repoName, user, url }) => (
          <Button as="a" href={`/quiz/${user}__${repoName}?name=`} hey={url}>
            <RepoName>{repoName}</RepoName>
            <UserName>{user}</UserName>
          </Button>
        ))}
      </Widget.Content>
    </Widget>
  );
}

ExternalQuizWidget.propTypes = {
  repositories: PropTypes.array.isRequired,
};
