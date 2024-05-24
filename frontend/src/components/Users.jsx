import React, { useState, useEffect } from 'react'
import { deleteUser, getAllUsers, userPrivilege } from '../helpers/user.helpers'
import { Avatar } from '@mui/material'
import { stringAvatar } from '../helpers/helpers'
import { formatDateToView } from '../helpers/helpers'

export const Users = () => {
  const [users, setUsers] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const clearMessage = () => {
    setErrorMessage('')
    setSuccessMessage('')
  };

  const allUsers = async () => {
    try {
      const res = await getAllUsers();
      if (res.data.status === 'success') {
        setUsers(res.data.users)
        console.log(users[1])
      }
    } catch (error) {
      setErrorMessage(error.message)
    }
  };

  const promoteDemote = async (id) => {
    try {
      const res = await userPrivilege(id)
      if (res.data.status === 'success') {
        setSuccessMessage(res.data.message)
        console.log(res.data)
        allUsers();
      } else {
        setErrorMessage(res.data.message || 'Promotion/demotion failed'); 
        console.log(res.data)
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.error(error)
    }
  }
  
  const delUser = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.data.status === 'success') {
        setSuccessMessage(res.data.message);
        console.log(res.data); 
      } else {
        setErrorMessage(res.data.message || 'Promotion/demotion failed'); 
        console.log(res.data); 
      }
    } catch (error) {
      setErrorMessage(error.message); 
      console.error(error);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div className='flex-col w-full min-w-72 items-start justify-center '>
      <div className='flex p-5 cursor-default items-center text-black justify-between'>
        <div className='flex items-center justify-start w-full '>
          <h4 className=' font-bold'>USERS</h4>
        </div>
        <div className='flex items-center justify-end w-full '>
          <button className='text-sm hover:border-b-2 hover:border-gray-700 border-b-2 border-gray-100 transition-all'>See more</button>
        </div>
      </div>
      <div className='flex flex-col cursor-default shadow-lg gap-2 max-h-96 overflow-auto text-white bg-gray-600 rounded-md p-4 '>
        {users?.map((user) => (
          <div className='cursor-pointer text-white bg-gray-800 flex px-4 py-2 items-center justify-between hover:bg-gray-200 hover:text-gray-700 transition-all rounded-md' key={user?.id} >
            <div className='flex items-center justify-start gap-2'>
              {user?.profile_picture ? (
              <Avatar className='shadow-lg' src={`http://127.0.0.1:8000/api/profile_picture/${user?.id}/${user?.profile_picture}`} />
            ) : (
              <Avatar className='shadow-lg' {...stringAvatar(user?.name)} />
            )}

            <div className='flex flex-col justify-center items-start text-sm'>
              <p>{user?.name} - <strong>{user?.email}</strong
              > </p>
              <p className={user?.role_id === 1 ? `bg-yellow-700 uppercase text-xs text-white px-2 rounded-full mt-1 shadow-lg`:` font-bold uppercase text-xs`}>{user?.role_id === 1 ? "admin" : "user" }</p> 
            </div>
            </div>
            
            
            <div className='px-2 flex items-center justify-start text-sm'><p>Joined <span className=' font-semibold'>{formatDateToView(user?.created_at)}</span> </p></div>
            <button
              className={user?.role_id === 1 ? "px-2 py-1 bg-red-500 text-white hover:opacity-70 active:opacity-50 text-sm rounded-full transition-all" : 
              "px-2 py-1 bg-green-600 text-white hover:opacity-70 active:opacity-50 text-sm rounded-full transition-all "}
              onClick={() => promoteDemote(user?.id)}
            >
              {user?.role_id === 1 ? "demote" : "promote" }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
