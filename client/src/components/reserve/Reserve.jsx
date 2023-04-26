import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  './reserve.css'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import useFetch from '../../hooks/useFetch'
import { useContext, useState } from 'react'
import { SearchContext } from '../../context/SearchContext'
import { setDate } from 'date-fns'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Reserve = ({setOpen, hotelId}) => {
  const {data, loading, error, reFetch } = useFetch(`/hotels/room/${hotelId}`)
  const [selectedRoom, setSelectedRoom] = useState([])
  const {dates} = useContext(SearchContext)
  
  const getDateRange = (startDate, endDate)=>{
   const start = new Date(startDate)
   const end = new Date(endDate)
   
    const date = new Date(start.getTime()); /// we create a loop to loop over 
 
    let dates = []
    // while(date => end){
    //   dates.push(new Date(date))
    //   date.setDate(date.getDate()+1)
    // }
    while(date <= end){
      dates.push(new Date(date).getTime())
      date.setDate(date.getDate() + 1)
    }
    return dates
  }
  const alldates = getDateRange(dates[0].startDate, dates[0].endDate)
  // console.log(allDates)

// const isAvailable = (roomNumber) =>{
// const isFound = roomNumber.unvailableDates.some((date)=>alldates.includes(new Date(date).getTime())) ///checking if Date includes alldates else we retturn the opposite(not selected)
// return !isFound

// } 

const isRoomAvailable = (roomNumber) =>{
const isroomFound = roomNumber.unavailableDates.some((date)=>alldates.includes(new Date(date).getTime()) )
return 
!isroomFound

}

// const isAvailable = (room) =>{
//   const isFound = room.unvailableDates.some((date)=> alldates.some((allDate) => allDate.getTime() === new Date(date).getTime()));
//   return !isFound;
// }

const handleSelect = (e) =>{
  const checked = e.target.checked
  const value = e.target.value 
  setSelectedRoom(checked ? [...selectedRoom, value] : selectedRoom.filter((room)=> room !== value))
}

const navigate = useNavigate()

const handleClick = async () =>{
 
  try {
    // await Promise.all((selectedRoom.map(roomID))) => {
    // const   res = axios.put(`/rooms/availability/${roomID}`, {dates: allDates})
    //   return res.data;
    // })
    await Promise.all(selectedRoom.map((roomId)=>{
     
      const res = axios.put(`/rooms/availability/${roomId}`, {dates: alldates})
      return res.data;
     
    }))
    setOpen(false)
    navigate("/")

  } catch (error) {
  console.log(error)
    
  }

}
  return (
    <div className='reserve'>
     <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark}
         className='rClose'
          onClick={()=>setOpen(false)}/>

          <span>select your rooms:</span>
          {data.map((item)=>(
            <div className="item" >
              <div className="rItemInfo">
                <div className="rItemTitle">{item.title}</div>
                <div className="rItemDesc">{item.desc}</div>
                <div className="rItemMax">Max People:<b> {item.maxPeople} </b></div>
                <div className="rPrice">  {item.price}</div>

              </div>
        <div className="rselectRooms">

        {item.roomNumbers.map(roomNumber => (
                   <div className="room" >
                    <label>{roomNumber.number}</label> 
                    <input 
                    type='checkbox' 
                    value={roomNumber._id} 
                    
                    onChange={handleSelect}
                    disabled={!isRoomAvailable(roomNumber)}
                    />
                    

                    </div>
                ))}
        </div>
                

            
           </div>

            
          ))}
        <button className='rButton' onClick={handleClick}>Reserve Now</button> 
     </div>
     
    </div>
  )
}

export default Reserve
