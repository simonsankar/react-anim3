import React from 'react';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import EpisodeButton from '../containers/EpisodeButton';
import EpisodeRangeButton from '../containers/EpisodeRangeButton';

class EpisodeList extends React.Component {
  render() {
    const { episodes, range } = this.props;
    console.log(episodes, range);
    return (
      <div>
        <Grid centered>
          {episodes.ranges.length > 1 ? (
            <div>
              <p>Ranges</p>
              <Grid.Row>
                {episodes.ranges.map((el, index) => {
                  return <EpisodeRangeButton key={el.rangeID} epRange={el} />;
                })}
              </Grid.Row>
            </div>
          ) : null}
        </Grid>
        <Grid>
          <Grid.Row centered>
            {episodes.episodeRanges[0].episodes.map((el, index) => {
              return (
                <EpisodeButton
                  episode={el}
                  serverid={episodes.server}
                  key={el.episodeID}
                />
              );
            })}
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
const mapStateToProps = ({ range }) => ({ range });

export default connect(mapStateToProps, null)(EpisodeList);
