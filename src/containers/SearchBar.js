import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getSearchSuggestions } from '../actions/getAnimes';
import { setSearchTerm } from '../actions/setSearchTerm';
import { Search, Grid, Image } from 'semantic-ui-react';
import ViewAll from './ViewAll';

const customRender = ({ title, url, img }) => {
  if (img) {
    return (
      <Grid key={url} textAlign="left" as={Link} to={url}>
        <Grid.Row columns={2} verticalAlign="middle">
          <Grid.Column width={5}>
            {img && <Image src={img} bordered inline size="medium" rounded />}
          </Grid.Column>
          <Grid.Column floated="right" width={11}>
            <Link color="teal" to={url}>
              {title}
            </Link>
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

  handleResultSelect = e => {
    this.resetComponent();
  };

  getResults(keyword) {
    this.props.getSearchSuggestions(keyword);
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: false });
    this.props.setSearchTerm(value);
    setTimeout(this.getResults(value), 200);
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
