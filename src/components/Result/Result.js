import React from 'react';
import PropTypes from 'prop-types'
import HighScores from '../HighScores/HighScores';
import './Results.css'

const Result = (props) => {
    const { playAgainHandler, absoluteWinner } = props;

    return (
        <section className='result'>
            <h2 className='message'>We have a WINNER!!</h2>
            <h2 className='winner'>{absoluteWinner} is the new EMPEROR!</h2>
            <button className='playAgain' onClick={playAgainHandler}>Play Again</button>
            <HighScores/>
        </section>
    )
}

Result.propTypes = {
    absoluteWinner: PropTypes.string.isRequired,
    playAgainHandler: PropTypes.func.isRequired
}

export default Result
