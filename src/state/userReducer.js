import {LOGIN_SUCCESS, LOGOUT_USER, SEND_MESSAGE} from './actions'

const itemReducer = (state = {user: {}, messages:[]}, action ) => {
    switch(action.type){
        case LOGIN_SUCCESS:
            let userNew = action.payload;
            let mes = [];
            let newMsg = localStorage.getItem(`msg_${userNew.name}`) === null ? "" : localStorage.getItem(`msg_${action.payload.name}`)
            if(!(newMsg.length === 1 && newMsg[0] === "")){
                mes =  newMsg.split(",");
            }
            else
                 mes.shift();
            console.log("length",mes.length);
            console.log("first",mes[0]);
            return {
                ...state,
                user: action.payload,
                messages: mes
            }
        case LOGOUT_USER:
            return{
                ...state,
                user:{},
                messages:[]
            }
        case SEND_MESSAGE:
            let messages = [...state.messages, action.payload];
            localStorage.setItem(`msg_${state.user.name}`,messages);
            return{
                ...state,
                messages: [...state.messages, action.payload]
            }
        default:
            return state
    }
}

export default itemReducer