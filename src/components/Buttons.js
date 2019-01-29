import React, { Component } from 'react';
import { connect } from 'react-redux';

class Buttons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            started: false
        }
        //bindings
        this.shuffle = this.shuffle.bind(this)
        this.dealOneCard = this.dealOneCard.bind(this)
        this.startGame = this.startGame.bind(this)
    }

    //shuffle the deck randomly
    shuffle() {
        //first we want to remove the card that was previously dealt
        this.props.dispatch({
            type: "updateCard",
            payload: undefined
        })

        //now we import a clean deck and copy it to a new array
        let deck = [...this.props.newDeck]

        //here the cards are shuffled randomly
        for (let i = 0; i < 52; i++) {
            let pos1 = Math.floor(Math.random() * deck.length)
            let pos2 = Math.floor(Math.random() * deck.length)
            let hold = deck[pos1]

            deck[pos1] = deck[pos2]
            deck[pos2] = hold
        }
        //then the shuffled deck is sent to the state for dealing
        this.setState({ cards: deck })
    }

    //deal the card at the top of the deck
    dealOneCard() {
        //first we want to save the deck in state to another variable so we can modify it
        let currentCards = [...this.state.cards]
        //then we use .pop in order to remove the card on the deck as well as return it for rendering
        let card = currentCards.pop()
        //now we update the deck in the state with the top card removed so that no same card is dealt twice
        this.setState({
            cards: currentCards
        })
        //here we send the dealt card up to the store so that it can be rendered in app.js
        this.props.dispatch({
            type: "updateCard",
            payload: card
        })
    }

    //automatically shuffles the deck once the game is started
    startGame() {
        this.shuffle()
        this.setState({ started: true })
    }

    render() {
        if (!this.state.started) {
            return (
                <div className='btn-container'>
                    <button className='btn' onClick={this.startGame}>Start</button>
                </div>
            )
        } else {
            return (
                <div>
                    <div className='btn-container'>
                        <button className='btn' id='shuffle' onClick={this.shuffle}>Shuffle Deck</button>
                        <button className='btn' onClick={this.dealOneCard}>Deal Card</button>
                    </div>
                    <div>
                        {this.state.cards.length === 0 && <div className='message'> All Cards Have Been Dealt! Reshuffle And Try Again </div>}
                    </div>
                </div>
            )
        }
    }
}

let mapStateToProps = state => {
    return {
        newDeck: state.newDeck
    }
}

let connectedButtons = connect(mapStateToProps)(Buttons)

export default connectedButtons