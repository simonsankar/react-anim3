import React from 'react';
import { BrowserRouter, Route, withRouter, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Container } from 'semantic-ui-react';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import Newest from './containers/Newest';
import Updated from './containers/Updated';
import Genres from './containers/Genres';
import Results from './containers/Results';
import Watch from './containers/Watch';
import NotFoundPage from './components/NotFound';

const RouteWrapper = ({ location }) => {
  const currentKey = location.pathname.split('/')[1] || '/';
  const timeout = { enter: 500, exit: 100 };

  return (
    <div>
      <Navbar />
      <Container>
        <TransitionGroup>
          <CSSTransition
            key={currentKey}
            timeout={timeout}
            classNames="fade"
            appear
          >
            <Switch location={location}>
              <Route exact path="/" component={Home} />
              <Route path="/newest" component={Newest} />
              <Route path="/updated" component={Updated} />
              <Route path="/watch/*" component={Watch} />
              <Route path="/genre/*" component={Genres} />
              <Route path="/search*" component={Results} />
              <Route component={NotFoundPage} />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </Container>
    </div>
  );
};

const AppWithRouter = withRouter(RouteWrapper);
const App = () => (
  <BrowserRouter>
    <AppWithRouter />
  </BrowserRouter>
);

export default App;
