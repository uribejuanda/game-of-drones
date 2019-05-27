import React from 'react';
import Registration from '../components/Registration/Registration';
import Battle from '../components/Battle/Battle';
import Result from '../components/Result/Result';

import { connect } from 'react-redux'
import { registerNames, playAgain } from '../actions/actions'
import './App.css'

const App = (props) => {
  const { registerNames, playAgain } = props
  const { step, absoluteWinner } = props.gameState;


  const getStepActive = () => {
    switch (step) {
      case 0:
        return <Registration registerHandler={registerNames}/>
      case 1:
        return <Battle/>
      case 2:
        return <Result playAgainHandler={playAgain} absoluteWinner={absoluteWinner}/>
    }
  }

  return (
      <main className='main'>
          <div>{getStepActive()}</div>
      </main>
  )
}

const mapStateToProps = state => ({
  gameState: state.game
})

const mapDispatchToProps = dispatch => ({
  playAgain: (step) => dispatch(playAgain(step)),
  registerNames: (player1, player2) => dispatch(registerNames(player1, player2))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
