import ButtonMobilityCard from '../ProjectCards/draggableCard';
import { 
    useState,
 } from 'react';
import HorizontalScrollContainer from './HorizontalScrollContainer';

function updatePriority(newPriority, ) {

}

const DirectiveWindow = () => {

    const [cardsPriorityUrgent, setCardsPriorityUrgent] = useState([{title: "Foo", id: 0}, {title: "Bar", id: 1}, {title: "Foobar", id: 3}, {title: "Bar", id: 1}, {title: "Foobar", id: 3}]);
    const [cardsPriorityHigh, setCardsPriorityHigh] = useState([{title: "Foo", id: 0}, {title: "Bar", id: 1}, {title: "Foobar", id: 3}]);
    const [cardsPriorityMiddle, setCardsPriorityMiddle] = useState([{title: "Foo", id: 0}, {title: "Bar", id: 1}, {title: "Foobar", id: 3}]);
    const [cardsPriorityLow, setCardsPriorityLow] = useState([{title: "Foo", id: 0}, {title: "Bar", id: 1}, {title: "Foobar", id: 3}]);

    return (
        <div className="list">
            <HorizontalScrollContainer children={cardsPriorityUrgent.map((card) => <div className='col-md-3'><ButtonMobilityCard title = {card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer children={cardsPriorityHigh.map((card) => <div className='col-md-3'><ButtonMobilityCard title={card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer children={cardsPriorityMiddle.map((card) => <div className='col-md-3'><ButtonMobilityCard title={card.title} key={card.id} /></div>)}/>
            <HorizontalScrollContainer children={cardsPriorityLow.map((card) => <div className='col-md-3'><ButtonMobilityCard title={card.title} key={card.id} /></div>)}/>
        </div>
    )
}

export default DirectiveWindow;