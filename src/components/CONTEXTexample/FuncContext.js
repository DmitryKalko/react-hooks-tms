import React, {useContext} from "react"
const myContext = React.createContext('light')

const FuncContext = () => {
  return(
    <myContext.Provider value='dark'>
      <Second />
    </myContext.Provider>
  )
}
export default FuncContext;


const Second = () => {
  const theme = useContext(myContext)
  console.log(theme);
  return(
    <div theme={theme}>
    </div>
  )
}