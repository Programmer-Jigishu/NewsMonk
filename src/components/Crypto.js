import React,{useState,useEffect} from 'react'

function Crypto() {
    const [data,setData] = useState([]);
    useEffect(()=>{
        fetch('https://api.coincap.io/v2/assets')
        .then(res=>res.json())
        .then(data=>setData(data.data))
    })
  return (
    <div>Crypto</div>
  )
}

export default Crypto