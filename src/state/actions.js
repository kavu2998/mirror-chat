import axios from "axios";
export const LOGOUT_USER = 'LOGOUT_USER'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const SEND_MESSAGE = 'SEND_MESSAGE'

export const loginSuccess = (user) => ({
    type : LOGIN_SUCCESS, 
    payload: user
})

export const logoutUser = (user) => ({
    type : LOGOUT_USER
})

export const sendMessage = (message) => ({
    type: SEND_MESSAGE,
    payload:message
})

export const sendMessageHandler = (message) => {
    return function(dispatch){
        dispatch(sendMessage(message));
    }
}    

export const postLoginUser = (response) => {
    return function(dispatch){
        axios.post("http://localhost:5000/user/googleLogin", { tokenId: response.tokenId })
        .then(data => {
             dispatch(loginSuccess(data.data.user));
      })
      .catch(error => console.log(error))
    }
}

export const logOut = () => {
    return function(dispatch){
        dispatch(logoutUser());
    }
}
