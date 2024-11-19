import { createContext, useReducer, useContext } from "react";

// Initial State
const initialState = null;

// Reducer Function
const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    case "UPDATE":
      const updatedState = {
        ...state,
        followers: action.payload.followers, 
        following: action.payload.following
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

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

