/*
 * action types
 */
import constants from '../constants';

export const SET_NAMES = 'SET_NAMES'
export const ADD_BATTLE_WINNER = 'ADD_BATTLE_WINNER'
export const ADD_ABSOLUTE_WINNER = 'ADD_ABSOLUTE_WINNER'
export const PLAY_AGAIN = 'PLAY_AGAIN'
export const CHANGE_TURN = 'CHANGE_TURN'
export const SET_CHOICE = 'SET_CHOICE'

/*
 * action creators
 */
export function setNames(player1, player2) {
    return {
        type: SET_NAMES,
        player1,
        player2
    }
}

/**
 * This first try to save the users entered then dispatch the action to set users to State
 * @param {string} player1
 * @param {string} player2
 * @return {function}
 */
export function registerNames(player1, player2) {
    return (dispatch) => {
        const savePlayer1 = fetch('/api/user', { ...constants.POST_REQUEST_OPTIONS, body: JSON.stringify({username: player1}) })
        const savePlayer2 = fetch('/api/user', { ...constants.POST_REQUEST_OPTIONS, body: JSON.stringify({username: player2}) })
        return Promise.all([savePlayer1, savePlayer2])
            .then(() => dispatch( setNames(player1, player2) ))
            .catch((reason) => console.log('Something wrong happend!', reason));
    }
}

/**
 * Dispatch two actions to set to State the battle winner and changer turn
 * @param {string} payload
 * @return {function}
 */
export function addBattleWinner(payload) {
    return (dispatch) => {
        dispatch({
            type: ADD_BATTLE_WINNER,
            payload
        })
        dispatch({
            type: CHANGE_TURN,
        })
    }
}

/**
 * Dispatch an action to set to State the step to zero and start the game again
 * @return {object}
 */
export function playAgain() {
    return {
        type: PLAY_AGAIN
    }
}

/**
 * Dispatch two actions to set to State the turn and players
 * @param {array} payload - The current players in the game
 * @return {function}
 */
export function changeTurnAndSetChoice(payload) {
    return (dispatch) => {
        dispatch({
            type: CHANGE_TURN,
        })
        dispatch({
            type: SET_CHOICE,
            payload
        })
    }
}

/**
 * Dispatch an action to set to State the absolute winner
 * @param {string} payload
 * @return {object}
 */
export function addAbsoluteWinner(payload) {
    return dispatch => {
        dispatch({
            type: ADD_ABSOLUTE_WINNER,
            payload
        })
        // Call API to add a victory to the winner user
        return saveAbsoluteWinner(payload)
    }
}

/**
 * API call to add a victory to the winner user
 * @param {string} winner
 * @return {Promise}
 */
export function saveAbsoluteWinner(winner) {
    return fetch('/api/victory', { ...constants.POST_REQUEST_OPTIONS, body: JSON.stringify({username: winner}) })
        .then(handleErrors)
        .catch((reason) => console.log('Something wrong happend!', reason));
}

/**
 * API call to list the first 20 highest scores
 * @return {Promise}
 */
export function listHighScores() {
    return fetch('/api/high-scores')
        .then(handleErrors)
        .catch((reason) => console.log('Something wrong happend!', reason));
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}
