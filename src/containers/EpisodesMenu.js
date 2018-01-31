import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEpisodes } from '../actions/getEpisodes';
import { setServer } from '../actions/setServer';
import { Segment, Menu, Dimmer, Loader } from 'semantic-ui-react';
import EpisodeList from '../components/EpisodeList';
import { medHeight } from '../styles/column.css';

class EpisodesMenu extends Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'RapidVideo' };
  }
  componentDidMount() {
    const url = this.props.location.pathname;
    this.props.getEpisodes(url);
  }
  componentDidUpdate() {
    const { activeItem } = this.state;
    const { setServer } = this.props;

    if (activeItem === 'RapidVideo') {
      setServer(0);
    } else if (activeItem === 'MyCloud') {
      setServer(1);
    } else {
      setServer(2);
    }
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    const { activeItem } = this.state;
    const { episodes } = this.props;
    const { server } = this.props;
    return (
      <div>
        <Segment attached="top">
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
              name="RapidVideo"
              active={activeItem === 'RapidVideo'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="MyCloud"
              active={activeItem === 'MyCloud'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="OpenLoad"
              active={activeItem === 'OpenLoad'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Segment>
        <Segment clearing attached="bottom" style={medHeight}>
          {!episodes ? (
            <Dimmer inverted active={true}>
              <Loader inverted />
            </Dimmer>
          ) : (
            <EpisodeList episodes={episodes[server]} />
          )}
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = ({ episodes, server }) => ({
  episodes,
  server
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getEpisodes, setServer }, dispatch);
const EpisodesMenuWithLocation = withRouter(EpisodesMenu);

export default connect(mapStateToProps, mapDispatchToProps)(
  EpisodesMenuWithLocation
);
