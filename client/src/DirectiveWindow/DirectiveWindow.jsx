import ButtonMobilityCard from '../ProjectCards/MovableCard';
import {React, Component} from 'react';
import HorizontalScrollContainer from './HorizontalScrollContainer';
import Draggable from 'react-draggable';

class DirectiveWindow extends Component{
    constructor(props) {
        super(props);
        this.priorityOrder = ['urgent', 'high', 'medium', 'low'];
        this.state = {
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
        <div className="list">
            <HorizontalScrollContainer title="Urgent" children={this.state.cards["urgent"].map((card) => <div className='col-md-3'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 0)} color={'#eb4034'} title = {card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer title="High Priority" children={this.state.cards["high"].map((card) => <div className='col-md-3'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 1)} color={'#ebe534'} title={card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer title="Medium Prioritiy" children={this.state.cards["medium"].map((card) => <div className='col-md-3'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 2)} color={'#03fc77'} title={card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer title="Low Prioritiy" children={this.state.cards["low"].map((card) => <div className='col-md-3'><ButtonMobilityCard move= {(movement) => this.updatePriority(movement, card.id, 3)} color={'#348feb'} title={card.title} key={card.id} /></div>)}/>
        </div>
        )
    }
}

export default DirectiveWindow;