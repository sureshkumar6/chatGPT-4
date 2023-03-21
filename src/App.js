import './App.css';

import humanIcon from './public/Images/Human.png'
import robotIcon from './public/Images/Robot.png'
function App() {
  return (
    <div className="App">
      <div className='main'>
        <div className='image-div'>
          <img src={humanIcon} width={70} height={70} alt='human' className='human-avtar'/>
          <p className='human-text'>Hi ChatGPT</p>
        </div>
        <div className='robot-div'>
          <img src={robotIcon} width={70} height={70} alt='chatAI' className='robot-avtar'/>
          <p className='ai-text'>Hello Human</p>
        </div>
      </div>
      <div className='inputBox'>
        <input className="inputField" required></input>
        <button>Submit</button>
      </div>
    </div>
  );
}

export default App;
