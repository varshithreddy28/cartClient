import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useHistory } from 'react-router-dom';


import { Button, Form, FormGroup, Label, Input,Alert } from 'reactstrap';

const Login = ({details ,handleChange,setDetails,setLogedIn,message,setMessage,data,setData }) => {

  const history = useHistory()
  const login = "http://localhost:3000/item/api/user/login/"

  
  useEffect(() => {
    setTimeout(() => {
      setMessage(false)
      setData('')
    }, 4000);
  }, [message])
  

  const loginSubmit = async (e)=>{
        e.preventDefault()
        try {
            const data = details
            setDetails({name:'',password:''})
            const response = await axios.post(login,{username:details.name,password:details.password})
            if(response.data.success){
              localStorage.setItem('token',`Bearer ${response.data.token}`)
              history.push('/') // Sttting path after login
              setLogedIn(true)
            }
            else{
              setMessage(true)
              setData(response.data.message)
              setLogedIn(false)
            }
        } catch (error) {
          setMessage(true)
          setData(error.message)
          setLogedIn(false)
        }
        
    }

  return (
    <Form inline className="col-6 offset-3" >
      <div className="authenticate">
          {/* onSubmit={loginSubmit} */}
          {message?<Alert color="warning">{data}</Alert>:null}
          <h2>Login</h2>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="exampleEmail" className="mr-sm-2">Username</Label>
          <Input type="text" name="name" value={details.name} id="exampleEmail" required onChange={handleChange} placeholder="User name" />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="examplePassword" className="mr-sm-2">Password</Label>
          <Input type="password" name="password" value={details.password} required id="examplePassword" onChange={handleChange} placeholder="Password" />
        </FormGroup>
        <Button onClick={loginSubmit } type="submit"  >Submit</Button>
        {/* <Redirect to="/"></Redirect> */}
        
      </div>
      <p>Dosen't have an acccount? <Link to={'/user/register'}>Register</Link></p>
    </Form>
  );
}

export default Login;