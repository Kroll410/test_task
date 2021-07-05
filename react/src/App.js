import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";


import { Header } from './components/Header/Header';
import { Add } from './components/Add/Add'
import './index.css';
import { MainTable } from './components/MainTable/MainTable'

function App() {


  return (
      <Router>
        <Header />        
        
        <div className="container">
        <Switch>
          <Route path='/users'>
              <MainTable pathname='users'/>
          </Route>
          <Route path='/groups'>
              <MainTable pathname='groups'/>              
          </Route>
          <Route path='/'>
              <Redirect to='/users'/>
          </Route>
          
        </Switch>
        </div>
      </Router>  
      
    );
}

export default App;
