import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getNewestAnimes } from '../actions/getAnimes';
import { Grid, Dimmer, Loader, Divider, Segment } from 'semantic-ui-react';
import SeriesList from '../components/SeriesList';
import { fullHeight } from '../styles/column.css';

class Newest extends Component {
  componentDidMount() {
    this.props.getNewestAnimes();
  }
  render() {
    const { animes } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column computer={12} tablet={10} mobile={16}>
            <Segment attached="top">Newest</Segment>
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

          <Grid.Column computer={4} tablet={6} mobile={16}>
            <Segment>Filter</Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getNewestAnimes }, dispatch);
const mapStateToProps = ({ animes }) => ({ animes });

export default connect(mapStateToProps, mapDispatchToProps)(Newest);
