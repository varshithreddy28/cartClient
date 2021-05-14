import React,{useState,useEffect} from 'react'
import {Container,ListGroup,ListGroupItem,Button } from 'reactstrap'
// Transion - fadeinfadeout
import {CSSTransition,TransitionGroup} from 'react-transition-group' 
// Fake ID's
// import { v4 as uuid } from 'uuid';
import axios from 'axios'

import FormInputs from './form'

const ShoppingList = ()=>{
    const url = 'https://cart-api-v1.herokuapp.com/item/api/new'
    const url_GET = 'https://cart-api-v1.herokuapp.com/item/api/'

    const [name, setName] = useState({name:''})
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios({
        method: 'get',
        url: url_GET,
        })
        .then((res)=>{
            setLoading(false)
            setItems(res.data)
        })
    },[])
    const handleSubmit = (e)=>{
       e.preventDefault()
       axios.post(url,name)
       .then((res)=>{
           setItems([res.data,...items])
           setName({name:''})
       })
    }
    const handleChange = (e)=>{
        const inputName = e.target.name
        const inputValue = e.target.value
        // IMPORTANT STEP FOR TAKING INPUTS
        setName({...name,[inputName]:inputValue})
    }
    const deleteHandler = (id)=>{
        axios.delete(`https://cart-api-v1.herokuapp.com/item/api/delete/${id}`)
        .then(res=>{
            setItems(items.filter((item)=>{
                return item._id!==id
            }))
        })
        
    }
    return(
        <Container>
            <div className="display">                
                    <FormInputs handleSubmit={handleSubmit} handleChange={handleChange} name={name}></FormInputs>
                {/* ~<FormInput handleSubmit={handleSubmit} handleChange={handleChange} name={name}></FormInput> */}
                {/* <form onSubmit={handleSubmit}>
                    <input type="text" required name='name' placeholder="Item Name" onChange={handleChange} value={name.name}></input>
                </form> */}
                {/* <Button color="dark" className="additems" onClick={addHandler}>
            Add Item</Button> */}
                {loading? <div class="loader"></div> :''}
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                    {
                    items.map((item)=>{
                        return(
                            <CSSTransition key={item._id} timeout={500} classNames="fade">
                                <ListGroupItem >
                                    <div>         
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

// const FormInput = ({handleSubmit,handleChange ,name})=>{
//     return(
//         <form onSubmit={handleSubmit}>
//                 <input type="text" required name='name' placeholder="Item Name" onChange={handleChange} value={name.name}></input>
//         </form>
//     )
// }

export default ShoppingList