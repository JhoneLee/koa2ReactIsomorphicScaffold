import React,{h,Component} from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Context from './context';

let App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Context/>
                </div>
            </Router>
        </Provider>
    );
};

export default App;