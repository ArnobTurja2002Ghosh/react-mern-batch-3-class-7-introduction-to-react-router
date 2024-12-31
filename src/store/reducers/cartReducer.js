export const cartReducer =(state=[], action)=>{
    switch(action.type){
        case "cart/addToCart":{
            console.log(state);
            const product = state.find((item)=>item.name===action.payload.name);
            return product? [...state]:[{...action.payload}, ...state]
        }
        case "cart/removeFromCart":{
            return state.filter((item)=>item.name!=action.payload.name);
        }
        default:{
            return state;
        }
    }
}