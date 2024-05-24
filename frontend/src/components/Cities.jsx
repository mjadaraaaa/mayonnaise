import React from 'react'
import { getAllUsers } from '../helpers/user.helpers'
import  { useState, useEffect } from 'react'
import { formatDateToView } from '../helpers/helpers'
import { getAllActivities, getAllCities } from '../helpers/activity.helpers'
import { Avatar } from '@mui/material'



export const Cities = () => {



 
  const [cities, setCities] = useState(); 
 
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')




  const clearMessage = () => {
    setErrorMessage('')
    setSuccessMessage('')
  };

  


  const allCities = async () => {
    try {
      const res = await getAllCities()
      console.log(res.data)
      if (res.data.status === 'success') {
        setCities(res.data.cities)
      }
    } catch (error) {
      console.log(error)
      
    }
  };

 
  const allUsers = async () => {
    try {
      const res = await getAllUsers()
      if (res.data.status === 'success') {
        setUsers(res.data.users);
        console.log(users[0]); 
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  
  useEffect(() => {
   
    allCities()
    
  }, [])

  useEffect(() => {
   
    allUsers()
    
  }, [])

    
  return (
    <div className='flex-col pb-10 w-full  '>
     <div className='flex p-5  cursor-default items-center text-black justify-between '>
        <div className='flex items-center justify-start w-full '>
          <h4 className='font-bold  uppercase' >Cities</h4>
        </div>
        <div className='flex items-center justify-end w-full '>
          <button className='text-sm hover:border-b-2 hover:border-gray-700 border-b-2 border-gray-100 transition-all'><h4>See more</h4></button>
        </div>
      </div>


      <div className='flex flex-wrap justify-center  bg-gray-600 rounded-lg py-10 gap-5  cursor-default  shadow-lg  text-black '>
        
        {cities?.map((city)=>(


<div key={city?.id} className='flex flex-col   p-28 rounded-lg gap-8 overflow-hidden  hover:bg-slate-100 hover:shadow-2xl hover:scale-110 transition-all cursor-pointer '>
        
       <Avatar className='shadow-2xl'  sx={{ width: 170, height: 170 }} src={`http://127.0.0.1:8000/api/profile/${city?.id}/${city?.picture}`} ></Avatar>
        <div className='flex  bg-white justify-center rounded-xl shadow-lg '><p  className=' font-bold  text-md uppercase '>{city?.city_name}</p></div>



        </div>

         ))}
        
        
      </div>
    </div>
  )
}
