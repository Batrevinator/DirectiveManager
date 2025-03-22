import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button, ButtonGroup, Card, Col } from 'reactstrap';
import { IoIosArrowUp } from "react-icons/io";

const ButtonMobilityCard = (props) => {
  return (
      <Card>
        <div className="header">{props.title}</div>
        <div className="content">
          <Col>
            <ButtonGroup vertical="true">
              <Button> <IoIosArrowUp/> </Button>
              <Button> </Button>
            </ButtonGroup>
          </Col>
        </div>
      </Card>
  )
}
export default ButtonMobilityCard;