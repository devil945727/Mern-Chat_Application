import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setOtherUsers } from '../redux/userSlice';

const Sidebar = () => {
  const [search, setSearch] = useState(''); 
  const { otherUsers } = useSelector((store) => store.user); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout handler
  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/user/logout');
      // const res = await axios.get('http://192.168.43.217:8080/api/v1/user/logout');
      navigate('/login');
      toast.success(res.data.message);
      dispatch(setAuthUser(null))
    } catch (error) {
      console.error(error);
      toast.error('Failed to logout. Please try again.');
    }
  };

  // Search submit handler
  const searchSubmitHandler = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser])); // Update Redux state with filtered users
      toast.success('User found!');
    } else {
      toast.error('No user found with this name.');
    }
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="btn bg-slate-500">
          <FaSearch size="24px" />
        </button>
      </form>
      <div className="divider"></div>
      <OtherUsers />
      <div className="mt-2">
        <button onClick={logoutHandler} className="btn btn-sm">
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
