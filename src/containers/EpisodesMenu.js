import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEpisodes } from '../actions/getEpisodes';
import { getVideo } from '../actions/getVideo';
import { setServer } from '../actions/setServer';
import { Segment, Menu, Dimmer, Loader, Button, Grid } from 'semantic-ui-react';
import { medHeight } from '../styles/column.css';
import { episodeButton } from '../styles/links.css';

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
      console.log(activeItem);
      setServer(0);
    } else if (activeItem === 'MyCloud') {
      console.log(activeItem);
      setServer(1);
    } else {
      console.log(activeItem);
      setServer(2);
    }
  }
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleEpisodeClick = (e, { active, ep, server }) => {
    console.log(ep);
    active = !active;
    this.props.getVideo(ep, server);
  };

  renderEpisodes(server) {
    const { episodes } = this.props;
    const { getVideo } = this.props;

    const list = episodes[server];
    const stream = list.server;

    if (list.ranges.length < 1) {
      return list.episodeRanges[0].episodes.map((el, index) => {
        if (index === 0) getVideo(el.episodeID, stream);
        return (
          <Button
            active={false}
            ep={el.episodeID}
            server={stream}
            onClick={this.handleEpisodeClick}
            color="teal"
            size="mini"
            compact
            key={el.episodeID}
            style={episodeButton}
          >
            {el.episodeNum}
          </Button>
        );
      });
    }
  }

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
            <Grid centered>{this.renderEpisodes(server)}</Grid>
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
  bindActionCreators({ getEpisodes, getVideo, setServer }, dispatch);
const EpisodesMenuWithLocation = withRouter(EpisodesMenu);

export default connect(mapStateToProps, mapDispatchToProps)(
  EpisodesMenuWithLocation
);
