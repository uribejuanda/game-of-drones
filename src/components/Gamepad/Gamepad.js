import React from 'react';
import PropTypes from 'prop-types'
import './Gamepad.css'

const Gamepad = (props) => {

    return (
        <section className='gamepad'>
            <h3>Round {props.round}</h3>
            <h4>It's your turn {props.currentPlayer}</h4>
            <div className='controls'>
                <div onClick={() => props.confirmSelection('rock')} className='control rock'>
                    <span>Rock</span>
                    <div className='img'/>
                </div>
                <div onClick={() => props.confirmSelection('paper')} className='control paper'>
                    <span>Paper</span>
                    <div className='img'/>
                </div>
                <div onClick={() => props.confirmSelection('scissor')} className='control scissor'>
                    <span>Scissor</span>
                    <div className='img'/>
                </div>
            </div>
        </section>
    )
}

Gamepad.propTypes = {
    round: PropTypes.number.isRequired,
    currentPlayer: PropTypes.string.isRequired,
    confirmSelection: PropTypes.func.isRequired
}

export default Gamepad
