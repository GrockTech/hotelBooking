import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocation } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { useLocation, useNavigate } from 'react-router-dom'
import { SearchContext } from '../../context/SearchContext'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Reserve from '../../components/reserve/Reserve'

const HotelF = () => {
  
  const location = useLocation()

const id = location.pathname.split("/")[2]

  const [sliderNumber, setSliderNumber] = useState(0)
  const [open, setOpen] = useState(false) 
  const [openModal, setOpenModal] = useState(false) 
 
  const {data, loading, error, reFetch } = useFetch(`/hotels/${id}`)

 const Navigate = useNavigate()

  const handleMove = (direction) =>{
    let newSliderNumber;
    if(direction === "l"){
      newSliderNumber = sliderNumber === 0 ? 5 : sliderNumber - 1
    } else{
      newSliderNumber = sliderNumber === 5 ? 0 : sliderNumber + 1
    }
    setSliderNumber(newSliderNumber)
  }
  const {user} = useContext(AuthContext)

  const handleClick = () =>{
    if(user){
      setOpenModal(true)

    }else {
      Navigate('/login')
    }
  }

  const {dates, options} = useContext(SearchContext)

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2.getTime() - date1.getTime())
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
    return diffDays; 
  } /// this function calcuates the days and time differnces 

  const days = dayDifference(dates[0].endDate, dates[0].startDate)



const handleOpen = (i) =>{
  setSliderNumber(i)
  setOpen(true)

}
  

 
  return (
    <div>
     <Navbar/>
     <Header type="list"/>
        {loading ? "loading" : <div className="hotelContainer">
          {open && <div className="slider">
              <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={()=>setOpen(false)}/>
              <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={()=>handleMove('l')} />
              <div className="sliderWrapper">
              <img 
              src={data.photos[sliderNumber]} 
              alt="" className='sliderImg'/>
              </div>
              <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove('r')}  />
          </div>}
          <div className="hotelWrapper">
            <button  className='bookNow' >
              Reserve or Book Now
            </button>
            <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocation}/>
            <span>{data.address}</span>
          </div>
          <span className='hotelDistance'>
            Excellent location - {data.distance} from center
          </span>
          <span className='hotelPriceHighLight'>
            Book a stay over GH¢ {data.cheapestPrice} in this Hotel with free Wifi      
              </span>
          <div className="ImgWrapper">
            {data?.photos?.map((photo, i)=>(
            <div className="hotelImgWrapper">
              <img 
              onClick={()=>handleOpen(i)}
                src={photo}
                alt="" className='hotelImg'/>
            </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsText">
              <h1 className='hotelTitle'>{data.title}</h1>
              <p className='hotelDesc'>
               {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1 className='priceTitle'>Perfect stay for {days} nights!</h1>
              
              <span>We are located near Kintampo Water Falls. This property has excelletn location score of 9.5!</span>

              <h2 >
                <b>¢{days *  data.cheapestPrice * options.room}</b> ({days } nights)
              </h2>
                <button onClick={handleClick} >Reserve or Book Now</button>
            </div>
          </div>
          </div>
          <MailList/>
          <Footer/>
          
        </div>}
        <div>
      
    </div>
    {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default HotelF
