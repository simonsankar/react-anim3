import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  GridRow,
  Button,
  Icon,
  Label,
  Divider,
  Loader,
  Dimmer
} from 'semantic-ui-react';
import LabelGroup from 'semantic-ui-react/dist/commonjs/elements/Label/LabelGroup';
import { content, status, meta, genreLinks } from '../styles/popup.css';
import { pullRight } from '../styles/util.css';
import { connect } from 'react-redux';

class PopupContent extends Component {
  render() {
    const { animeDetails } = this.props;
    return (
      <div>
        {!animeDetails ? (
          <Dimmer inverted active>
            <Loader inverted />
          </Dimmer>
        ) : (
          <div>
            <GridRow>
              <div style={content}>
                <h3>{animeDetails.title}</h3>
              </div>
            </GridRow>
            <Divider hidden fitted />
            <GridRow style={status}>
              <div style={content}>
                {animeDetails.status.ep && (
                  <Label size="mini">{animeDetails.status.ep}</Label>
                )}

                <LabelGroup size="mini" style={pullRight}>
                  {animeDetails.status.dub && (
                    <Label color="yellow">{animeDetails.status.dub}</Label>
                  )}
                  {animeDetails.status.ova && (
                    <Label color="red">{animeDetails.status.ova}</Label>
                  )}
                  {animeDetails.status.ona && (
                    <Label color="orange">{animeDetails.status.ona}</Label>
                  )}
                  {animeDetails.status.movie && (
                    <Label color="green">{animeDetails.status.movie}</Label>
                  )}
                  {animeDetails.status.special && (
                    <Label color="purple">{animeDetails.status.special}</Label>
                  )}
                  {animeDetails.status.preview && (
                    <Label color="blue">{animeDetails.status.preview}</Label>
                  )}
                </LabelGroup>
              </div>
            </GridRow>
            <Divider hidden fitted />
            <GridRow>
              <div style={content}>
                <span style={meta}>{animeDetails.desc}</span>
              </div>
            </GridRow>
            <Divider hidden />
            <GridRow>
              <div style={content}>
                {animeDetails.meta &&
                  animeDetails.meta.map((el, index) => {
                    if (index < 4)
                      return (
                        <div key={animeDetails.title + index} style={meta}>
                          <p>
                            {el.label} {el.value}
                          </p>
                        </div>
                      );
                    else
                      return (
                        <div key={animeDetails.title + index} style={meta}>
                          <p>
                            Genres:{' '}
                            {el.genres.map(genre => {
                              return (
                                <span key={genre.name}>
                                  <Link to={genre.url} style={genreLinks}>
                                    {genre.name},
                                  </Link>
                                </span>
                              );
                            })}
                          </p>
                        </div>
                      );
                  })}
              </div>
            </GridRow>
            <Divider hidden />
            <GridRow>
              <Button
                fluid
                animated="fade"
                color="teal"
                compact
                as={Link}
                to={`/watch/${animeDetails.title}`}
              >
                <Button.Content>
                  <Icon name="video play" />
                </Button.Content>
              </Button>
            </GridRow>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ animeDetails }) => ({ animeDetails });

export default connect(mapStateToProps, null)(PopupContent);
