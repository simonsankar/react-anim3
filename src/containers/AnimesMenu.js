import React, { Component } from 'react';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getQuickListsAnimes, selectQuickList } from '../actions/getAnimes';
//Components
import { Segment, Menu } from 'semantic-ui-react';

class AnimesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'all' };
  }
  componentDidMount() {
    this.props.getQuickListsAnimes();
    const { activeItem } = this.state;
    if (activeItem === 'all') {
      this.props.selectQuickList(0);
    } else if (activeItem === 'subbed') this.props.selectQuickList(1);
    else if (activeItem === 'trending') this.props.selectQuickList(2);
    else this.props.selectQuickList(3);
  }

  componentDidUpdate() {
    const { activeItem } = this.state;
    if (activeItem === 'all') {
      this.props.selectQuickList(0);
    } else if (activeItem === 'subbed') this.props.selectQuickList(1);
    else if (activeItem === 'trending') this.props.selectQuickList(2);
    else this.props.selectQuickList(3);
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    console.log(this.state.activeItem);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Segment clearing color="teal">
        <Menu
          color="teal"
          compact
          borderless
          fluid
          secondary
          pointing
          size="small"
          widths={4}
        >
          <Menu.Item
            name="all"
            active={activeItem === 'all'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="subbed"
            active={activeItem === 'subbed'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="dubbed"
            active={activeItem === 'dubbed'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="trending"
            active={activeItem === 'trending'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getQuickListsAnimes, selectQuickList }, dispatch);
export default connect(null, mapDispatchToProps)(AnimesMenu);
