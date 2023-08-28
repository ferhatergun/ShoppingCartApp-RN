import { createSlice } from "@reduxjs/toolkit";

const BasketSlice = createSlice({
    name:"basket",
    initialState:{
        basket:[]
    },
    reducers:{
        addBasket:(state,action)=>{
            const productId = action.payload.id
            const existingProduct = state.basket.find(item=>item.product.id==productId) 
            // aynısında varsa ürünün kendisi gelir yoksa false gelir
            if(!existingProduct){
                state.basket.push({product:action.payload,pcs:1})
                console.log("sepete eklendi")
            }
            else{
                existingProduct.pcs +=1
                console.log("adeti arttırıldı")
            }
        }, // removeProcutd,removeAll
        increase:(state,action)=>{
            productId = action.payload.id
            const existingProduct = state.basket.find(item=>item.product.id==productId)
            existingProduct.pcs +=1
        },
        decrease:(state,action)=>{
            productId = action.payload.id
            const existingProduct = state.basket.find(item=>item.product.id==productId)
            if(existingProduct.pcs>1){
                existingProduct.pcs -=1
            }
        },
        removeProduct:(state,action)=>{
            const productId = action.payload.id
            const existingProduct = state.basket.filter(item=>item.product.id!==productId)
            state.basket= existingProduct
        },
        removeAll:(state)=>{
            state.basket=[]
        },
        updateBasket:(state,action) =>{
            state.basket = action.payload
        }

    }
})

export const {addBasket , increase ,decrease, removeProduct,removeAll ,updateBasket}=BasketSlice.actions

export default BasketSlice.reducer