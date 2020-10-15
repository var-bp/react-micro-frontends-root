import React from 'react';
import { History } from 'history';
import { Switch, Route, Redirect } from 'react-router-dom';
import MicroFrontend from './MicroFrontend';
import NotFound from './NotFound';
import Header from './Header';
import { Container, Body } from './App.style';

interface Props {
  history: History;
}

const REPOSITORY_1 = ({ history }: Props) => (
  <MicroFrontend history={history} host={process.env.REPOSITORY_1_HOST} name="REPOSITORY_1" />
);
const REPOSITORY_2 = ({ history }: Props) => (
  <MicroFrontend history={history} host={process.env.REPOSITORY_2_HOST} name="REPOSITORY_2" />
);

const App = (): JSX.Element => {
  return (
    <Container>
      <Header />
      <Body>
        <Switch>
          <Redirect exact from="/" to="/repository-1" />
          <Route path="/repository-1" component={REPOSITORY_1} />
          <Route path="/repository-2" component={REPOSITORY_2} />
          <Route component={NotFound} />
        </Switch>
      </Body>
    </Container>
  );
};

export default App;
