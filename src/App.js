import React, { Component } from 'react';
import { connect } from 'react-redux';
import Buttons from './components/Buttons'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    //bind functions here
    this.generateDeck = this.generateDeck.bind(this)
  }

  //create a new deck
  generateDeck() {
    let suit = ["D", "S", "C", "H"]
    let value = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let deck = []

    //each suit goes through all values, creating 52 cards
    for (let i = 0; i < suit.length; i++) {
      for (let k = 0; k < value.length; k++) {
        let card = `${value[k]}${suit[i]}`

        //Turns out that if any request is made containing the words 'ad' 'advert' 'click'.. in the URL, AdBlocker will automatically block it. This is a quick way around it.
        if (card === 'AD') {
          card = 'AceD'
        }

        //add cards to deck
        deck.push(card)
      }
    }
    //send a clean deck to the store
    this.props.dispatch({
      type: "generateDeck",
      payload: deck
    })
  }

  //We'll need the deck to be automatically generated when the site loads
  componentDidMount() {
    this.generateDeck()
  }

  render() {
    return (
      <div className="App">
        <div className='title'>Shuffle and Deal</div>

        <div className='card-container'>
          {/* if a card has been dealt, the store will have its info which will then be rendered here */}
          {this.props.currentCard !== '/images/undefined.jpg' && <div className='card'>
            <img src={this.props.currentCard} className='img' height='500px' alt='currentCard' />
          </div>}

          <div className='card'>
            <img src='/images/back.jpg' className='img' height='500px' alt='card' />
          </div> 
        </div>

        <Buttons />
      </div>
    );
  }
}

//import props
let mapStateToProps = state => {
  return {
    currentCard: `/images/${state.currentCard}.jpg`
  }
}

let connectedApp = connect(mapStateToProps)(App)

export default connectedApp;

// Simulate a playoffs' output following the next conditions:
// - Division East and West follow this structure
// https://s3.amazonaws.com/cortex-cerebro/playoff_structure.jpg
// - Each division have 8 teams
// - Each team have 21 players
// - Each player has a fixed success rating ranging from 0.15 to 1 (at random)
// - Based on a team's players success rating precalculate the average success rating for each teams

// - Based on the team success rating, calculate the tournament output on each division simulating
//   !!! only 1 match per teams match-up !!!
//   if Team 1 has a 0.56 rating and Team 2 has a 0.76 rating. Team 2 has 0.20 more chances to win the match.
// - Based on the winning team of each division output the winner between the 2 division
// - Use object-oriented programming

// Evaluation criteria: Rapidity of execution, Algorithms' optimization
// Use this page to complete the test
