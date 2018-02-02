import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import SearchBar from '../containers/SearchBar';
import { Menu, Segment, Container } from 'semantic-ui-react';
import { squared } from '../styles/navbar.css';

class Navbar extends Component {
  render() {
    return (
      <Segment.Group size="mini" style={squared} raised>
        <Segment style={squared} color="teal">
          <Container>
            <Menu size="mini" secondary fluid stackable borderless>
              <Menu.Item
                as={Link}
                to="/"
                name="home"
                active={this.props.location.pathname === '/'}
              />
              <Menu.Item
                as={Link}
                to="/newest"
                active={this.props.location.pathname === '/newest'}
                name="newest"
              />
              <Menu.Item
                as={Link}
                to="/updated"
                active={this.props.location.pathname === '/updated'}
                name="updated"
              />
              <Menu.Item position="right">
                <SearchBar />
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
      </Segment.Group>
    );
  }
}

const NavbarWithLocation = withRouter(Navbar);
export default NavbarWithLocation;
