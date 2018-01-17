import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Menu, Segment, Container } from 'semantic-ui-react';
import { squared } from '../styles/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <Segment.Group size="mini" style={squared}>
        <Segment>
          <Container>
            <Menu
              size="mini"
              borderless
              stackable
              pointing
              secondary
              color="teal"
            >
              <Menu.Item
                as={Link}
                to="/"
                name="home"
                active={this.props.location.pathname === '/'}
              />
              <Menu.Item
                as={Link}
                to="/genres"
                active={this.props.location.pathname === '/genres'}
                name="genres"
              />
            </Menu>
          </Container>
        </Segment>
        <Segment className="navbar" inverted color="teal" style={squared} />
      </Segment.Group>
    );
  }
}

const NavbarWithLocation = withRouter(Navbar);
export default NavbarWithLocation;
