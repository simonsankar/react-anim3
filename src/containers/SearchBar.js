import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSearchSuggestions } from '../actions/getSearchSuggestions';
import { setSearchTerm } from '../actions/setSearchTerm';
import _ from 'lodash';
import { Search, Grid, Image } from 'semantic-ui-react';
import ViewAll from './ViewAll';

const customRender = ({ title, url, img, status }) => {
  if (img) {
    return (
      <Grid
        key={url}
        textAlign="left"
        as={Link}
        to={url}
        className="slide-up-fade-in"
      >
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={5}>
            {img && <Image src={img} bordered inline size="medium" rounded />}
          </Grid.Column>
          <Grid.Column floated="right" width={11}>
            <p>{title}</p>
            <small>{status}</small>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else return <ViewAll url={url} title={title} />;
};

class SearchBar extends Component {
  componentWillMount() {
    this.props.setSearchTerm('');
    this.resetComponent();
  }

  resetComponent = () => {
    this.props.setSearchTerm('');
    this.setState({ isLoading: false });
  };

  getResults = _.debounce(value => {
    this.props.getSearchSuggestions(value);
  }, 450);

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: false });
    this.props.setSearchTerm(value);
    this.getResults(value);
  };

  handleResultSelect = (e, { url }) => {
    console.log('Selected:', url);
    this.resetComponent();
  };

  render() {
    const { isLoading } = this.state;
    const { searchTerm, suggestions } = this.props;
    return (
      <Search
        minCharacters={3}
        resultRenderer={customRender}
        loading={isLoading}
        onResultSelect={this.handleResultSelect}
        onSearchChange={this.handleSearchChange}
        results={suggestions}
        value={searchTerm}
        placeholder="Deathnote...maybe?"
        input={{
          size: 'medium'
        }}
        aligned="right"
        size="tiny"
        searchterm={searchTerm}
      />
    );
  }
}

const mapStateToProps = ({ searchTerm, suggestions }) => ({
  searchTerm,
  suggestions
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ setSearchTerm, getSearchSuggestions }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
