import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { jumbotron } from '../styles/jumbotron.css';

const Jumbrotron = () => {
  return (
    <Grid style={jumbotron} className="jumbotron ">
      <Grid.Row centered textAlign="center">
        <Grid.Column
          computer={10}
          tablet={10}
          mobile={15}
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
