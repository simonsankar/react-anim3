import React, { Component } from 'react';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFeaturedAnimes, resetAnimes } from '../actions/getAnimes';
import { getGenres } from '../actions/getGenres';
//Components
import { Grid, Segment, Loader, Dimmer, Divider } from 'semantic-ui-react';
import SeriesList from '../components/SeriesList';
import GenreList from '../components/GenreList';
import AnimesMenu from './AnimesMenu';
import Carousel from '../components/Carousel';
import Jumbotron from '../components/Jumbotron';
import TopAnime from './TopAnime';
import { fullHeight, medHeight, carouselHeight } from '../styles/column.css';

class Home extends Component {
  componentWillMount() {
    this.props.getFeaturedAnimes();
    this.props.getGenres();
  }
  componentWillUnmount() {
    this.props.resetAnimes();
  }

  render() {
    const { quickLists, selectedList, genres, featuredAnimes } = this.props;
    return (
      <div>
        <Jumbotron />
        <Grid container>
          <Grid.Row columns={2}>
            {/* Main 1 */}
            <Grid.Column computer={12} tablet={10} mobile={16}>
              <Grid.Row>
                <Segment clearing style={carouselHeight}>
                  {featuredAnimes === null ? (
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
                <Segment.Group>
                  <AnimesMenu />
                  <Segment clearing style={fullHeight}>
                    {quickLists === null || selectedList === null ? (
                      <Dimmer inverted active={true}>
                        <Loader inverted />
                      </Dimmer>
                    ) : (
                      <div>
                        <SeriesList animes={quickLists[selectedList].pages} />
                        <Divider horizontal />
                      </div>
                    )}
                  </Segment>
                </Segment.Group>
              </Grid.Row>
            </Grid.Column>

            <Divider />
            {/* Main 2 */}
            <Grid.Column computer={4} tablet={6} mobile={16}>
              {/* Genres */}
              <Grid.Row>
                <Segment.Group>
                  <Segment color="teal" inverted>
                    <h5>Genres</h5>
                  </Segment>
                  <Segment style={medHeight}>
                    {!genres ? (
                      <Dimmer inverted active={true}>
                        <Loader inverted />
                      </Dimmer>
                    ) : (
                      <GenreList genres={genres} />
                    )}
                  </Segment>
                </Segment.Group>
              </Grid.Row>
              <Divider horizontal />
              {/* Top Anime */}
              <Grid.Row>
                <TopAnime />
              </Grid.Row>
              <Divider horizontal />
              {/* Filter */}
              <Grid.Row>
                <Segment.Group>
                  <Segment color="teal" inverted>
                    Filter
                  </Segment>
                  <Segment>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Repellat natus quia numquam similique pariatur voluptates
                    perspiciatis placeat eveniet a error, mollitia temporibus
                    delectus ea alias reiciendis ratione recusandae architecto
                    deleniti?
                  </Segment>
                </Segment.Group>
              </Grid.Row>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({
  quickLists,
  selectedList,
  featuredAnimes,
  genres
}) => ({
  quickLists,
  selectedList,
  featuredAnimes,
  genres
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getFeaturedAnimes, resetAnimes, getGenres }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
