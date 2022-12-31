let initialState = 0;

const addcartReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'ADD_CART' : return state + 1;
        default : return state;
    }
}

export default addcartReducer;