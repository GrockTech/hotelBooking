import { faBed, faCalendarDays, faCar, faPerson, faPlane, faTaxi } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react'
import './header.css';
import {format} from "date-fns"
import { DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';


 


const Header = ({type}) => {
  const [openDate, setOpenDate] = useState(false)
  const [destination, setDestination] = useState("")
  const [Openoptions, setOpenoptions] = useState(false)
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
    
  })

 
  
  
  const handleOption = (name, operation) =>{
    setOptions(prev=>{return{
      ...prev, [name]: operation === "i" ? options[name] + 1 : options[name] - 1
     }})
  }
  


  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(), 
      key: 'selection'
    }
  ]);
  const {user} = useContext(AuthContext)
  const navigate = useNavigate()

  const {dispatch} = useContext(SearchContext)
  
  const handleSearch = () =>{
    dispatch({type:"NEW_SEARCH", payload:  {destination, dates, options}})   //// this line of code brings the state from search contect to this component
    navigate("/hotels", {state: {destination, dates, options}});
    // navigate("/hotels", {state:{name:"work well"}})
    
  }; 



  return (
    
    <div className='header'>
      <div className={ type === "list" ? "headerContainer listMode" : "headerContainer"}>

      
      <div className="headerList ">
        <div className="headerItem active">
        <FontAwesomeIcon icon={faBed} />
        <span>Stay</span>
        </div>

        <div className="headerItem">
        <FontAwesomeIcon icon={faPlane} />
        <span>Flight</span>
        </div>

        <div className="headerItem">
        <FontAwesomeIcon icon={faCar} />
        <span>Car Rentals</span>
        </div>

        <div className="headerItem">
        <FontAwesomeIcon icon={faBed} />
        <span>Attractions</span>
        </div>

        <div className="headerItem">
        <FontAwesomeIcon icon={faTaxi} />
        <span>Airpot Taxi</span>
        </div>

      </div>
      { type !== "list" &&
        <><h1 className='headTitle'> A lifetime of discounts ? It's Genius.</h1>
      <p className='headerDesc'>Get Rewarded for your Stay in our noble Hotel. Enjoy our serene  </p>
      {!user && <button className='headerBtn'>Sign in / Register</button>}
      
  <div className="headerSearch">
 
  <div className="headerSearchItem">
      <FontAwesomeIcon icon={faBed} />
     
      <input type="text" 
      placeholder='where are you going?'
      className='headerSearchInput'
      onChange={(e)=>setDestination(e.target.value)}
      />
      </div>
  
  <div className="headerSearchItem">
      <FontAwesomeIcon icon={faCalendarDays} />
       
        <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>{`${format(dates[0].startDate, "MM/dd/yyyy")} to  ${format(dates[0].endDate, "MM/dd/yyyy")}`} </span>

        {openDate && <DateRange
          onChange={item => setDates([item.selection])}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={dates}
          className='date'/>}
      </div>





      {/* hearder search 3 */}

      <div className="headerSearchItem">
      <FontAwesomeIcon icon={faPerson} />
      <span onClick={()=>setOpenoptions(!Openoptions)}  className='headerSearchText'>{ `${options.adult} adult. ${options.children} children . ${options.room} `}</span>
      
    { Openoptions && <div className="options" >
           
           <div className="optionItem">
            <span className='optionText'>Adult</span>   
           
            <div className="optionCounterContainer">
                <button 
                className='optionCounterBtn'
                disabled={options.adult <= 1}
                 onClick={()=>handleOption("adult", "d")} >-</button>
                
                <span className='optionCounterNumber'>{options.adult}</span>
                
                <button 
          
                className='optionCounterBtn'  
                onClick={()=>handleOption("adult", "i")}
                >+</button>


            </div>
            
            </div> 

            <div className="optionItem">
            <span className='optionText'>Children</span>    
            
            <div className="optionCounterContainer">
             
              <button 
              disabled={options.children <= 0}
              className='optionCounterBtn'
              onClick={()=>handleOption("children", "d")} >-</button>
              
              <span className='optionCounterNumber'>{options.children}</span>
             
              <button 
              
              className='optionCounterBtn'
              onClick={()=>handleOption("children", "i")} 
              
              >+</button>

            </div>
            
            </div> 

            <div className="optionItem">
            <span className='optionText'>Room</span>    
            
            <div className="optionCounterContainer">
                <button 
                 disabled={options.children <= 1}
                className='optionCounterBtn'
                 onClick={()=>handleOption("room", "d")}>-</button>
                <span className='optionCounterNumber'>{options.room}</span>
                <button 
               
                className='optionCounterBtn' 
                onClick={()=>handleOption("room", "i")}
               
                >+</button>

            </div>
           
            </div> 


      </div>
      
      }
      </div>

      
      <div className="headerSearchItem">
    <button onClick={handleSearch} className='headerBtn'> Search</button>
      </div>

      </div></>}
      </div>
    </div>
  )
}

export default Header
