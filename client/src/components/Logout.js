import axios from 'axios'
import React, { useContext,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Logout = () => {
  const navigate = useNavigate();
    const {state , dispatch} = useContext(UserContext);
   
    useEffect(()=>{
      axios.get('/logout').then((res)=>{
        console.log(res);
      }).catch((err)=>{
        if(err.response.status === 401){
          dispatch({type :"USER",payload:false})
          navigate("/login");
        }
      })
    },[]);
  return (
    <></>
  );
}

export default Logout
