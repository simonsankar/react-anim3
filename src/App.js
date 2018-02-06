import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import Newest from './containers/Newest';
import Updated from './containers/Updated';
import Genres from './containers/Genres';
import Results from './containers/Results';
import Watch from './containers/Watch';
// import NotFoundPage from './components/NotFound';

const App = ({ location }) => {
  return (
    <div>
      <Navbar />
      <AnimatedSwitch
        atEnter={{ opacity: 0 }}
        atLeave={{ opacity: 0 }}
        atActive={{ opacity: 1 }}
      >
        <Route exact path="/" component={Home} />
        <Route path="/newest" component={Newest} />
        <Route path="/updated" component={Updated} />
        <Route path="/watch/*" component={Watch} />
        <Route path="/genre/*" component={Genres} />
        <Route path="/search*" component={Results} />
        {/* <Route component={NotFoundPage} /> */}
      </AnimatedSwitch>
    </div>
  );
};

export default withRouter(App);
