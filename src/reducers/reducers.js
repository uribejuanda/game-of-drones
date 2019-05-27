import { combineReducers } from 'redux'
import {
    SET_NAMES,
    ADD_BATTLE_WINNER,
    ADD_ABSOLUTE_WINNER,
    PLAY_AGAIN,
    CHANGE_TURN,
    SET_CHOICE
} from '../actions/actions'

const initialGameState = {
    players: [],
    winnerBattles: [],
    step: 0,
    absoluteWinner: null,
    currentTurn: 0,
}
const game = (state = initialGameState, action) => {
    switch (action.type) {
        case SET_NAMES:
            const newPlayer1 = {
                name: action.player1,
                selection: null
            }
            const newPlayer2 = {
                name: action.player2,
                selection: null
            }
            return {
                ...state,
                players: [newPlayer1, newPlayer2],
                step: 1
            }
        case ADD_BATTLE_WINNER:
            return {
                ...state,
                winnerBattles: [...state.winnerBattles, action.payload]
            }
        case ADD_ABSOLUTE_WINNER:
            return {
                ...state,
                absoluteWinner: action.payload,
                step: 2
            }
        case CHANGE_TURN:
            const turn = state.currentTurn == 0 ? 1 : 0
            return {
                ... state,
                currentTurn: turn
            }
        case SET_CHOICE:
            return {
                ... state,
                players: [...action.payload]
            }
        case PLAY_AGAIN:
            return {
                ... initialGameState,
                step: 0
            }
        default:
            return state
    }
}

const gameOfDronesApp = combineReducers({ game })

export default gameOfDronesApp
