import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Buttopn from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';



class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) =>{
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Alejandro G-G',
        address: {
          street: 'Mi calle 1',
          zipCode: '123121',
          country: 'Spain'
        },
        email: 'asda@asdas.com',
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => this.props.history.push('/'))
      .catch(err => console.log(err))
      .finally(()=>{
        this.setState({loading: false});
      });
  }

  render(){

    let form = (
      <form>
      <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
      <input className={classes.Input} type="email" name="email" placeholder="Your Mail"/>
      <input className={classes.Input} type="text" name="street" placeholder="Street"/>
      <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
      <Buttopn btnType="Success" clicked={this.orderHandler}>ORDER</Buttopn>
      </form>
    );

    if (this.state.loading){
      form = <Spinner></Spinner>
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;