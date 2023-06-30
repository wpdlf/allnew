import React from 'react';
import Hello from './Hello';
import Wrapper from './Wrapper';
// import './App.css';

// function App() {
//   const name = 'Jiwon';
//   const style = {
//     backgroundColor : "green",
//     color : 'aqua',
//     fonsSize : 24,
//     padding : '1rem'
//   }
//   return (
//       <div>
//         <Hello />
//         <hr />
//         <div style={style}>{name}</div>
//         <div className="green-box"></div>
//       </div>
//     )
// }

function App() {
  return (
      <Wrapper>
      <Hello name="React" color="green" />
      <Hello color="hotpink" />
      </Wrapper>
    )
}

export default App;