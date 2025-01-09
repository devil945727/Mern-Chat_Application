import React,{useState} from 'react'
import { IoSendOutline } from "react-icons/io5";
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messagesSlice.jsx';

const SendInput = () => {
  const [message,setMessage]=useState("")
  const dispatch=useDispatch()
  const {selectedUser}=useSelector(store=>store.user)
  const {messages} = useSelector(store=>store.message)

  const onSubmitHandler=async(e)=>{
    e.preventDefault();
    try {
      // const res=await axios.post(`http://192.168.43.217:8080/api/v1/message/send/${selectedUser._id}`,{message},{
        const res=await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser._id}`,{message},{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      })
      console.log(res);
      dispatch(setMessages([...messages,res.data.newMessage]))
      
    } catch (error) {
      console.log(error);
    }
    setMessage("")
  }
  return (
    <form onSubmit={onSubmitHandler} className='px-4 my-3'>
        <div className='w-full relative'>
            <input 
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            type="text" placeholder='Send a message...' 
            className='border text-sm rounded-lg block w-full p-3 border-zinc-500 text-white bg-gray-500'/>
            <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4 text-white'>
                <IoSendOutline />
            </button>
        </div>
    </form>
  )
}

export default SendInput