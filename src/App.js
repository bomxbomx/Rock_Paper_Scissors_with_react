import React, { Component } from 'react'
import start from './images/start.png'
import gif from './images/gif.gif'

const WhoIsBig = (First,Second)=>{
  if(First === Second){
    return "Tie";
  }
  switch(First){
    case "Rock":
      if(Second === "Scissors"){
        return First;
      }else {
        return Second;
      }
    case "Paper":
      if(Second === "Rock"){
        return First;
      }else{
        return Second;
      } 
    case "Scissors":
      if(Second ==="Papper"){
        return First;
      }else{ 
      return Second;
      }
    default:     
  }
}

export default class App extends Component {
  state = {
    Started: false,
    Player: null,
    Computer: null,
    Name: ""
  };
  render() {
    const {Started,Player,Computer,Name}=this.state;
    const Images={
      Rock:"https://rock-paper-scissors-lilac-alpha.vercel.app/static/media/rock.png",
      Paper:"https://rock-paper-scissors-lilac-alpha.vercel.app/static/media/paper.png",
      Scissors:"https://rock-paper-scissors-lilac-alpha.vercel.app/static/media/scissors.png"
  };
    return (
      <div className='App'>
          <h1>Rock Paper Scissors</h1>
          {Started ?(
            <div className='game'>
              <div className={"player"+ (Player? " selected":"")}>
                <p>Player</p>
                {Player? (
                <img src={Images[Player]} alt={Player}></img>
                ) : (
                  <div className='choose'>
                  {Object.keys(Images).map((a)=>(
                    <span key={a} onClick={()=>{
                      this.setState({
                        Player:a,
                        Computer: Object.keys(Images)[Math.floor(Math.random() * Object.keys(Images).length)]
                      });
                    }}>
                      <img src={Images[a]} alt={a}></img>
                      {a}
                  </span> 
                  ))}     
                </div>
                )}
              </div>
              <div className='computer'>
                <p>Computer</p> 
                {Computer? (<img src={Images[Computer]} alt={Computer}></img>):(
                  <img src={gif} alt=''></img>
                )}
              </div>
            </div>
          ):(   
              <div className='Intro'>
                <input type='text' placeholder='Enter Your Name, At least 3 characters' value={Name} onChange={(e)=>{
                  this.setState({Name:e.target.value});
                }}></input>
                {
                  Name.trim().length>2 && (
                    <img src={start} className='start' alt='Start' onClick={()=>{this.setState({
                      Started: true
                    });
                    }}/>
                  ) 
                }
              </div>   
          )}
        {/* <pre>{JSON.stringify(this.state, null, 2)}</pre> */}
        {Player && Computer && 
        <p className='Results'>
          {(()=>{
            const Winner  = WhoIsBig(Player, Computer);
            if (Winner === "Tie"){
              return "Nobody Win!"
            }else{
              if(Winner === Player){
                return Name +" Win!";
              }else{
                return "Computer Win!";
              }
            }
          })()}
          <img src='https://cdn-icons-png.flaticon.com/128/724/724858.png' alt='Restart' onClick={()=>{
            this.setState({
              Started: false,
              Player: null,
              Computer: null
            })
          }}></img>
        </p>}
      </div>
    );
  }
}
