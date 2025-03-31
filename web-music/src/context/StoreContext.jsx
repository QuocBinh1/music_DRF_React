import { createContext } from "react";
import { songsData } from "../assets/assets";
export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

  const contextValue = {
    songsData
  }
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;