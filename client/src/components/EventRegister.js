import React, { useEffect, useState } from 'react'
import { TimePickerComponent } from '@syncfusion/ej2-react-calendars';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventRegister = () => {
    
     const navigate = useNavigate();
    // const notify = () => toast.success("Registered Successfully...",{
    //     autoClose: 5000,
    //     draggable: true,
    // });

    const [error, setError] = useState("");
    const [eventData, setEventData] = useState({
        firstname: "", lastname: "", location: "", stime: "", dates: "", mobileno: "", agenda: ""
    })
    let name, value;
    const inputHandle = (e) => {
        value = e.target.value;
        name = e.target.name;
        setEventData({ ...eventData, [name]: value });

    }


    const sunbmitInfo = async (e) => {
        e.preventDefault();
        //  const SendData = await axios.post("/eventregister" , eventData);
        //  console.log(SendData);
        setError("");
        axios.post("/eventregister", eventData).then((res) => {
            if (res.status === 201) {
                window.alert("Event has been created Successfully");
                navigate("/eventlist");

            }
        }).catch((err) => {
            console.log(err);
            if (err.response.status === 422) {
                console.log(err.response.status);
                setError("Please enter all required field");
            }
            if (err.response.status === 302) {
                console.log(err.response.status);
                setError("Please select other time slot");
            }
        })
        //notify();
    }
    return (
        <div>
            <div className='form'>
                <div className='container'>
                    <h2 id="form-handling">Event Registration Form</h2>
                    {error.length != 0 && <p className="error">{error}</p>}
                    <form method="POST">
                        <div className="row">
                            <div className="col">
                                <label>First Name{}</label>
                                <input type="text" className="form-control" placeholder="First Name" name="firstname" value={eventData.firstname} onChange={inputHandle} />

                            </div>
                            <div className="col">
                                <label>Last Name </label>
                                <input type="text" className="form-control" placeholder="Last Name" name="lastname" value={eventData.lastname} onChange={inputHandle} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <div className="col">
                                    <label>Mobile No {eventData.mobileno.length > 10 && <span style={{ "color": "red", "font-weight": "bolder" }}>contains 10 characters</span>}</label>
                                    <input type="text" className="form-control" placeholder="Mobile No" name="mobileno" value={eventData.mobileno} onChange={inputHandle} />
                                </div>
                            </div>
                            <div className="col">
                                <label>Date</label>
                                <input type="date" className="form-control" placeholder="date" name="dates" value={eventData.dates} onChange={inputHandle} />
                            </div>
                            <div className="col">
                                <label>Start Time</label>
                                <input type="time" className="form-control" placeholder="stime" name="stime" value={eventData.stime} onChange={inputHandle} step="-1" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label>Location</label>
                                <input type="text" className="form-control" placeholder="Location" name="location" value={eventData.location} onChange={inputHandle} />
                            </div>
                            <div className="col">
                                <label>Agenda</label>
                                <input type="text" className="form-control" placeholder="Agenda" name="agenda" value={eventData.agenda} onChange={inputHandle} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">

                            </div>
                            <div className="col btn_submit">
                                <button className='btn-color' onClick={sunbmitInfo}>Register</button>
                              <ToastContainer />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EventRegister;
