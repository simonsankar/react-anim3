import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getTopAnimes } from '../actions/getTopAnimes';
import { Segment, Item } from 'semantic-ui-react';

class TopAnime extends Component {
  componentDidMount() {
    this.props.getTopAnimes('day');
  }
  render() {
    const { topAnime } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <h4>Top Animes</h4>
        </Segment>
        <Segment />
      </Segment.Group>
    );
  }
}

const mapStateToProps = ({ topAnimes }) => ({ topAnimes });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getTopAnimes }, dispatch);

export default TopAnime;
