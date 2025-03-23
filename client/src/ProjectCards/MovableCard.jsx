import React from 'react';
import { Card, CardHeader, CardBody, ButtonGroup, Button, Col, Row } from 'reactstrap';
import { IoIosArrowUp,  IoIosArrowDown} from "react-icons/io";

function handleMoveUp(callback){
  callback('up')
}

function handleMoveDown(callback){
  callback('down')
}

const ButtonMobilityCard = ({color, title, move}) => {
  return (
    <div style={{ margin: '5px auto' }}>
      <Card
        style={{
          width: '400px', // Fixed width
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardHeader
          style={{
            backgroundColor: color,
            color: '#fff',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          <Row style={{alignItems: 'center'}}>
            <Col xs={{size: 5, offset: 3}}>
              {title}
            </Col>
            <Col style={{height:"100%"}} xs={{size: 1, offset: 2}}>
              <ButtonGroup vertical>
                <Button onClick={(key) => handleMoveUp(move)} size='sm' style={{height: "30px", width:"50px"}}>
                  <IoIosArrowUp/>
                </Button>
                <Button onClick={(key) => handleMoveDown(move)} size='sm' style={{height: "30px",width:"50px"}}>
                  <IoIosArrowDown/>
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </CardHeader>
        <CardBody
          style={{
            padding: '20px',
            fontSize: '1rem',
            color: '#333',
            textAlign: 'justify',
          }}
        >
          <p>This is the main content inside the card body.</p>
        </CardBody>
      </Card>
    </div>
  );
};

export default ButtonMobilityCard;
