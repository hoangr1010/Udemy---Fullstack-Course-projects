function reducer(state, action) {
    switch (action.type) {
        case ('clearCard'):
            return {...state, cart: []}
        case ('increase'):
            let newCart = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, amount: item.amount + 1}
                }
                return item
            })
            return {...state,cart: newCart}
        case ('decrease'):
            let newlist = state.cart.map(item => {
                if (item.id === action.payload.id) {
                    return {...item, amount: item.amount - 1}
                } 
                return item 
            }).filter(item => item.amount !== 0)
            return {...state,cart: newlist}
        case ('removeItem'):
            let removeArray = state.cart.filter(item => item.id !== action.payload.id)
            return {...state,cart: removeArray}
        case ('sumUp'):
            let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
                const price = cartItem.price
                const amount = cartItem.amount

                cartTotal.total += Math.round(price * amount)
                cartTotal.amount += amount

                return cartTotal
            }, {
                total: 0,
                amount: 0
            })
            
            return ({...state, total: total, amount: amount})

    }
}

export default reducer