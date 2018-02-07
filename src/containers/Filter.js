import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getFilterOptions } from '../actions/getFilterOptions';
// import { Form, Dropdown, Button, Checkbox } from 'semantic-ui-react';

class Filter extends Component {
  componentWillMount() {
    this.props.getFilterOptions();
  }
  componentDidMount() {}
  componentDidUpdate(prevProps) {
    if (prevProps.filterOptions !== this.props.filterOptions) {
      console.log(this.props.filterOptions);
    }
  }

  render() {
    const { filterOptions } = this.props;
    return <div>:(</div>;
  }
}

const mapStateToProps = ({ filterOptions }) => ({ filterOptions });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ getFilterOptions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
