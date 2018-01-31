import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { episodeButton } from '../styles/links.css';
import { setRange } from '../actions/setRange';

//hook up state for range, action reducer...
//then ep buttons
class EpisodeRangeButton extends Component {
  handleRangeClick = (e, { active, rangeid }) => {
    console.log(rangeid);
    active = !active;
    this.props.setRange(rangeid);
  };

  render() {
    const { epRange, range } = this.props;
    console.log(range);
    return (
      <Button
        style={episodeButton}
        compact
        onClick={this.handleRangeClick}
        key={epRange.rangeID}
        rangeid={epRange.rangeID}
        size="mini"
      >
        {epRange.rangeText}
      </Button>
    );
  }
}

const mapStateToProps = ({ range }) => ({ range });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setRange }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EpisodeRangeButton);
