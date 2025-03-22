import Draggable from 'react-draggable';

const ButtonMobilityCard = (props) => {
  return (
      <div className="card">
        <div className="header">{props.title}</div>
        <div className="content">
          <input className="Button"></input>
        </div>
      </div>
  )
}
export default ButtonMobilityCard;