import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';
import { saveState, loadState } from '../helpers/localStorage';
const state = loadState();

const initialData = {
  cities: state ? state.cities : []
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(initialState = initialData) {
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
  );

  store.subscribe(() => {
    saveState({
      cities: store.getState().cities
    });
  });
  return store;
}
