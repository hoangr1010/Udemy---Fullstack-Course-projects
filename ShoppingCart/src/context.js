import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-useReducer-cart-project'
const AppContext = React.createContext()

const InitialState = {
  loading: false,
  cart: cartItems,
  total: 0,
  amount: 0
}

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, InitialState)

  function clearCart() {
    dispatch({ type: 'clearCard' })
    console.log(state)
  }

  function removeItem(id) {
    dispatch({ type: 'removeItem', payload: { id: id } })
  }

  function increase(id) {
    dispatch({ type: 'increase', payload: { id: id } })
  }

  function decrease(id) {
    dispatch({ type: 'decrease', payload: { id: id } }) 
  }

  useEffect(() => {
    dispatch({ type: 'sumUp' })
  }, [state])

  async function fetchData() {
    dispatch({ type: 'loading' })
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({ type: 'display', payload: cart })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
  <AppContext.Provider value={{
    ...state,
    clearCart,
    increase, 
    decrease,
    removeItem,
  }}>
    {children}
  </AppContext.Provider>
  )

}
// make sure use
export function useGlobalContext() { 
  return useContext(AppContext) 
}

export { AppContext, AppProvider }
