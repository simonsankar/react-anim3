import React, { Component } from 'react';
import {
  Grid,
  Segment,
  Dimmer,
  Loader,
  Header,
  Image
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getCurrentAnimeDetails,
  resetCurrentAnimeDetails
} from '../actions/getAnimeDetails';
import { getEpisodes, resestEpisodes } from '../actions/getEpisodes';
import { resetVideo } from '../actions/getVideo';

import EpisodesMenu from './EpisodesMenu';
import { vidHeight } from '../styles/column.css';

class Watch extends Component {
  componentDidMount() {
    const url = this.props.location.pathname;
    this.props.getCurrentAnimeDetails(url);
    this.props.getEpisodes(url);
  }
  componentWillUnmount() {
    this.props.resetCurrentAnimeDetails();
    this.props.resestEpisodes();
    this.props.resetVideo();
  }
  componentDidUpdate(prevProps) {
    const url = this.props.location.pathname;
    if (prevProps.location.pathname !== url) {
      // Flush old
      this.props.resestEpisodes();
      this.props.resetCurrentAnimeDetails();
      this.props.resetVideo();
      // Fetch new
      this.props.getEpisodes(url);
      this.props.getCurrentAnimeDetails(url);
    }
  }

  render() {
    const anime = this.props.currentAnimeDetails;
    const { currentVideo } = this.props;
    return (
      <Grid container>
        <Grid.Row columns={2}>
          <Grid.Column computer={11} tablet={11} mobile={16}>
            <Segment.Group>
              <Segment color="teal">
                {anime ? <h4>{anime.title}</h4> : <h4>...</h4>}
              </Segment>
              <Segment clearing style={vidHeight}>
                {!currentVideo ? (
                  <Dimmer inverted active={true}>
                    {anime ? (
                      <Image
                        src={anime.cover}
                        centered
                        size="large"
                        rounded
                        bordered
                      />
                    ) : null}
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
            </Segment.Group>
            <Segment clearing style={vidHeight} className="fade-in">
              {!anime ? (
                <Dimmer inverted active={true}>
                  <Loader inverted />
                </Dimmer>
              ) : (
                <Grid>
                  <Grid.Row columns={2} divided verticalAlign="middle">
                    <Grid.Column computer={11} tablet={10} mobile={16}>
                      <Header as="h5">
                        <Header.Content>
                          {anime.title}
                          <Header.Subheader>{anime.alias}</Header.Subheader>
                        </Header.Content>
                      </Header>

                      <p style={{ fontSize: '.85rem' }}>{anime.desc}</p>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={6} mobile={16}>
                      <Image bordered centered fluid rounded src={anime.img} />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              )}
            </Segment>
          </Grid.Column>
          <Grid.Column computer={5} tablet={5} mobile={16}>
            <EpisodesMenu />
          </Grid.Column>
        </Grid.Row>
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
    {
      getEpisodes,
      resestEpisodes,
      getCurrentAnimeDetails,
      resetCurrentAnimeDetails,
      resetVideo
    },
    dispatch
  );

const WatchWithLocation = withRouter(Watch);
export default connect(mapStateToProps, mapDispatchToProps)(WatchWithLocation);
