import React,{useEffect} from 'react';
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input,Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';


const Register = ({details ,handleChange,setDetails,setLogedIn,loggedIn,message,setMessage,data,setData }) => {
    const history = useHistory()
    const register = "http://localhost:3000/item/api/user/register/"
    useEffect(() => {
    setTimeout(() => {
      setMessage(false)
      setData('')
    }, 4000);
  }, [message])
    const RegisterSubmit = async (e)=>{
       e.preventDefault()
        try {
            const response = await axios.post(register,details)
            if(response.data.success){
                axios.post(register,
                    // storing JWT in local storage
                    localStorage.setItem('token',`Bearer ${response.data.token}`)  
                )
                setLogedIn(true)
                history.push('/') // Sttting path after login
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
        setDetails({name:'',password:'',email:''})
    }
  return (
    
      <Form inline className="col-6 offset-3">
        <div className="authenticate">
          {message?<Alert color="warning">{data}</Alert>:null}
      <h2>Register</h2>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">Username</Label>
        <Input type="email" name="email" value={details.email} id="exampleEmail" required onChange={handleChange} placeholder="Email" />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="exampleEmail" className="mr-sm-2">Username</Label>
        <Input type="text" name="name" value={details.name} id="exampleEmail" required onChange={handleChange} placeholder="User name" />
      </FormGroup>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Label for="examplePassword" className="mr-sm-2">Password</Label>
        <Input type="password" name="password" value={details.password} id="examplePassword" required onChange={handleChange} placeholder="Password" />
      </FormGroup>
      <FormGroup>
        <Button onClick={RegisterSubmit} type="submit">Submit</Button>
      </FormGroup>
      
      </div>
    </Form>
    
  );
}

export default Register;