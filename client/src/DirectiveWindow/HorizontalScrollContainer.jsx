import React from 'react';
import { Card, CardHeader, CardBody, ButtonGroup, Button, Col, Row, CardTitle } from 'reactstrap';

const HorizontalScrollContainer = ({ children, title }) => {
  return (
    <Card className= "hide-scrollbar" style={{ 
      display: 'flex', // Ensure a horizontal layout
      overflowX: 'auto', // Enable horizontal scrolling if content overflows
      overflowY: 'hidden',
      maxHeight: '300px', // Prevent vertical growth
      border: '1px solid #ccc',
      padding: '10px',
    }}>
      <CardHeader style={{backgroundColor: "white"}}>
        <CardTitle style={{fontWeight: 'bold', fontSize: 20}}>
          {title}
        </CardTitle>
      </CardHeader>
      <CardBody style={{ 
      display: 'flex', // Ensure a horizontal layout
      overflowX: 'auto', // Enable horizontal scrolling if content overflows
      overflowY: 'hidden',
      maxHeight: '300px', // Prevent vertical growth

    }}>
        {children}
      </CardBody>
    </Card>
  );
};

export default HorizontalScrollContainer