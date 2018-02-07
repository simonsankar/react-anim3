import React from 'react';
import { Link } from 'react-router-dom';
import { List, Grid, Label, Header } from 'semantic-ui-react';

const TopItem = ({ item }) => {
  return (
    <List.Item className="fade-in">
      <Grid
        style={{
          backgroundImage: `
        linear-gradient(to top, rgba(000,000,000,1),rgba(000,000,000,0)),
        url(${item.img})`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          marginBottom: '3px',
          minHeight: '2rem'
        }}
      >
        <Grid.Row textAlign="left" verticalAlign="middle">
          <Grid.Column width={4}>
            <Label size="mini" color="teal">
              {item.rank}
            </Label>
          </Grid.Column>
          <Grid.Column width={10}>
            <Header as="h5">
              <Link style={{ color: '#fff' }} to={item.url}>
                {item.title}
              </Link>
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </List.Item>
  );
};

export default TopItem;
