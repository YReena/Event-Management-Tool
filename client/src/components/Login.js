import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { UserContext } from '../App';

const Login = () => {
    const {state , dispatch} = useContext(UserContext);
    const[emailerr , setEmailErr] = useState("");
    const[error , setError] = useState("");
    const navigate = useNavigate();
    const [user, setUser ] = useState({
        email: "", password: ""
    })
    let name, value;
    const inputHandle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const subtInfo= async(e)=>{
       e.preventDefault();
       setError("");
       const emailReg = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
       if(! emailReg.test(user.email)){
           setEmailErr("Enter a vaild email");
       } 
       axios.post('/login',user).then((res) => {
        if(res.status === 200){
            dispatch({type :"USER",payload:true})
            window.alert("Logged In Sucessfully")
            navigate("/"); 
        }
        }).catch((err) => {
            console.log(err.response.status);
          if (err.response.status === 401) {
             setError("Email is not registed");
             navigate("/login");
          }
          if (err.response.status === 400) {
            setError("Email or password is wrong");
         }
        })  

    }

    return (
        <div>
            <div className='login'>
                <div className='login-box '>
                    <h2>Login In</h2>
                    <form method='POST'>
                        <div className="row login_input">
                            <div className="col">
                                {error.length != 0 && <p className="error">{error}</p>}
                                <label>Email</label>
                               <input type="email" className="form-control" placeholder="Email" name="email" value ={user.email} onChange={inputHandle} />
                               {emailerr.length != 0 && <p className="error">{emailerr}</p>}
                            </div>
                        </div>
                        <div className="row login_input">
                            <div className="col">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" name="password" value={user.password} onChange={inputHandle} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className='btn btn-primary' onClick={subtInfo}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>


            </div>

        </div>
    )
}

export default Login;
