import React from "react"

class ClassRefExample extends React.Component{
  myRef = React.createRef()
  click = () => {
    this.myRef.current.style = "color: red";
  }
  render() {
    return(
      <div>
        <button onClick={this.click}>click</button>
        <p ref={this.myRef}>текст</p>
      </div>
    )
  }
}
export default ClassRefExample;