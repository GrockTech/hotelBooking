import { Link } from 'react-router-dom'
import  './searchitem.css'

const SearchItem = ({item}) => {
  return (
    <div className='searchItem'>
      <img
      src={item.photos[0]}
      alt=''
      className='siImg'
      />
      <div className="siDesc">
        <h1 className='siTitle'>{item.name}</h1>
        <span className='siDistance'>{item.distance}</span>
        <span className='siTaxiOp'>Free Okada to our premises</span>
        <span className='siSubtitle'>Full Aircondition</span>
        <span className='siFeatures'>
           {item.desc }
        </span>
        <span className='siCancelOp'>Free cancellation</span>
        <span className='siCancelOpSubtitle'>
            You can cancel later, so lock in this great price today
        </span>
      </div>
      <div className="siDetails">
        
       {item.rating && <div className="siRating">
            <span>Excellent</span>
            <button>{item.rating}</button>
        </div>}

           <div className="siDetialsText">
            <span className='siPrice'>¢{item.cheapestPrice}</span>
            <span className='siTaxOp'>Include taxes and fees</span>
            <Link to={`/hotels/${item._id}`}>
            <button className='seeAvailability'>see availability</button>
            </Link>
            
           </div>

      </div>
    </div>
  )
}

export default SearchItem
