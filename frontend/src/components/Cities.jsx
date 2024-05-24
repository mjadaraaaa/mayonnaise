import React from 'react'
import { getAllUsers } from '../helpers/user.helpers'
import  { useState, useEffect } from 'react'
import { formatDateToView } from '../helpers/helpers'
import { getAllActivities, getAllCities } from '../helpers/activity.helpers'
import { Avatar } from '@mui/material'

// const MyAvatar = () => {
//   return (
//     <Avatar
//       alt="Remy Sharp"
//       src="your-image.jpg"
//      
//     />
//   );
// };


export const Cities = () => {



 
  const [cities, setCities] = useState(); 
  const [users, setUsers] = useState([]); 
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')




  const clearMessage = () => {
    setErrorMessage('')
    setSuccessMessage('')
  };

  


  const allCities = async () => {
    try {
      const res = await getAllCities
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
    <div className='flex-col pb-10 '>
      <div className='flex p-5 w-4/6 cursor-default items-center text-black justify-between '>
        <div className='flex items-center justify-start w-full '>
          <h4>Cities</h4>
        </div>
        <div className='flex items-center justify-end w-full '>
          <button className='text-xs font-bold  text-gray-800'><h4>See more</h4></button>
        </div>
      </div>

      <div className='grid grid-cols-4  w-4/6 cursor-default shadow-lg  text-black '>
        
        
        <div className='flex flex-col rounded-lg overflow-hidden justify-center  justify-items-center items-center '>
        
       <Avatar  sx={{ width: 70, height: 70 }} >r</Avatar>
        <p className='py-3 text-xs font-bold  text-gray-800'>name</p>


        </div>
        <div className='flex flex-col rounded-lg overflow-hidden justify-center  justify-items-center items-center '>
        
       <Avatar  sx={{ width: 70, height: 70 }} >r</Avatar>
        <p className='py-3 text-xs font-bold  text-gray-800'>name</p>


        </div>
        <div className='flex flex-col rounded-lg overflow-hidden justify-center  justify-items-center items-center '>
        
       <Avatar  sx={{ width: 70, height: 70 }} >r</Avatar>
        <p className='py-3 text-xs font-bold  text-gray-800'>name</p>


        </div>
        <div className='flex flex-col rounded-lg overflow-hidden justify-center  justify-items-center items-center '>
        
        <Avatar  sx={{ width: 70, height: 70 }} >r</Avatar>
         <p className='py-3 text-xs font-bold  text-gray-800'>name</p>
 
 
         </div>
        
       
       
        
      </div>
    </div>
  )
}
