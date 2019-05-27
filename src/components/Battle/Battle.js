import React from 'react';
import { connect } from 'react-redux';
import { addBattleWinner, addAbsoluteWinner, changeTurnAndSetChoice } from '../../actions/actions';
import Scoreboard from '../Scoreboard/Scoreboard';
import Gamepad from '../Gamepad/Gamepad';
import constants from '../../constants'

const Battle = (props) => {
    const { addBattleWinner, addAbsoluteWinner, changeTurnAndSetChoice } = props;
    const { players, currentTurn, winnerBattles } = props.gameState

    const confirmSelection = (choice) => {
        players[currentTurn].selection = choice
        isPendingTurn() ? changeTurn() : process()
    }

    const isPendingTurn = () => {
        if(currentTurn == 0) {
            return true;
        } else {
            return false;
        }
    }

    const changeTurn = () => {
        // Here is calling the action
        changeTurnAndSetChoice(players)
    }

    const process = () => {
        const result = determineWinner(players)
        // Here is calling the action
        addBattleWinner(result)
    }

    const determineWinner = (players) => {
        const player1 = players[0]
        const player2 = players[1]
        if(player1.selection === player2.selection) {
            return constants.TIE;
        } else if(player1.selection === constants.ROCK) {
            if(player2.selection === constants.PAPER) {
                return player2.name;
            } else if(player2.selection === constants.SCISSOR) {
                return player1.name
            }
        } else if(player1.selection === constants.PAPER) {
            if(player2.selection === constants.ROCK) {
                return player1.name
            } else if(player2.selection === constants.SCISSOR) {
                return player2.name
            }
        } else if(player1.selection === constants.SCISSOR) {
            if(player2.selection === constants.ROCK) {
                return player2.name
            } else if(player2.selection === constants.PAPER) {
                return player1.name
            }
        }
    }

    const existChampion = () => {
        const result = winnerBattles.reduce((accumulator, currentValue) => {
            if(currentValue !== constants.TIE){
                accumulator[currentValue] = ++accumulator[currentValue] || 1
            }
            return accumulator
        }, {});

        for (let key in result) {
            if(result[key] === constants.MAX_VICTORIES_TO_WIN) {
                return key
            }
        }
        return null
    }

    const init = () => {
        const absWinner = existChampion()
        if(absWinner) {
            // Here is calling the action
            addAbsoluteWinner(absWinner)
        }
    }

    init();

    return (<>
        <Gamepad
            round={winnerBattles.length + 1}
            currentPlayer={players[currentTurn].name}
            confirmSelection={confirmSelection}
        />
        <Scoreboard winnerBattles={winnerBattles}></Scoreboard>
    </>)
}

const mapStateToProps = state => ({
    gameState: state.game
})

const mapDispatchToProps = dispatch => ({
    addBattleWinner: (winner) => dispatch(addBattleWinner(winner)),
    addAbsoluteWinner: (absWinner) => dispatch(addAbsoluteWinner(absWinner)),
    changeTurnAndSetChoice: (choice) => dispatch(changeTurnAndSetChoice(choice))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Battle)
