import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages'
import { useDispatch, useSelector } from 'react-redux'
import {setSelectedUser} from '../redux/userSlice'

const MessageContainer = () => {
  const { selectedUser,authUser } = useSelector(store => store.user)
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   return () => dispatch(setSelectedUser())
  // },[])
  return (
    <>
      {
        selectedUser != null ? (
          <div className='md:min-w-[550px] flex flex-col'>

            <div className='flex gap-2 items-center text-white bg-gray-500 p-2'>
              <div className='avatar online'>
                <div className='w-12 rounded-full'>
                  <img src={selectedUser?.profilePhoto} alt="" />
                </div>
              </div>
              <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2 '>
                  <p>{selectedUser?.fullName}</p>
                </div>
              </div>
            </div>
            <Messages />
            <SendInput />

          </div>
        ) : (
          <div className='md:min-w-[550px] flex flex-col justify-center'>
            <h1 className='text-4xl text-white font-bold'>Hi,{authUser?.fullName} </h1>
            <h1 className='text-2xl text-white'>Let's start conversation</h1>
          </div>
          
        )
      }
    </>

  )
}

export default MessageContainer