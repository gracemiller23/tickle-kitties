import React, { Component } from 'react';
import './App.css';
import ImageCard from "./components/imagecard";
import kitties from "./kitties.json";

const giphyDiv = {
 width:200,
 height:200,
 position:"relative"
}

const giphyIframe ={
  width:"100%", height:"100%", position:"absolute"
}

const jumboStyle={
  color: "#e8a4c2",
  backgroundColor: "white"

}

const scoreBar={
  borderTop:"1px solid #e8a4c2",
  borderBottom:"1px solid #e8a4c2",
  padding:"2% 0",

}

const marginTopper={
  marginTop: "5%"
}

class App extends Component {
  state = {
    kitties: kitties,
    currentScore: 0,
    highScore: 0,
    tickledKitties: [],
    actionResponse: "A game for tickling kittens!"
  }

  //shuffles the kitties array after each click
  shuffleKitties(){
    let newKitties = kitties;
    for (let i = newKitties.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [newKitties[i], newKitties[j]] = [newKitties[j], newKitties[i]];
    }
    this.setState({kitties: newKitties});
  }

  //evaluates whether or not a kitty has been clicked before
  evaluateClick(id){
    if(this.state.tickledKitties.includes(id)){
      this.handleWrongClick(id);
    }else{
       
      this.handleCorrectClick(id);
    }

  }

  //if the kitty has NOT been clicked, the array is shuffled and the kitty is added to the tickledKitties array
  handleCorrectClick(id){

    //adds the tickled kitty's id to an array to store it as clicked
    let moreTickledKitties = this.state.tickledKitties;
        moreTickledKitties.push(id);
        this.updateScore();  

    
    if(this.state.tickledKitties.length < this.state.kitties.length){
        this.setState({actionResponse: "That was a good tickle!", tickledKitties: moreTickledKitties})
          this.shuffleKitties();
          console.log("regular correct guess");

    }else{
      console.log("for the win" + this.state.currentScore);
      this.endGame(id);
      alert("Booyahhhhhh! You win! You tickled those kitties real good.");
      
    }
  }

  //if the kitty has been clicked, a new message is displayed at the top of the screen, 
    //the high score is evaluated/stored, and the game starts over.
  handleWrongClick(id){
    this.setState({actionResponse: "That was a NOT a good tickle!"});
      alert("You tickled that kitty twice! Game over!");
    this.endGame(id);
  }

  endGame(id){
    console.log("end game" + this.state.currentScore);

    let freshTickledKitsArray = [];

    if(this.state.currentScore > this.state.highScore){
      this.newHighScore();
    }

    this.setState(
      { 
      tickledKitties: freshTickledKitsArray, 
      currentScore: 0,
      actionResponse: "A game for tickling kittens!"})
    this.shuffleKitties();
  }

  updateScore(){
    console.log("score updated");
    let newScore = this.state.currentScore + 1;
    this.setState({currentScore: newScore});
    console.log("after score updates newScore: " + newScore);

    console.log("after score updates: " + this.state.currentScore);
  }

  //sets new high score
  newHighScore(){
    let newHighScore1= this.state.currentScore;
    this.setState({highScore: newHighScore1})
  }

  render() {
    return (
      <div style={jumboStyle}>
      
 <div className="jumbotron jumbotron-fluid" style={jumboStyle} >
  <div className="container ">
  <div className="row justify-content-center align-items-center">
  
<div className="col-4 " style={giphyDiv}>

<iframe title="kitty"src="https://giphy.com/embed/3oeQdjkgpX03XVTqK9" frameBorder="0" className="giphy-embed" style={giphyIframe} allowFullScreen>
</iframe>

</div>
  <div className="col-8">
    <h1 className="display-4">Tickle Kitties!</h1>
    <p className="lead">Tickle/click as many kitties as you can without clicking the same one twice!</p>
    </div>
 
    </div>
  </div>
</div> 
<nav className="navbar navbar-light" style={scoreBar}>
      <div className="col-sm center">
            Tickle Kitties!
    </div>
          <div className="col-sm center">
            {this.state.actionResponse}
    </div>
          <div className="col-sm center">
            Good Tickles: {this.state.currentScore} | Your Top Score: {this.state.highScore}
    </div>
</nav>
      <div className="container" style={marginTopper}>
     
      <div className="row align-items-center">
      {this.state.kitties.map(kitty =>
          <ImageCard key={kitty.id} id={kitty.id} src={kitty.src} alt={kitty.alt} onClick={this.evaluateClick.bind(this)} />   
    )}

        </div>

      </div>
      </div>
    );
  }
}

export default App;
