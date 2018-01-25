import React, { Component } from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Watch extends Component {
  render() {
    const { selectedAnime } = this.props;
    return (
      <Grid>
        <Grid.Column computer={10} tablet={10} mobile={16}>
          <Segment attached="top">
            {selectedAnime && <h4>{selectedAnime.title}</h4>}
          </Segment>
          <Segment clearing attached="bottom">
            <iframe
              src="https://www.rapidvideo.com/e/FNPH79TWBK?autostart=true"
              frameBorder="0"
              allowFullScreen="true"
              style={{ height: '60vh', width: '100%' }}
            />
          </Segment>
        </Grid.Column>
        <Grid.Column computer={6} tablet={6} mobile={16}>
          <Segment clearing>
            <h4>Episiode Menu</h4>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
const mapStateToProps = ({ selectedAnime }) => ({ selectedAnime });

export default connect(mapStateToProps, null)(Watch);
