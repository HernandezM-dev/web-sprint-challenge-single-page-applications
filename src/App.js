import React, {useState, useEffect} from "react";
import {Link, Route, Switch} from 'react-router-dom';
import axios from 'axios';
import * as yup from 'yup'
import Header from './Components/Header';
import Form from './Components/Form';
import Home from './Components/Home'
import Completed from './Components/Completed'

const initialFormValues = {
  //dropdown
  size: '',
  //selected radio button
  sauce: '',
  //checkboxes
  toppings: {
    pepperoni: false,
    sausage: false,
    canadian: false,
    italian: false,
    onions: false,
    peppers: false,
    tomatos: false,
    olives: false,
    garlic: false,
    artichoke: false,
    threecheese: false,
    pineapple: false,
    xcheese: false
  },
  //special instructions
  special: '',
}

const initialFormErrors = {
  name: 'test',
  size: 'test',
  sauce: 'test',
  toppings: 'test',
}
const initialPizza = []
const initialDisabled = true

export default function App(){
  const [pizza, setPizza] = useState(initialPizza)
  const [formValues, setFormValues] = useState(initialFormValues) 
  const [formErrors, setFormErrors] = useState(initialFormErrors) 
  const [disabled, setDisabled] = useState(initialDisabled)    

  const formSchema = yup.object().shape({
    name: yup.string().min(2, 'Name must be at least 2 characters'),
    special: yup.string(),
    sauce: yup.string().required(),
    size: yup.string().required()
    // checkbox: yup.boolean().oneOf([true], 'Please check checkbox')
    // sport: yup.string(),
    // wing: yup.string(),
    // four: yup.string()
})



  const inputChange = (name, value) => {

    yup
      .reach(formSchema, name)

      .validate(value)
      .then(valid => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })

      .catch(err => {
        console.log(name)
        debugger
        setFormErrors({
          ...formErrors,
          [name]: err
        })
      })

    setFormValues({
      ...formValues,
      [name]: value 
    })


  }

  const checkboxChange = (name, isChecked) => {
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: isChecked,
      }
    })
  }



  return (
    <div className='app'>
      <Header />
      {/* <Link to='/order'>Test</Link> */}
      <Switch>
      
        <Route path='/order'>
          <Form 
            values={formValues}
            inputChange={inputChange}
            checkboxChange={checkboxChange}
            // submit={submit}
            disabled={disabled}
            errors={formErrors}/>
        </Route>
        <Route path='/completed'>
          <Completed />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
