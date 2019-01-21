import {createStore} from 'redux'

let initialState = {
   
}

let reducer = (state, action) => {

    switch(action.type){

        case 'generateDeck':
            return {
                ...state,
                newDeck: action.payload,
            }

        case 'updateDeck':
            return {
                ...state,
                currentDeck: action.payload
            }

        case 'updateCard':
            return {
                ...state,
                currentCard: action.payload
            }    

        default:
            return state
    }
    
}

const store = createStore(reducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;