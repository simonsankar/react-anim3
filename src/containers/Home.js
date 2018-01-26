import React, { Component } from 'react';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNewestAnimes } from '../actions/getAnimes';
import { getGenres } from '../actions/getGenres';
//Components
import { Grid, Segment, Loader, Dimmer, Divider } from 'semantic-ui-react';
import SeriesList from '../components/SeriesList';
import GenreList from '../components/GenreList';
import AnimesMenu from './AnimesMenu';
import { fullHeight, medHeight } from '../styles/column.css';

class Home extends Component {
  componentWillMount() {
    this.props.getGenres();
  }

  render() {
    const { animes, genres } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column computer={11} tablet={10} mobile={16}>
            <AnimesMenu />
            <Segment attached="bottom" clearing style={fullHeight}>
              {!animes ? (
                <Dimmer inverted active={true}>
                  <Loader inverted />
                </Dimmer>
              ) : (
                <div>
                  <SeriesList animes={animes} />
                  <Divider horizontal />
                </div>
              )}
            </Segment>
          </Grid.Column>

          <Grid.Column computer={5} tablet={6} mobile={16}>
            <Grid.Row>
              <Grid.Column>
                <Segment attached="top">
                  <h4>Genres</h4>
                </Segment>
                <Segment attached="bottom" style={medHeight}>
                  {!genres ? (
                    <Dimmer inverted active={true}>
                      <Loader inverted />
                    </Dimmer>
                  ) : (
                    <GenreList genres={genres} />
                  )}
                </Segment>
              </Grid.Column>
            </Grid.Row>
            <Divider horizontal />
            <Grid.Row>
              <Grid.Column>
                <Segment attached="top">
                  <h4>Top Animes</h4>
                </Segment>
                <Segment attached="bottom" />
              </Grid.Column>
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
const mapStateToProps = ({ animes, genres }) => ({ animes, genres });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getNewestAnimes, getGenres }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
