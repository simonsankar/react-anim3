import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';

class ViewAll extends Component {
  render() {
    const { url, title, searchTerm } = this.props;
    return (
      <Button as={Link} to={url + searchTerm} color="teal" fluid>
        {title}
      </Button>
    );
  }
}

const mapStateToProps = ({ searchTerm }) => ({
  searchTerm
});
export default connect(mapStateToProps, null)(ViewAll);
