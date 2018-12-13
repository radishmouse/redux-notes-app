// console.log('yay redux');
const { createStore } = require('redux');


// ================================================
// SETUP
// ================================================

// #1 - Describe the state
const defaultState = {
    note: {
        content: ''
    }
}

// #2 - List out all the kinds/types of changes you could make to state
/*
- UPDATE_CONTENT    
*/
const ACTION_UPDATE = {
    type: 'ACTION_UPDATE',
    // content: '??????'
}

// #3 - Write action creator functions
// These are functions that use/return those descriptions
// of changes you can make to state.
const updateContent = (content) => {
    return {
        ...ACTION_UPDATE,
        content
    }
}


// #4 - Write a reducer function that accepts state and an action
// and returns the next version of the state
const note = (state=defaultState, action) => {
    if (!action) {
        return state;
    }
    switch(action.type) {
        case ACTION_UPDATE.type:
            return {
                note: {
                    content: action.content
                }
            }   

        default:
            return state;
    }
}


// #5 - Create a store that uses your reducer

// Chris' janky handrolled redux store:
function createJankStore(reducer) {
    let state = reducer(); // set up the initial state
    const functionsToCallWhenChangeHappens = []; // keep track of functions to notify
    
    const store = {}; // a redux store is just an object
    store.getState = () => { // it has a .getState method
        return {...state}  // that returns a *copy* of the state
    };

    store.subscribe = (fn) => { // you can pass it functions to call when there is a change to state
        functionsToCallWhenChangeHappens.push(fn);
    };

    store.dispatch = (action) => { // it has a dispatch function
        state = reducer(state, action); // that calculates the next version state
        functionsToCallWhenChangeHappens.forEach(fn => { // and then notifies any subscribers
            fn();
        });
    };
    return store;
}

// const store = createStore(note);
const store = createJankStore(note);


// #5 and a half - export the store and action creators

module.exports = {
    store,
    updateContent
};
