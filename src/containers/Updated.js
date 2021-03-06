import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getUpdatedAnimes,
  resetAnimes,
  getTotalPages
} from '../actions/getAnimes';
import {
  Grid,
  Dimmer,
  Loader,
  Divider,
  Segment,
  Button,
  Icon,
  Label
} from 'semantic-ui-react';
import SeriesList from '../components/SeriesList';
import Filter from '../containers/Filter';
import { fullHeight } from '../styles/column.css';

class Updated extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }
  componentDidMount() {
    this.props.resetAnimes();
    this.props.getUpdatedAnimes();
    this.props.getTotalPages('UPDATED');
  }
  componentDidUpdate() {
    console.log('Page STate', this.state.page);
  }
  componentDidCatch() {
    console.log('Dead.');
  }
  handleNextClick = e => {
    const pg = this.state.page + 1;
    console.log('next', pg);
    if (pg <= this.props.totalPages) {
      this.setState({ page: pg });
      this.props.resetAnimes();
      this.props.getUpdatedAnimes(pg);
    }
  };
  handlePrevClick = e => {
    const pg = this.state.page - 1;
    if (pg >= 1) {
      this.setState({ page: pg });
      this.props.resetAnimes();
      this.props.getUpdatedAnimes(pg);
    }
  };

  handleDoubleNext = e => {
    const pg = this.state.page + 10;
    if (pg <= this.props.totalPages) {
      this.setState({ page: pg });
      this.props.resetAnimes();
      this.props.getUpdatedAnimes(pg);
    } else if (pg > this.props.totalPages) {
      this.setState({ page: this.props.totalPages });
      this.props.resetAnimes();
      this.props.getUpdatedAnimes(this.props.totalPages);
    }
  };
  handleDoublePrev = e => {
    const pg = this.state.page - 10;
    if (pg >= 1) {
      this.setState({ page: pg });
      this.props.resetAnimes();
      this.props.getUpdatedAnimes(pg);
    } else if (pg < 1) {
      this.setState({ page: 1 });
      this.props.resetAnimes();
      this.props.getUpdatedAnimes(1);
    }
  };
  render() {
    const { animes } = this.props;
    return (
      <Grid container>
        <Grid.Row columns={2}>
          <Grid.Column computer={12} tablet={10} mobile={16}>
            <Segment.Group>
              <Segment color="teal">
                <h4>Updated</h4>
              </Segment>
              <Segment>
                {this.props.totalPages > 0 ? (
                  <Grid padded textAlign="center" centered>
                    <Button
                      compact
                      color="teal"
                      disabled={this.state.page === 1}
                      icon
                      size="mini"
                      onClick={this.handleDoublePrev}
                    >
                      <Icon name="fast backward" />
                    </Button>
                    <Button
                      compact
                      color="teal"
                      disabled={this.state.page === 1}
                      icon
                      size="mini"
                      onClick={this.handlePrevClick}
                    >
                      <Icon name="chevron left" />
                    </Button>
                    <Label basic horizontal>
                      Page: {this.state.page} of {this.props.totalPages}
                    </Label>
                    <Button
                      compact
                      color="teal"
                      disabled={this.state.page === this.props.totalPages}
                      icon
                      size="mini"
                      onClick={this.handleNextClick}
                    >
                      <Icon name="chevron right" />
                    </Button>
                    <Button
                      compact
                      color="teal"
                      disabled={this.state.page === this.props.totalPages}
                      icon
                      size="mini"
                      onClick={this.handleDoubleNext}
                    >
                      <Icon name="fast forward" />
                    </Button>
                  </Grid>
                ) : (
                  <p>...</p>
                )}
              </Segment>
              <Segment clearing style={fullHeight}>
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
            </Segment.Group>
          </Grid.Column>

          <Grid.Column computer={4} tablet={6} mobile={16}>
            <Segment>
              <Filter />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getUpdatedAnimes, resetAnimes, getTotalPages },
    dispatch
  );
const mapStateToProps = ({ animes, totalPages }) => ({ animes, totalPages });

export default connect(mapStateToProps, mapDispatchToProps)(Updated);
