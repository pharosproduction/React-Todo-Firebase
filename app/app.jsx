import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

var actions = require('actions');
var store = require('configureStore').configure();
import firebase from 'app/firebase/';
import router from 'app/router/';

// Foundation
$(document).foundation();

// CSS
require('style!css!sass!applicationStyles');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());

    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());

    hashHistory.push('/');
  }
});

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  document.getElementById('app')
);
