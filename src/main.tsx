import {h, render} from 'preact';
import App from './App';
import Router, {Route} from 'preact-router'
import './index.css';

const Main = () => (
    <Router>
        <Route path='/' component={App} current_page='Feature'/>
        <Route path='/categories' component={App} current_page='Categories'/>
        <Route path='/about' component={App} current_page='About'/>
    </Router>
);

render(<Main/>, document.body);
