import React, { Component } from "react";
import {randomWord} from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //Restart Button 
  restart() {
     this.setState({
         nWrong : 0,
         guessed : new Set(),
         answer : randomWord()
     });
  } 


  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    console.log(ltr);
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

    

   handleKeyPress(evt){
     let alpha = "abcdefghijklmnopqrstuvwxyz";
     let ltr = alpha[evt.which-65];
     console.log(ltr);
     console.log(evt.which);
     this.setState(st => ({
       guessed: st.guessed.add(ltr),
       nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
     }));
 }




  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr,i) => (
      <button
        key={i} 
        tabIndex={i}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    
    const altText = `${this.state.nWrong}/${this.props.maxWrong} guesses;`
    const isWinner = this.guessedWord().join("") === this.state.answer;
    const gameOver =  this.state.nWrong >= this.props.maxWrong;
    let gameState = this.generateButtons();
    if(isWinner) gameState = 'You Win...!!';
    if(gameOver) gameState = 'You Lose...!!';
    
    return (
      
      <div className = "Background">
      <div className='Hangman'>
      
          <h1>Hangman</h1>
          
          <img src={this.props.images[this.state.nWrong]} alt={altText} />
          
          <p>Guessed Wrong : {this.state.nWrong}/{this.props.maxWrong}</p>
          
          <p className='Hangman-word'>
            {
              !gameOver ? this.guessedWord() : this.state.answer
            }
          </p>
          
          <p className='Hangman-btns'>
            {
              gameState 
            } 
          </p>
          
          <button id = "reset" onClick = {this.restart}>Restart</button>

      </div>
      </div>
    );
  }
}

export default Hangman;
