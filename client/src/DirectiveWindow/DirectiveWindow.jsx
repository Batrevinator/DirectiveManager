import ButtonMobilityCard from '../ProjectCards/MovableCard';
import {React, Component} from 'react';
import HorizontalScrollContainer from './HorizontalScrollContainer';
import { BaseUrl } from '../utils/constants';
import { Button, Col, Label, Row } from 'reactstrap';
import DirectiveBuilderModal from './DirectiveBuilderModal';

class DirectiveWindow extends Component{
    constructor(props) {
        super(props);
        this.priorityOrder = ['urgent', 'high', 'medium', 'low'];
        this.state = {
          builderOpen: false,
          cards: {
            "urgent": [
              { "title": "Foo", "id": 0 },
              { "title": "Quux", "id": 4 }
            ],
            "high": [
              { "title": "Bar", "id": 1 },
              { "title": "Corge", "id": 5 }
            ],
            "medium": [
              { "title": "Baz", "id": 2 },
              { "title": "Grault", "id": 6 }
            ],
            "low": [
              { "title": "Qux", "id": 3 },
              { "title": "Garply", "id": 7 }
            ]
          },
        };
    }

    toggleBuilder = () => {
      this.setState({builderOpen: !this.state.builderOpen})
    }

    async getCards(cardId = null) {
      let criteria = (cardId != null) ? '?cardId=' + cardId : '';
      console.log(criteria)
      const response = await fetch(BaseUrl + 'card_access' + criteria, {
        method: 'GET'
      })
      if (response.ok) {
        const data = await response.json()["cards"];
        // this.setState({cards: data})
      } else {
        console.error("Failed to fetch cards.");
      }
    }

    async addCard(priority, name, description) {
      console.log(priority, name, description)
      const response = await fetch(BaseUrl + 'card_access', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'priority': priority, 'name': name, 'description': description}),
      })
      if (response.ok) {
        console.log("Card added successfully.");
      } else {
        console.error("Failed to add card.");
      }
    }

    async updateCardPriorityDB(cardId, newPriority) {
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
    
    updatePriority(movement, cardId, previousPriorityIndex) {
      let cardsTemp = this.state.cards;
      const taskIndex = cardsTemp[this.priorityOrder[previousPriorityIndex]].findIndex(cardsTemp => cardsTemp.id === cardId);
  
      if (taskIndex === -1) {
          console.error("Task not found in the specified priority group.");
          return;
        }
  
      if(movement === 'up'){
          if(previousPriorityIndex > 0){
              const [card] = cardsTemp[this.priorityOrder[previousPriorityIndex]].splice(taskIndex, 1);
              cardsTemp[this.priorityOrder[previousPriorityIndex-1]].push(card);
          }
      }else if(movement == 'down'){
          if(previousPriorityIndex < 3){
              const [card] = cardsTemp[this.priorityOrder[previousPriorityIndex]].splice(taskIndex, 1);
              cardsTemp[this.priorityOrder[previousPriorityIndex+1]].push(card);
          }
      }
      this.setState({cards: cardsTemp})
    }

    render(){
    return (
        <div>
          <DirectiveBuilderModal addCard = {this.addCard} isOpen={this.state.builderOpen} toggle={this.toggleBuilder}/>
          <Row>
            <Col xs={{size: 3}} className="text-center my-3">
              <Label style={{fontSize: 30, fontWeight: "bold"}}>Directive Manager</Label>
            </Col>
            <Col xs={{size: 3, offset: 6}} className="text-center my-3">
              <Button size='lg' color='primary' onClick={this.toggleBuilder}>
                Add New Directive
              </Button>
            </Col>
          </Row>
          <Row>
                <HorizontalScrollContainer title="Urgent" children={this.state.cards["urgent"].map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 0)} color={'#eb4034'} title = {card.title} key={card.id} /></div>)}/>
                <HorizontalScrollContainer title="High Priority" children={this.state.cards["high"].map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 1)} color={'#ebe534'} title={card.title} key={card.id} /></div>)}/>
                <HorizontalScrollContainer title="Medium Prioritiy" children={this.state.cards["medium"].map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 2)} color={'#03fc77'} title={card.title} key={card.id} /></div>)}/>
                <HorizontalScrollContainer title="Low Prioritiy" children={this.state.cards["low"].map((card) => <div className='col-md-4'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 3)} color={'#348feb'} title={card.title} key={card.id} /></div>)}/>
          </Row>
        </div>
        )
    }
}

export default DirectiveWindow;