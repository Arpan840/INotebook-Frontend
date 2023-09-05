import React, { useState } from 'react'

const Alert = ({message}) => {
    const [alerts,setAlerts]=useState(message)
   
        setTimeout(()=>{
            setAlerts("")
        },3000)
    
  return (
   
    <div>
        <div className="alert alert-primary" role="alert">
 <p>{alerts}</p>
</div>
    </div>
  )
}

export default Alert