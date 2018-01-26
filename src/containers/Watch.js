import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEpisodes } from '../actions/getEpisodes';
import {
  getCurrentAnimeDetails,
  resetCurrentAnimeDetails
} from '../actions/getAnimeDetails';

class Watch extends Component {
  componentDidMount() {
    const url = this.props.location.pathname;
    this.props.getEpisodes(url);
    this.props.getCurrentAnimeDetails(url);
  }
  componentWillUnmount() {
    this.props.resetCurrentAnimeDetails();
  }

  render() {
    const anime = this.props.currentAnimeDetails;
    return (
      <Grid>
        <Grid.Column computer={11} tablet={11} mobile={16}>
          <Segment attached="top">{anime && <h4>{anime.title}</h4>}</Segment>
          <Segment clearing attached="bottom">
            <iframe
              src=""
              frameBorder="0"
              allowFullScreen="true"
              style={{ height: '60vh', width: '100%' }}
            />
          </Segment>
          <Segment>
            {anime ? (
              <p style={{ fontSize: '.85rem' }}>{anime.desc}</p>
            ) : (
              <p>loading...</p>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column computer={5} tablet={5} mobile={16}>
          <Segment clearing>
            <h4>Episiode Menu</h4>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = ({ episodes, currentAnimeDetails }) => ({
  episodes,
  currentAnimeDetails
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getEpisodes, getCurrentAnimeDetails, resetCurrentAnimeDetails },
    dispatch
  );

const WatchWithLocation = withRouter(Watch);
export default connect(mapStateToProps, mapDispatchToProps)(WatchWithLocation);
