import ButtonMobilityCard from '../ProjectCards/MovableCard';
import {React, Component, useState, useEffect} from 'react';
import HorizontalScrollContainer from './HorizontalScrollContainer';
import { BaseUrl } from '../utils/constants';
import { Button, Col, Label, Row } from 'reactstrap';
import DirectiveBuilderModal from './DirectiveBuilderModal';

function DirectiveWindow(){
        const priorityOrder = ['urgent', 'high', 'medium', 'low'];
        const [builderOpen, setBuilderOpen] = useState(false);
        const [cards, setCards] = useState({
            urgent: [
            ],
            high: [
            ],
            medium: [
            ],
            low: [
            ]
          });

    useEffect(() => {
        getCards();
    }, []);
    

    const toggleBuilder = () => {
        setBuilderOpen(!builderOpen);
    }

    async function getCards(cardId = null) {
      let criteria = (cardId != null) ? '?cardId=' + cardId : '';
      console.log(criteria)
      const response = await fetch(BaseUrl + 'card_access' + criteria, {
        method: 'GET'
      })
      if (response.ok) {
        const data = await response.json();
        console.log(data.cards)
        setCards(JSON.parse(data.cards))
      } else {
        console.error("Failed to fetch cards.");
      }
    }

    async function addCard(priority, name, description, link) {
      const response = await fetch(BaseUrl + 'card_access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'priority': priority, 'name': name, 'description': description, 'link': link}),
      })
      if (response.ok) {
        console.log("Card added successfully.");
      } else {
        console.error("Failed to add card.");
      }
    }

    async function updateCardPriorityDB(cardId, newPriority) {
      const response = await fetch (BaseUrl+'card_access', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'cardId': cardId, 'newPriority': newPriority}),
      })
      if (response.ok) {
        console.log("Card priority updated successfully.");
      } else {
        console.error("Failed to update card priority.");
        throw Error("Invlaid response from server. Try again.")
      }
    }
    
    const updatePriority = (movement, cardId, previousPriorityIndex) => {
      getCards();
      let cardsTemp = cards;
      const taskIndex = cardsTemp[priorityOrder[previousPriorityIndex]].findIndex(cardsTemp => cardsTemp.id === cardId);
  
      if (taskIndex === -1) {
          console.error("Task not found in the specified priority group.");
          return;
        }
  
      if(movement === 'up'){
          if(previousPriorityIndex > 0){
              const [card] = cardsTemp[priorityOrder[previousPriorityIndex]].splice(taskIndex, 1);
              cardsTemp[priorityOrder[previousPriorityIndex-1]].push(card);
              updateCardPriorityDB(cardId, priorityOrder[previousPriorityIndex-1]);
          }
      }else if(movement == 'down'){
          if(previousPriorityIndex < 3){
              const [card] = cardsTemp[priorityOrder[previousPriorityIndex]].splice(taskIndex, 1);
              cardsTemp[priorityOrder[previousPriorityIndex+1]].push(card);
              updateCardPriorityDB(cardId, priorityOrder[previousPriorityIndex+1]);
          }
      }
      setCards(cardsTemp);
    }

    return (
        <div>
          <DirectiveBuilderModal addCard = {addCard} isOpen={builderOpen} toggle={toggleBuilder}/>
          <Row>
            <Col xs={{size: 3}} className="text-center my-3">
              <Label style={{fontSize: 30, fontWeight: "bold"}}>Directive Manager</Label>
            </Col>
            <Col xs={{size: 3, offset: 6}} className="text-center my-3">
              <Button size='lg' color='primary' onClick={toggleBuilder}>
                Add New Directive
              </Button>
            </Col>
          </Row>
          <Row>
                <HorizontalScrollContainer title="Urgent" children={cards.urgent.map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => updatePriority(movement, card.id, 0)} color={'#eb4034'} board_link = {card.link} description = {card.description} title = {card.name} key={card.id} /></div>)}/>
                <HorizontalScrollContainer title="High Priority" children={cards.high.map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => updatePriority(movement, card.id, 1)} color={'#ebe534'} board_link = {card.link} description = {card.description} title = {card.name} key={card.id} /></div>)}/>
                <HorizontalScrollContainer title="Medium Prioritiy" children={cards.medium.map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => updatePriority(movement, card.id, 2)} color={'#03fc77'} board_link = {card.link} description = {card.description} title = {card.name} key={card.id} /></div>)}/>
                <HorizontalScrollContainer title="Low Prioritiy" children={cards.low.map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => updatePriority(movement, card.id, 3)} color={'#348feb'} board_link = {card.link} description = {card.description} title = {card.name} key={card.id} /></div>)}/>
          </Row>
        </div>
        )
  }

export default DirectiveWindow;