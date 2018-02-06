import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { getVideo } from '../actions/getVideo';
import { episodeButton } from '../styles/links.css';

class EpisodeButton extends Component {
  handleEpisodeClick = (e, { active, episodeid, serverid }) => {
    console.log(episodeid, serverid);
    active = !active;
    this.props.getVideo(episodeid, serverid);
  };

  render() {
    const { episode, serverID, active } = this.props;
    return (
      <Button
        className="fade-in"
        active={active}
        episodeid={episode.episodeID}
        serverid={serverID}
        onClick={this.handleEpisodeClick}
        color="teal"
        size="mini"
        compact
        key={episode.episodeID}
        style={episodeButton}
      >
        {episode.episodeNum}
      </Button>
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getVideo }, dispatch);

export default connect(null, mapDispatchToProps)(EpisodeButton);
