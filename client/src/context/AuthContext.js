import { createContext, useReducer,} from "react";
import {useEffect} from "react"
const   INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null, // its gonna check our localstorage if there is user or null
    loading: false ,
    error: null
    
};


export const AuthContext = createContext(INITIAL_STATE)

const authReducer = (state, action) =>{
switch(action.type){
    case "LOGIN_START":
        return {
            user: null,
         loading: true,
            error: null
        };
        case "LOGIN_SUCCESS":
        return {
            user: action.payload,
         loading: false,
            error: null
        };

        case "LOGIN_FAILURE ":
        return {
            user: null,
         loading: false,
            error: action.payload
        };

        case "LOGOUT ":
        return {
            user: null,
         loading: false,
            error: null
        };

        default:
        
        return  state; 

}
}



export const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(authReducer, INITIAL_STATE)

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.user))   /// storign user info in local storage so that when we refresh our app it lose data
    
    }, [state.user])

    

    return (
        <AuthContext.Provider 
        value={
            {user: state.user, 
             loading: state.loading, 
            error: state.error , dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}