import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAnimeDetails, resetAnimeDetails } from '../actions/getAnimeDetails';
//Components
import { Label, Card, Image, Grid, Popup } from 'semantic-ui-react';
import PopupContent from '../containers/PopupContent';
import { card, episodeTag } from '../styles/popup.css';

class PopupCard extends Component {
  timer = null;
  render() {
    const { anime } = this.props;
    const { getAnimeDetails } = this.props;
    const { resetAnimeDetails } = this.props;
    return (
      <Grid.Column computer={4} tablet={8} mobile={16}>
        <Popup
          basic
          content={<PopupContent />}
          hoverable
          on="hover"
          onClose={() => {
            resetAnimeDetails();
          }}
          mouseEnterDelay={600}
          position="right center"
          size="small"
          style={card}
          trigger={
            <Card
              className="dim"
              as={Link}
              to={`/watch/${anime.title}`}
              raised
              onMouseEnter={() => {
                this.timer = setTimeout(
                  () => getAnimeDetails(anime.datatip),
                  500
                );
              }}
              onMouseLeave={() => clearTimeout(this.timer)}
            >
              <div>
                <Image fluid src={anime.img} />
                {anime.status.ep && (
                  <div style={episodeTag}>{anime.status.ep}</div>
                )}
              </div>
              <Card.Content>
                <Card.Header textAlign="center">
                  <h5>
                    <small>{anime.title}</small>
                  </h5>
                </Card.Header>
                <Card.Meta textAlign="center">
                  {anime.status.dub && (
                    <Label size="mini" color="yellow" basic>
                      {anime.status.dub}
                    </Label>
                  )}
                  {anime.status.ova && (
                    <Label size="mini" color="red" basic>
                      {anime.status.ova}
                    </Label>
                  )}
                  {anime.status.ona && (
                    <Label size="mini" color="orange" basic>
                      {anime.status.ona}
                    </Label>
                  )}
                  {anime.status.movie && (
                    <Label size="mini" color="green" basic>
                      {anime.status.movie}
                    </Label>
                  )}
                  {anime.status.special && (
                    <Label size="mini" color="purple" basic>
                      {anime.status.special}
                    </Label>
                  )}
                  {anime.status.preview && (
                    <Label size="mini" color="blue" basic>
                      {anime.status.preview}
                    </Label>
                  )}
                </Card.Meta>
              </Card.Content>
              <div className="overlay" />
            </Card>
          }
        />
      </Grid.Column>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getAnimeDetails, resetAnimeDetails }, dispatch);

export default connect(null, mapDispatchToProps)(PopupCard);
