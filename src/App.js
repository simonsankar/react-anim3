import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Navbar from './components/Navbar';
import Home from './containers/Home';
import Newest from './containers/Newest';
import Updated from './containers/Updated';
import Genres from './containers/Genres';
import Results from './containers/Results';
import Watch from './containers/Watch';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Container>
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/newest" component={Newest} />
              <Route path="/updated" component={Updated} />
              <Route path="/watch/*" component={Watch} />
              <Route path="/genre/*" component={Genres} />
              <Route path="/search*" component={Results} />
            </div>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
