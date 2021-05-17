import React,{useState,useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import localStorage from 'local-storage'

import 'bootstrap/dist/css/bootstrap.min.css'

import './App.css';

import axios from 'axios'

// Pages :
import Login from '../src/components/login'
import Register from '../src/components/register'
import Items from '../src/components/items'
import Navbar from './components/nav'




function App() {

  const [loggedIn, setLogedIn] = useState(false)
  let [details, setDetails] = useState({name:'',password:'',email:''})
  const [message, setMessage] = useState(false)
  const [data, setData] = useState('')

  const login_user = "http://localhost:3000/item/api/user/"
  useEffect(() => {
    const fetchdata = async ()=>{
      const token=localStorage.get('token')
      console.log(token)
        if(token){
        try {
          const response = await axios.get(
            login_user,{
            headers:
              {
                "authorization":token
              }
          })
        setLogedIn(true)
        } catch (error) {
          console.log(error)
        }
      }
    }
    fetchdata()
  }, [])

    const handleChange = (e)=>{
        const inputName = e.target.name
        const inputValue = e.target.value
        // IMPORTANT STEP FOR TAKING INPUTS
         setDetails({...details,[inputName]:inputValue})
    }
  
  return (
    <Router>
      <Navbar setLogedIn={setLogedIn} loggedIn={loggedIn}/>
      <Switch>
        <Route exact path='/'>
          <Items setLogedIn={setLogedIn} loggedIn={loggedIn} message={message} setMessage={setMessage} data={data} setData={setData}></Items>
        </Route>
        <Route exact path='/user/login'>
          <Login details={details} handleChange={handleChange} setDetails={setDetails} 
          setLogedIn={setLogedIn } message={message} setMessage={setMessage} data={data} setData={setData}/>
        </Route>
        <Route exact path='/user/register'>
          <Register loggedIn={loggedIn} details={details} handleChange={handleChange} 
          setDetails={setDetails} setLogedIn={setLogedIn }message={message} setMessage={setMessage}data={data} setData={setData} ></Register>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
