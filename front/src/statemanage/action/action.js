export const incAction = (id) => {
    alert('Product is added');
    return {
        type : 'ADD_CART',
        payload : id
    }
}