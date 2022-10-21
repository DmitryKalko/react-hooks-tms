import { useRef } from "react"

const FuncRefExample = () => {
  const element = useRef()
  const click = () => {
    element.current.style = 'color:blue';

  }
    return(
      <>
      <button onClick={click}>click</button>
      <h1 ref={element}>text</h1>
      </>
    )
  }
export default FuncRefExample;