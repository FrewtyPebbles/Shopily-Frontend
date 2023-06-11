import Router from 'preact-router'
import { h, render} from 'preact';
import App from './App';

import AsyncRoute from 'preact-async-route';
import './index.css';
h
const Main = () => (
    <Router>
        <AsyncRoute path='/' component={App} current_page='Feature'/>
        <AsyncRoute path='/categories' component={App} current_page='Categories'/>
        <AsyncRoute path='/about' component={App} current_page='About'/>
    </Router>
);

render(<Main/>, document.body);
