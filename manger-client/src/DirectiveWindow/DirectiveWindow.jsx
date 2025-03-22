import ButtonMobilityCard from '../ProjectCards/draggableCard';
import { 
    useState,
 } from 'react';
import HorizontalScrollContainer from './HorizontalScrollContainer';
import Draggable from 'react-draggable';

function updatePriority(newPriority, cardId) {

}

const DirectiveWindow = () => {

    const [cardsPriorityUrgent, setCardsPriorityUrgent] = useState([{title: "Foo", id: 0}, {title: "Bar", id: 1}, {title: "Foobar", id: 3}, {title: "Bar", id: 4}, {title: "Foobar", id: 5}]);
    const [cardsPriorityHigh, setCardsPriorityHigh] = useState([{title: "Foo", id: 6}, {title: "Bar", id: 7}, {title: "Foobar", id: 8}]);
    const [cardsPriorityMiddle, setCardsPriorityMiddle] = useState([{title: "Foo", id: 9}, {title: "Bar", id: 10}, {title: "Foobar", id: 11}]);
    const [cardsPriorityLow, setCardsPriorityLow] = useState([{title: "Foo", id: 12}, {title: "Bar", id: 13}, {title: "Foobar", id: 14}]);

    return (
        <div className="list">
            <HorizontalScrollContainer children={cardsPriorityUrgent.map((card) => <div className='col-md-3'><ButtonMobilityCard move= {(newPriority) => updatePriority(newPriority, card.id)} title = {card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer children={cardsPriorityHigh.map((card) => <div className='col-md-3'><ButtonMobilityCard move= {updatePriority} title={card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer children={cardsPriorityMiddle.map((card) => <div className='col-md-3'><ButtonMobilityCard move= {updatePriority} title={card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer children={cardsPriorityLow.map((card) => <div className='col-md-3'><ButtonMobilityCard move= {updatePriority} title={card.title} key={card.id} /></div>)}/>
        </div>
    )
}

export default DirectiveWindow;