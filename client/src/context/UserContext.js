/**
 * @fileoverview UserContext
 * @description creates a global state for the logged in user and defines a dispatch function to update it in other files
 */

import { createContext, useReducer, useContext } from "react";

// Initial State
const initialState = null;

/**
 * @function userReducer
 * @description Updates the global user state through action.payload, and updates local storage to match it
 * @param {*} state The current user state
 * @param {*} action The type of update to be done
 * @returns the updated state
 */
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
      localStorage.removeItem("user")
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
      updatedState = {
        ...state,
        pic: action.payload
      }
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

/**
 * @function UserProvider
 * 
 * @description 
 * Provides a context for managing user state throughout the application. 
 * It initializes the user state using local storage or a default state, 
 * and provides a `dispatch` function for updating the state via a reducer.
 * 
 * @param {Object} props - React component props.
 * @param {React.ReactNode} props.children - Child components that will have access to the user context.
 * 
 * @returns {JSX.Element} A context provider wrapping its children.
 */
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, JSON.parse(localStorage.getItem("user")) || initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

