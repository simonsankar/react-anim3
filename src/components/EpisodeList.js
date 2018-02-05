import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getVideo } from '../actions/getVideo';
import { Grid } from 'semantic-ui-react';
import EpisodeButton from '../containers/EpisodeButton';
import EpisodeRangeButton from '../containers/EpisodeRangeButton';

class EpisodeList extends React.Component {
  render() {
    const { episodes, range, getVideo } = this.props;
    console.log(episodes, range);
    return (
      <div className="fade-in">
        <Grid centered>
          {episodes.ranges.length !== 0 ? (
            <Grid.Row>
              {episodes.ranges.map((el, index) => {
                return <EpisodeRangeButton key={el.rangeID} epRange={el} />;
              })}
            </Grid.Row>
          ) : null}
        </Grid>
        <Grid>
          <Grid.Row centered>
            {episodes.episodeRanges[range].episodes.map((el, index) => {
              if (index === 0) getVideo(el.episodeID, episodes.server);
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
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getVideo }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EpisodeList);
