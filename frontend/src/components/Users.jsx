import React, { useState, useEffect } from 'react'
import { adminUserSearch, deleteUser, getAllUsers, userPrivilege } from '../helpers/user.helpers'
import { Avatar } from '@mui/material'
import { stringAvatar } from '../helpers/helpers'
import { formatDateToView } from '../helpers/helpers'
import ManageUsersModal from './modals/UsersModals'

export const Users = () => {
  const [selectedUser , setSelectedUser ] = useState()
  const [userFormData, setUserFormData] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [searchedUsers, setSearchedUsers] = useState([])
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const openModal = ()=>{
    setIsOpen(true)
  }

  const onRequestClose = () =>
    {

      setIsOpen(false)

      }
  
  const handleInputChange = (e) => {
    
   setUserFormData(e.target.value) 
    search(userFormData )  

  
   
  };

  const clearMessage = () => {
    setErrorMessage('')
    setSuccessMessage('')
  };

  // const allUsers = async () => {
  //   try {
  //     const res = await getAllUsers();
  //     if (res.data.status === 'success') {
  //       setUsers(res.data.users)
  //       console.log(users[1])
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     setErrorMessage(error)
  //   }
  // };

  const promoteDemote = async (id) => {
    try {
      const res = await userPrivilege(id)
      if (res.data.status === 'success') {
        setSuccessMessage(res.data.message)
        console.log(res.data)
        
        search(userFormData);
      } else {
        setErrorMessage(res.data.message ); 
        console.log(res.data)
      }
    } catch (error) {
      setErrorMessage(error.message)
      console.log(error)
    }
  }

  
  const search = async (query) => {
    try {
      const res = await adminUserSearch(query)
      console.log(res)
      if (res.data.status === 'success') {
        setSearchedUsers(res.data.users)
         }
    } catch (error) {
      console.log(error)
      setErrorMessage(error)
    }

  };

  
  // const delUser = async (id) => {
  //   try {
  //     const res = await deleteUser(id);
  //     if (res.data.status === 'success') {
  //       setSuccessMessage(res.data.message);
  //       console.log(res.data); 
  //     } else {
  //       setErrorMessage(res.data.message || 'Promotion/demotion failed'); 
  //       console.log(res.data); 
  //     }
  //   } catch (error) {
  //     setErrorMessage(error.message); 
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    search(userFormData)
  }, [userFormData]);

  return (
    <div className='flex-col w-full min-w-72 items-start justify-center '>
      <div className='flex p-5 cursor-default items-center text-black justify-between'>
        <div className='flex items-center justify-start w-full '>
          <h4 className=' font-bold'>USERS</h4>
        </div>
        <div className=' w-full flex justify-center items-center'>
        <input 
        type="text"
        name="users"
        placeholder="Search Users..."
        value={userFormData}
        onChange={handleInputChange}
        autoComplete="off"
        
        className="m-3 placeholder:text-[#4F5D75] bg-transparent px-3 py-1 text-base w-full border-b-2 border-b-gray-800 outline-none transition-all focus:border-b-[#4F5D75]"
      />
      </div>
        <div className='flex items-center justify-end w-full '>
          <button className='text-sm hover:border-b-2 hover:border-gray-700 border-b-2 border-gray-100 transition-all'>See more</button>
        </div>
      </div>
      <div  className='flex flex-col cursor-default shadow-lg gap-2 max-h-96 overflow-auto text-white bg-gray-600 rounded-md p-4 '>
        {   
        userFormData !=="" && searchedUsers.length === 0 ? <div>no results</div> :
          
          searchedUsers?.map((searchedUser)=>(

          <div onClick={ () => {openModal()
              setSelectedUser(searchedUser)
           } }
          key={searchedUser?.id} className='cursor-pointer text-white bg-gray-800 flex px-4 py-2 items-center justify-between hover:bg-gray-200 hover:text-gray-700 transition-all rounded-md'  >
          <div className='flex items-center justify-start gap-2'>
            {searchedUser?.profile_picture ? (
            <Avatar className='shadow-lg' src={`http://127.0.0.1:8000/api/profile_picture/${searchedUser?.id}/${searchedUser?.profile_picture}`} />
          ) : (
            <Avatar className='shadow-lg' {...stringAvatar(searchedUser?.name)} />
          )}

          <div className='flex flex-col justify-center items-start text-sm'>
            <p>{searchedUser?.name} - <strong>{searchedUser?.email}</strong
            > </p>
            <p className={searchedUser?.role_id === 1 ? `bg-yellow-700 uppercase text-xs text-white px-2 rounded-full mt-1 shadow-lg`:` font-bold uppercase text-xs`}>{searchedUser?.role_id === 1 ? "admin" : "user" }</p> 
          </div>
          </div>
          
          
          <div className='px-2 flex items-center justify-start text-sm'><p>Joined <span className=' font-semibold'>{formatDateToView(searchedUser?.created_at)}</span> </p></div>
          <button
            className={searchedUser?.role_id === 1 ? "px-2 py-1 bg-red-500 text-white hover:opacity-70 active:opacity-50 text-sm rounded-full transition-all" : 
            "px-2 py-1 bg-green-600 text-white hover:opacity-70 active:opacity-50 text-sm rounded-full transition-all "}
            onClick={() => promoteDemote(searchedUser?.id)}
          >
            {searchedUser?.role_id === 1 ? "demote" : "promote" }
          </button>
        </div>
        ))}
      </div>
      
<ManageUsersModal
isOpen={isOpen}
onRequestClose={onRequestClose}
modalUser = {selectedUser}

/>
    </div>
    
  )
};
