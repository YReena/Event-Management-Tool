import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const[emailerr , setEmailErr] = useState("");
    const [error , setError] = useState("");
    const [userData, setUserData] = useState({
        email: "", password: "", cpassword: ""
    })
    let name, value;
    const inputHandle = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUserData({ ...userData, [name]: value });
    }

    const submitInfo = async (e) => {
        e.preventDefault();
        // const getData = await axios.post("/signup" , userData);
        // console.log(getData);  
        // if(getData.status === 200){
        //     navigate("/login");
        // } 
        // else{
        //     window.location.reload()
        // } 
        // const regex =  /^(?=.*/d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;



        const re = new RegExp("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,}$");
        if( !re.test(userData.password) && !re.test(userData.cpassword)){
            setError("Please enter strong password");
        }

        const emailReg = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
        if(! emailReg.test(userData.email)){
            setEmailErr("Enter a vaild email");
        }
        
 
        axios.post('/signup',userData).then((res) => {
            if(res.status === 201){
                window.alert("Add Successfully");
                navigate("/login");

            }
            }).catch((err) => {
                console.log(err.response.status);
              if (err.response.status === 400) {
                 setError("Please make your passwords match");
              }
              if (err.response.status === 422) {
                setError("Email is already exists");
                window.alert("Email is already Registered");
                navigate("/login");
             }
             if (err.response.status === 401) {
                setError("Field is required");
             }
            }) 
    }

    return (
        <div>
            <div className='login'>
                <div className='login-box '>
                    <h2>Sign Up</h2>
                    <form method='POST'>
                        <div className="row login_input">
                            <div className="col">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Email" name="email" value={userData.email} onChange={inputHandle} />
                                {emailerr.length != 0 && <p className="error">{emailerr}</p>}
                            </div>
                        </div>
                        <div className="row login_input">
                            <div className="col">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Password" name="password" value={userData.password} onChange={inputHandle} />
                            </div>
                        </div>
                        <div className="row login_input">
                            <div className="col">
                                <label>Confirm Password</label>
                                <input type="password" className="form-control" placeholder="Confirm Password" name="cpassword" value={userData.cpassword} onChange={inputHandle} />
                            </div>
                            {error.length != 0 && <p className="error">{error}</p>}
                        </div>
                        <div className="row">
                            <div className="col">
                                <button className='btn btn-primary' onClick={submitInfo}>Submit</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
