import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(eachItem => eachItem.id === product.id)

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (productObject.id === eachItem.id) {
            const updateQuantity = eachItem.quantity + product.quantity
            return {...eachItem, quantity: updateQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      const updateCartList = [...cartList, product]
      this.setState({cartList: updateCartList})
    }
    //   TODO: Update the code here to implement addCartItem
  }
  removeCartItem = id => {
    const {cartList} = this.state
    const updateList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updateList})
  }
  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachItem => {
        if (id === eachItem.id) {
          const updateQuantity = eachItem.quantity + 1
          return {...eachItem, quantity: updateQuantity}
        }
        return eachItem
      }),
    }))
  }
  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObjectCount = cartList.find(eachItem => eachItem.id === id)

    if (productObjectCount.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachItem => {
          if (id === eachItem.id) {
            const updateCartList = eachItem.quantity - 1
            return {...eachItem, quantity: updateCartList}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
