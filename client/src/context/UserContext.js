import { createContext, useReducer, useContext } from "react";

// Initial State
const initialState = null;

// Reducer Function
const userReducer = (state, action) => {
  let updatedState = {}
  switch (action.type) {
    case "LOGIN":
      updatedState = {
        ...action.payload
      }
      localStorage.setItem("user", JSON.stringify(updatedState))
      return updatedState
    case "LOGOUT":
      localStorage.clear()
      return null;
    case "UPDATE":
      updatedState = {
        ...state,
        followers: action.payload.followers, 
        following: action.payload.following
      }
      localStorage.setItem("user", JSON.stringify(updatedState))
      return updatedState
    case "UPDATE_PIC":
      console.log(action.payload)
      updatedState = {
        ...state,
        pic: action.payload
      }
      console.log(updatedState)
      localStorage.setItem("user", JSON.stringify(updatedState))
      return updatedState
    default:
      return state;
  }
};

// Create User Context
const UserContext = createContext();

// Custom Hook for User Context
export const useUser = () => useContext(UserContext);

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

