import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter} from 'react-router-dom';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';

ReactDOM.render(
   <BrowserRouter>
   <App />
   </BrowserRouter>
, document.getElementById('root'));
registerServiceWorker();
