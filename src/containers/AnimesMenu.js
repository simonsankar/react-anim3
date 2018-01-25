import React, { Component } from 'react';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getNewestAnimes,
  getUpdatedAnimes,
  resetAnimes
} from '../actions/getAnimes';
//Components
import { Segment, Menu } from 'semantic-ui-react';

class AnimesMenu extends Component {
  state = { activeItem: 'newest' };

  componentDidUpdate() {
    const { activeItem } = this.state;
    this.props.resetAnimes();
    if (activeItem === 'newest') {
      this.props.getNewestAnimes();
    } else this.props.getUpdatedAnimes();
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Segment attached="top" clearing>
        <Menu
          color="teal"
          compact
          borderless
          fluid
          secondary
          pointing
          size="small"
          widths={2}
        >
          <Menu.Item
            name="newest"
            active={activeItem === 'newest'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="updated"
            active={activeItem === 'updated'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getNewestAnimes, getUpdatedAnimes, resetAnimes },
    dispatch
  );
export default connect(null, mapDispatchToProps)(AnimesMenu);
