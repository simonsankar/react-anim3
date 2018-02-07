import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { getAnimeDetails, resetAnimeDetails } from '../actions/getAnimeDetails';
import { connect } from 'react-redux';
import _ from 'lodash';
import TopAnimesMenu from './TopAnimesMenu';
import PopupContent from './PopupContent';
import TopItem from './TopItem';
import {
  Grid,
  Segment,
  List,
  Image,
  Popup,
  Header,
  Label
} from 'semantic-ui-react';
import { card } from '../styles/popup.css';

class TopAnime extends Component {
  componentDidMount() {}
  getDetails = _.debounce(datatip => this.props.getAnimeDetails(datatip), 500);
  render() {
    const { topAnimes, period, resetAnimeDetails } = this.props;
    return (
      <Segment.Group>
        <Segment color="teal" inverted>
          <h4>Top Anime</h4>
        </Segment>
        <TopAnimesMenu />
        <Segment>
          <List divided>
            {topAnimes && period >= 0 ? (
              <TopItem item={topAnimes[period].top} />
            ) : null}
            {topAnimes && period >= 0 ? (
              topAnimes[period].rest.map((el, index) => {
                return (
                  <List.Item key={el.datatip} className="fade-in">
                    <Grid>
                      <Grid.Row
                        columns={3}
                        centered
                        verticalAlign="middle"
                        textAlign="left"
                      >
                        <Grid.Column width={3}>
                          <Label basic color="teal" size="mini">
                            {el.rank}
                          </Label>
                        </Grid.Column>
                        <Grid.Column width={4}>
                          <Popup
                            basic
                            content={<PopupContent />}
                            hoverable
                            mouseEnterDelay={400}
                            onClose={() => {
                              resetAnimeDetails();
                            }}
                            position="left center"
                            src={el.img}
                            style={card}
                            trigger={
                              <Image
                                className="dim"
                                src={el.img}
                                onMouseEnter={() => this.getDetails(el.datatip)}
                                bordered
                                rounded
                                fluid
                              />
                            }
                          />
                        </Grid.Column>
                        <Grid.Column as={Link} to={el.url} width={8}>
                          <Header as="h5" disabled>
                            {el.title}
                          </Header>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
                    <div className="overlay" />
                  </List.Item>
                );
              })
            ) : (
              <div>Loading</div>
            )}
          </List>
        </Segment>
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({ topAnimes, period }) => ({ topAnimes, period });
const mapDispathToProps = dispatch =>
  bindActionCreators({ getAnimeDetails, resetAnimeDetails }, dispatch);
export default connect(mapStateToProps, mapDispathToProps)(TopAnime);
