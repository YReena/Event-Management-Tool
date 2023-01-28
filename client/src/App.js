import './App.css';
import { Grid } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Logout from './components/Logout';
import EventRegister from './components/EventRegister';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { createContext, useReducer } from 'react';
import { initialState, reducer } from './reducer/UseReducer';
import EventList from './components/EventList';

export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Dashboard />} />
      <Route path="/eventregister" element={<EventRegister />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/logout/" element={<Logout/>}/>
      <Route path="/eventlist" element={<EventList/>}/>
    </Routes>
  )
}
const App =()=> { 
  const[state,dispatch] = useReducer(reducer,initialState);
  return (
    <>
      <UserContext.Provider value={{state , dispatch}}>
        <div className="App">

          <Grid container>
            <Grid item xs={12}>
              <Navbar />
            </Grid>
            <Grid item xs={12}>
            <Routing/>
            </Grid>
          </Grid>

        </div>
      </UserContext.Provider>

    </>


  );
}

export default App;
