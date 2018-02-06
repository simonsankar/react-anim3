import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { jumbotron, header } from '../styles/jumbotron.css';

const Jumbrotron = () => {
  return (
    <Grid style={jumbotron} className="jumbotron ">
      <Grid.Row centered textAlign="center">
        <Grid.Column
          computer={12}
          tablet={10}
          mobile={16}
          verticalAlign="middle"
          className="jumbotronHeader slide-up-fade-in"
        >
          <Header>Anim3</Header>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Jumbrotron;
