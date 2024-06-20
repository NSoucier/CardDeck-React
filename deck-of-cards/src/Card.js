import './Card.css'

function Card({ value, suit, img, position }) {
    return (
        <div className='card' style={{transform: `translate(-${position*50+20}%, 10%) rotate(${position}turn)`}}>
            <img src={img} alt={`${value} of ${suit}`}/>
        </div>
    )
}

export default Card;