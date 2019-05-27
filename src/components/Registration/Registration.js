import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Registration.css'

class Registration extends Component {
    state = {
        player1: '',
        player2: ''
    }

    changeHandler = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    submitHandler = event => {
        if(this.state.player1 && this.state.player2) {
            this.props.registerHandler(this.state.player1, this.state.player2);
        }
        event.preventDefault();
    }

    render() {
        return (<>
            <h4>Game of Drones</h4>
            <form onSubmit={this.submitHandler} className='form'>
                <div>
                    <span className='label'>Player 1</span>
                    <input
                        name='player1'
                        type="text"
                        value={this.state.player1}
                        placeholder='enter your name'
                        onChange={this.changeHandler}
                    />
                    <span></span>
                </div>
                <div>
                    <span className='label'>Player 2</span>
                    <input
                        name='player2'
                        type="text"
                        value={this.state.player2}
                        placeholder='enter your name'
                        onChange={this.changeHandler}
                    />
                    <span></span>
                </div>
                <div className='start'>
                    <button
                        type='submit'
                        value='Submit'>
                        Start Game
                    </button>
                </div>
            </form>
        </>)
    }
}

Registration.propTypes = {
    registerHandler: PropTypes.func.isRequired
}

export default Registration;
