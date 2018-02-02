import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getSearchedAnimes,
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
import { fullHeight } from '../styles/column.css';
import SegmentGroup from 'semantic-ui-react/dist/commonjs/elements/Segment/SegmentGroup';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1
    };
  }
  componentDidMount() {
    const { pathname, search } = this.props.location;
    this.props.resetAnimes();
    this.props.getSearchedAnimes(pathname + search);
    this.props.getTotalPages('SEARCH', pathname + search);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      const { pathname, search } = this.props.location;
      this.props.resetAnimes();
      this.props.getSearchedAnimes(pathname + search);
      this.props.getTotalPages('SEARCH', pathname + search);
    }
  }

  handleNextClick = e => {
    const pg = this.state.page + 1;
    const { pathname, search } = this.props.location;

    if (pg <= this.props.totalPages) {
      this.setState({ page: this.props.totalPages });
      this.props.resetAnimes();
      this.props.getSearchedAnimes(pathname + search, pg);
    }
  };
  handlePrevClick = e => {
    const pg = this.state.page - 1;
    const { pathname, search } = this.props.location;

    if (pg >= 1) {
      this.setState({ page: pg });
      this.props.resetAnimes();
      this.props.getSearchedAnimes(pathname + search, pg);
    }
  };

  handleDoubleNext = e => {
    const pg = this.state.page + 100;
    const { pathname, search } = this.props.location;

    if (pg <= this.props.totalPages) {
      this.setState({ page: pg });
      this.props.resetAnimes();
      this.props.getSearchedAnimes(pathname + search, pg);
    } else if (pg > this.props.totalPages) {
      this.setState({ page: this.props.totalPages });
      this.props.resetAnimes();
      this.props.getSearchedAnimes(pathname + search, pg);
    }
  };
  handleDoublePrev = e => {
    const pg = this.state.page - 10;
    const { pathname, search } = this.props.location;

    if (pg >= 1) {
      this.setState({ page: pg });
      this.props.resetAnimes();
      this.props.getSearchedAnimes(pathname + search, pg);
    } else if (pg < 1) {
      this.setState({ page: 1 });
      this.props.resetAnimes();
      this.props.getSearchedAnimes(pathname + search, 1);
    }
  };
  render() {
    const { animes } = this.props;
    return (
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column computer={12} tablet={10} mobile={16}>
            <SegmentGroup>
              <Segment color="teal">
                <h4>Results</h4>
              </Segment>
              {this.props.totalPages > 0 ? (
                <Segment>
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
                </Segment>
              ) : null}
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
            </SegmentGroup>
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
  bindActionCreators(
    { getSearchedAnimes, resetAnimes, getTotalPages },
    dispatch
  );
const mapStateToProps = ({ animes, searchTerm, totalPages }) => ({
  animes,
  searchTerm,
  totalPages
});

const ResultsWithRouter = withRouter(Results);

export default connect(mapStateToProps, mapDispatchToProps)(ResultsWithRouter);
