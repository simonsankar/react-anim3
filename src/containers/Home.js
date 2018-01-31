import React, { Component } from 'react';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFeaturedAnimes, resetAnimes } from '../actions/getAnimes';
import { getGenres } from '../actions/getGenres';
//Components
import {
  Grid,
  Segment,
  Loader,
  Dimmer,
  Divider,
  Search
} from 'semantic-ui-react';
import SeriesList from '../components/SeriesList';
import GenreList from '../components/GenreList';
import AnimesMenu from './AnimesMenu';
import Carousel from '../components/Carousel';
import { fullHeight, medHeight, carouselHeight } from '../styles/column.css';

class Home extends Component {
  componentWillMount() {
    this.props.getGenres();
    this.props.getFeaturedAnimes();
  }
  componentWillUnmount() {
    this.props.resetAnimes();
  }

  render() {
    const { animes, genres, featuredAnimes } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          {/* Main 1 */}
          <Grid.Column computer={12} tablet={10} mobile={16}>
            <Grid.Row>
              <Segment clearing style={carouselHeight}>
                {!featuredAnimes ? (
                  <Dimmer inverted active={true}>
                    <Loader inverted />
                  </Dimmer>
                ) : (
                  <Carousel items={this.props.featuredAnimes} />
                )}
              </Segment>
            </Grid.Row>
            <Divider horizontal />
            <Grid.Row>
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
            </Grid.Row>
          </Grid.Column>

          <Divider />
          {/* Main 2 */}
          <Grid.Column computer={4} tablet={6} mobile={16}>
            {/* SearchBar */}
            <Grid.Row>
              <Segment attached="top">
                <h4>Search</h4>
              </Segment>
              <Segment attached="bottom">
                <Search input={{ fluid: true }} size="tiny" />
              </Segment>
            </Grid.Row>
            <Divider horizontal />
            {/* Filter */}
            <Grid.Row>
              <Segment attached="top">
                <h4>Filter</h4>
              </Segment>
              <Segment attached="bottom">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat natus quia numquam similique pariatur voluptates
                perspiciatis placeat eveniet a error, mollitia temporibus
                delectus ea alias reiciendis ratione recusandae architecto
                deleniti?
              </Segment>
            </Grid.Row>
            <Divider horizontal />
            {/* Genres */}
            <Grid.Row>
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
            </Grid.Row>
            <Divider horizontal />
            {/* Top Anime */}
            <Grid.Row>
              <Segment attached="top">
                <h4>Top Animes</h4>
              </Segment>
              <Segment attached="bottom" />
            </Grid.Row>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
const mapStateToProps = ({ animes, featuredAnimes, genres }) => ({
  animes,
  featuredAnimes,
  genres
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getFeaturedAnimes, resetAnimes, getGenres }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
