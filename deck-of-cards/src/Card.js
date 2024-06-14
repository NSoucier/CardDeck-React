import './Card.css'

function Card({ value, suit, img }) {
    return (
        <div className='card'>
            <img src={img} alt={`${value} of ${suit}`}/>
        </div>
    )
}

export default Card;