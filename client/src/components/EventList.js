import axios from 'axios';
import React, { useEffect, useState } from 'react'

const EventList = () => {
  const [getEvent, setGetEvent] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios.get("/eventlist").then((res) => {
      setGetEvent(res.data);

    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <div>
      <div className='form'>
        <div className='eventlist-box'>
          <h2 id="form-handling">Registered Events</h2>
          <div className='event-base-form'>
            {getEvent.length != 0 && getEvent.map((ele, id) => {
              return (
                <><div>

                  <div class="card text-center Event-box">
                    <div class="card-header text-bolder">
                     <p> Meeting Organiser </p>{ele.firstname + ele.lastname} 
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">{ele.dates+" "+ele.stime}</h5>
                      <p class="card-text">{ele.location}</p>
                    </div>
                    <div class="card-footer text-muted text-bolder">
                     <p>Agenda</p> {ele.agenda}
                    </div>
                  </div>
                </div>
                </>
              )
            })
            }
          </div>


        </div>
      </div></div>
  )
}

export default EventList
