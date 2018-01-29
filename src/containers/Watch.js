import React, { Component } from 'react';
import { Grid, Segment, Dimmer, Loader } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getCurrentAnimeDetails,
  resetCurrentAnimeDetails
} from '../actions/getAnimeDetails';

import EpisodesMenu from './EpisodesMenu';
import { medHeight } from '../styles/column.css';

class Watch extends Component {
  componentDidMount() {
    const url = this.props.location.pathname;
    this.props.getCurrentAnimeDetails(url);
  }
  componentWillUnmount() {
    this.props.resetCurrentAnimeDetails();
  }

  render() {
    const anime = this.props.currentAnimeDetails;
    const { currentVideo } = this.props;
    return (
      <Grid>
        <Grid.Column computer={11} tablet={11} mobile={16}>
          <Segment attached="top">{anime && <h4>{anime.title}</h4>}</Segment>
          <Segment clearing attached="bottom" style={medHeight}>
            {!currentVideo ? (
              <Dimmer inverted active={true}>
                <Loader inverted />
              </Dimmer>
            ) : (
              <iframe
                title={anime ? anime.title : 'nothing'}
                src={currentVideo}
                frameBorder="0"
                allowFullScreen="true"
                style={{ height: '60vh', width: '100%' }}
              />
            )}
          </Segment>
          <Segment clearing>
            {!anime ? (
              <Dimmer inverted active={true}>
                <Loader inverted />
              </Dimmer>
            ) : (
              <p style={{ fontSize: '.85rem' }}>{anime.desc}</p>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={16}>
          <EpisodesMenu />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ currentAnimeDetails, currentVideo }) => ({
  currentAnimeDetails,
  currentVideo
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getCurrentAnimeDetails, resetCurrentAnimeDetails },
    dispatch
  );

const WatchWithLocation = withRouter(Watch);
export default connect(mapStateToProps, mapDispatchToProps)(WatchWithLocation);
