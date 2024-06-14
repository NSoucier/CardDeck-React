

function Card({ value, suit, img }) {
    return (
        <div>
            <img src={img} alt={`${value} of ${suit}`}/>
        </div>
    )
}

export default Card;