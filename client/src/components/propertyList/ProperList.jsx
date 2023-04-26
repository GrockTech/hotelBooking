import React from 'react'
import useFetch from '../../hooks/useFetch'
import './propertlist.css'


const ProperList = () => {
    const {data, loading, error } = useFetch("/hotels/countByType")
    const images = [
      "https://buzzghana.com/wp-content/uploads/2015/02/movenpick.jpg", 
      "http://new-hls.s3.amazonaws.com/hls/data/518/gallery/thumbs/full_standard-single_d_1491834500.jpg",
      "http://new-hls.s3.amazonaws.com/hls/data/518/gallery/thumbs/full_standard-double_1494859760.jpg",
      "https://media-cdn.tripadvisor.com/media/photo-s/20/00/71/77/la-villa-boutique-hotel.jpg",
      "https://buzzghana.com/wp-content/uploads/2015/02/movenpick.jpg"
    ]

  return (
    <div className='pList'>
        
      { loading ? "please wait is loading " :
      
      <> {data && images.map((img, i)=>(

      

      <div className="pListItem" key={i}> 

            <img className='pListImg' 
            src={img}             alt="" />
            <div className="pListTitles">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
        </div>))}

 </>}




      
    </div>
  )
}

export default ProperList
