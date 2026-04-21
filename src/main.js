import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers';
import middleware from './middleware';
import App from './components/App';
import './index.css';

const store = createStore(reducer, middleware);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);

//Reference: Udacity Chiper project - React/Redux course. Testing did not function correctly due to Transformation to js js instead of JSX. Used Udacity GPT to get a fix.