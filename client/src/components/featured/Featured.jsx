import React from 'react'
import useFetch from '../../hooks/useFetch';

import './featured.css'


const Featured = () => {
    const {data, loading, error } = useFetch("/hotels/countByCity?cities=Kintampomain,Kintampo,Kintampowaterfalls");    /// this our fetch from db end point 

  return (
<div className='featured'>
  { loading ? ("loading please wait") : <><div className="featuredItem">
        <img className='featuredImg' src='https://bellafricana.com/wp-content/uploads/2014/12/Kintampo-Canopy-Walk-e1570924684836.jpg' />
            <div className="featuredTitles">
                <h1>Kintampo</h1>
                <h2>{data[0]}</h2>
            </div>

    </div>

    <div className="featuredItem">
        <img className='featuredImg' src='https://bellafricana.com/wp-content/uploads/2014/12/Kintampo-Canopy-Walk-e1570924684836.jpg' />
            <div className="featuredTitles">
                <h1>Kintampo</h1>
                <h2>{data[1]}</h2>
            </div>

    </div>

    

    <div className="featuredItem">
        <img className='featuredImg' src='https://upload.wikimedia.org/wikipedia/commons/5/5d/Kintampo_Waterfalls.JPG' />
            <div className="featuredTitles">
                <h1>Kintampo</h1>
                <h2>{data[2]}</h2>
            </div>

    </div>
    </>}
    
      
    </div>
    )
}
    
    

export default Featured