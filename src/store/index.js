import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk';
import gameOfDronesApp from '../reducers/reducers'

const store = createStore(
    gameOfDronesApp,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
)

export default store;
