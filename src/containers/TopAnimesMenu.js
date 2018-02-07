import React, { Component } from 'react';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTopAnimes, setPeriod } from '../actions/getTopAnimes';
//Components
import { Segment, Menu } from 'semantic-ui-react';

class TopAnimesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'day' };
  }
  componentDidMount() {
    this.props.getTopAnimes();
    const { activeItem } = this.state;
    if (activeItem === 'day') {
      this.props.setPeriod(0);
    } else if (activeItem === 'week') this.props.setPeriod(1);
    else this.props.setPeriod(2);
  }

  componentDidUpdate() {
    const { activeItem } = this.state;
    if (activeItem === 'day') {
      this.props.setPeriod(0);
    } else if (activeItem === 'week') this.props.setPeriod(1);
    else this.props.setPeriod(2);
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    console.log(this.state.activeItem);
  };

  render() {
    const { activeItem } = this.state;
    return (
      <Segment clearing>
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
            name="day"
            active={activeItem === 'day'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="week"
            active={activeItem === 'week'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="monthly"
            active={activeItem === 'month'}
            onClick={this.handleItemClick}
          />
        </Menu>
      </Segment>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTopAnimes, setPeriod }, dispatch);
export default connect(null, mapDispatchToProps)(TopAnimesMenu);
