import { useEffect, useRef, useState } from 'react';
import './App.css';
import humanIcon from './public/Images/Human.png'
import robotIcon from './public/Images/Robot.png'
import axios from 'axios'

const YOU = 'you'
const AI = 'ai'

function App() {
  
  const inputRef = useRef()
  const [qna, setQna] = useState([
    {from: YOU, value:"From Me"},
    {from: AI, value:["1. Message From AI", "2  Message From AI"]},
    {from: YOU, value:["1. Message From Human", "2  Message From Human"]},
  ])
  const updateQna = (from, value)=>{
    setQna((qna)=>[...qna, { from, value }])
  }
  // useEffect(()=>{
  //   console.log(typeof(qna))
  // })

  const handleSubmit = ()=>{
    const question = inputRef.current.value
    updateQna(YOU, question)
    // setQna(qna.concat({ from: YOU, value: question }));
    axios.post('http://localhost:6060/chat',{
      question,
    }).then((response)=>{
      console.log(response.data.answer)
      updateQna(AI, response.data.answer)
    })
  }

  const renderChat=(qna)=>{
    const value = qna.value
    if(Array.isArray(value)){
      return (value.map(v=>v))
    }
    return(value)
  }
  return (
    <div className="App">
      <div className='main'>
        {
          qna.map((qna)=>{
            if (qna.from === YOU){
              return(
                <div className='image-div'>
                  <img src={humanIcon} width={70} height={70} alt='human' className='human-avtar'/>
                  <p className='human-text'>{renderChat(qna)}</p>
                </div>
              )
            }
            return(
              <div className='robot-div'>
                <img src={robotIcon} width={70} height={70} alt='chatAI' className='robot-avtar'/>
                <p className='ai-text'>{renderChat(qna)}</p>
              </div>
            )
          })
        }
      </div>
      <div className='inputBox'>
        <input className="inputField" ref={inputRef} required></input>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;