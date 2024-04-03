import { combineReducers, legacy_createStore } from 'redux'
import players from '../reducer/players'
import filters from '../reducer/filters'
const store = legacy_createStore(
	combineReducers({
		players,
		filters,
	}),
	
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store