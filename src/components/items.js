import React,{useState,useEffect} from 'react'
import {Container,ListGroup,ListGroupItem,Button,Jumbotron,Alert } from 'reactstrap'
// Transion - fadeinfadeout
import {CSSTransition,TransitionGroup} from 'react-transition-group' 
// Fake ID's
// import { v4 as uuid } from 'uuid';
import axios from 'axios'


import FormInputs from './form'

const ShoppingList = ({setLogedIn,loggedIn,message,setMessage,data,setData})=>{
    const url = 'https://cart-api-v1.herokuapp.com/item/api/new/'
    const url_GET = 'https://cart-api-v1.herokuapp.com/item/api/'

    const [name, setName] = useState({name:''})
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
    setTimeout(() => {
      setMessage(false)
      setData('')
    }, 4000);
  }, [message])

    useEffect(() => {
        axios({
        method: 'get',
        url: url_GET,headers:
            {
               "authorization":localStorage.getItem('token')
            }
        })
        .then((res)=>{

            setLoading(false)
            setItems(res.data)
        })
        .catch((error)=>{
            setMessage(true)
            setData(error.message)
        })
    },[])
    const handleSubmit = (e)=>{
       e.preventDefault()
       axios.post(url,name,{
           headers:
            {
               "authorization":localStorage.getItem('token')
            }
       })
       .then((res)=>{
           setItems([res.data,...items])
           setName({name:''})
       })
       .catch((error)=>{
           setMessage(true)
          setData(error.message)
       })
    }
    const handleChange = (e)=>{
        const inputName = e.target.name
        const inputValue = e.target.value
        // IMPORTANT STEP FOR TAKING INPUTS
        setName({...name,[inputName]:inputValue})
    }
    const deleteHandler = (id)=>{
        axios.delete(`https://cart-api-v1.herokuapp.com/item/api/delete/${id}`,{
            headers:{
                "authorization":localStorage.getItem('token')
            }
        })
        .then(res=>{
            setItems(items.filter((item)=>{
                return item._id!==id
            }))
        })   
    }
    if(loggedIn){
        return(
            <Container>
            <div className="display col-8 offset-2">                
                <FormInputs handleSubmit={handleSubmit} handleChange={handleChange} name={name}></FormInputs>
                {message?<Alert color="warning">{data}</Alert>:null}
                {loading? <div class="loader"></div> :''}
                    <ListGroup>
                    <TransitionGroup className="shopping-list">
                    {
                    items.map((item)=>{
                        return(
                            <CSSTransition key={item._id} timeout={500} classNames="fade">
                                <ListGroupItem className="items">
                                    <div >         
                                        <Button className="remove" size="sm" onClick={()=>deleteHandler(item._id)}>&times;</Button>
                                        <span className="items">{item.name}</span>
                                    </div>
                                </ListGroupItem>
                            </CSSTransition> 
                        )
                    })
                    }
                    </TransitionGroup>
                </ListGroup> 
            </div>
            </Container>
        )   
    }
    else{
        return(
            <Container>
                <Jumbotron className="fluid col-10 offset-1">
                    <h1 className="display-3">Hello!</h1>
                    <p className="lead">Please login to add or view items in the cart.</p>
                </Jumbotron>
            </Container>
        )
        
    }
}

export default ShoppingList