
import {useEffect, useState} from "react"
import axios from "axios"

const useFetch = (url) =>{
const [data, setData] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(false)

useEffect(()=>{
    const fetchData  = async () => {
        setLoading(true)      /// when we start to make api requet loading is set to true 
         try {
            const res = await axios.get(url)
            setData(res.data) /// if there is no error res variable will be setto setData state 
         } catch (error) {
            setError(error)
         }
         setLoading(false)
    }
fetchData()
}, [url])


const reFetch  = async () => {
   setLoading(true)      /// when we start to make api requet loading is set to true 
    try {
       const res = await axios.get(url)
       setData(res.data) /// if there is no error res variable will be setto setData state 
    } catch (error) {
       setError(error)
    }
    setLoading(false)
}
return {data, loading, error, reFetch}
};

export default useFetch;