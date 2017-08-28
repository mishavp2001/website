import React from "react";
import Home from './Home.jsx'
import CreateForm from './CreateForm.jsx'

import { BrowserRouter, PropsRoute, Route, Switch } from 'react-router-dom'


class App extends React.Component {
  constructor(){
    super();

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyD6r8O3xowqZs0mAyiMdthNS3iqiRv3kNY",
      authDomain: "trueniverse.com",
      databaseURL: "https://websites-24ce9.firebaseio.com",
      projectId: "websites-24ce9",
      storageBucket: "test",
      messagingSenderId: "64562419290"
    };
    firebase.initializeApp(config);
    this.state = {db: firebase.database()};
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/'
            component={props => <Home {...props} edit={false} db={this.state.db}/>} />
          <Route
          path="/edit"
          component={props => <Home {...props} edit={true} db={this.state.db}/>}
          />
        <Route path='*'
            component={props => <Home {...props} edit={false} db={this.state.db}/>} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
