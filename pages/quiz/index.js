import db from "../../db.json";
import { Page, Widget } from "../../src/components";

const Quiz = () => {
  return (
    <Page background={db.bg} projectUrl={db.projectUrl}>
      <Widget>
        <Widget.Header>
          <h1>Pergunta x de y</h1>
        </Widget.Header>
        <Widget.Content>
          <div>pergunta</div>
        </Widget.Content>
      </Widget>
    </Page>
  );
};

export default Quiz;
