import React, { Component } from 'react';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getNewestAnimes,
  getUpdatedAnimes,
  getTrendingAnimes,
  resetAnimes
} from '../actions/getAnimes';
//Components
import { Segment, Menu } from 'semantic-ui-react';

class AnimesMenu extends Component {
  state = { activeItem: 'updated' };

  componentDidUpdate() {
    const { activeItem } = this.state;
    this.props.resetAnimes();
    if (activeItem === 'newest') {
      this.props.getNewestAnimes();
    } else if (activeItem === 'updated') this.props.getUpdatedAnimes();
    else this.props.getTrendingAnimes();
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
          widths={3}
        >
          <Menu.Item
            name="updated"
            active={activeItem === 'updated'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="trending"
            active={activeItem === 'trending'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="newest"
            active={activeItem === 'newest'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getNewestAnimes, getUpdatedAnimes, getTrendingAnimes, resetAnimes },
    dispatch
  );
export default connect(null, mapDispatchToProps)(AnimesMenu);
