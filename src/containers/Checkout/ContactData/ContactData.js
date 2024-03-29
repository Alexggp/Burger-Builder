import React, { Component } from 'react';

import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Input from '../../../components/UI/Input/Input';


class ContactData extends Component {
  state = {
    orderForm:{
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        validation: {},
        value: 'fastest',
        valid: true
      }
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (event) =>{
    event.preventDefault();
    this.setState({loading: true});
    const formData = {};
    for (let fromElemId in this.state.orderForm){
      formData[fromElemId] = this.state.orderForm[fromElemId].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
      .then(response => this.props.history.push('/'))
      .catch(err => console.log(err))
      .finally(()=>{
        this.setState({loading: false});
      });
  }

  checkValidity(value, rules){
    let isValid = true;

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if(rules.minLength){
      isValid = value.length >= rules.minLength && isValid;
    }

    if(rules.maxLength){
      isValid = value.length <= rules.maxLength && isValid;
    }


    return isValid
  }

  inputChangedHandler = (event, inputIdentifier)=>{
    const updatedOrderForm = {
      ...this.state.orderForm
    }
    const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    
    let formIsValid = true;
    for (let inputId in updatedOrderForm){
      
      formIsValid = updatedOrderForm[inputId].valid && formIsValid
      
    }
    
    this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }

  render(){

    let formElementArray = [];
    for (let key in this.state.orderForm){
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
      {formElementArray.map(formEelemnt=>(
        <Input 
          key = {formEelemnt.id}
          elementtype={formEelemnt.config.elementType} 
          elementconfig={formEelemnt.config.elementConfig} 
          value={formEelemnt.config.value}
          invalid={!formEelemnt.config.valid}
          touched={formEelemnt.config.touched}
          changed={(event)=>this.inputChangedHandler(event, formEelemnt.id)}/>
      ))}
      <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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