import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './containers/Home';
import Genres from './containers/Genres';
import Watch from './containers/Watch';
import Navbar from './components/Navbar';
import { Container } from 'semantic-ui-react';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Container>
            <div>
              <Route exact path="/" component={Home} />
              <Route path="/genres" component={Genres} />
              <Route path="/watch/*" component={Watch} />
            </div>
          </Container>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
