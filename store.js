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
const store = createStore(note);

// #5 and a half - export the store and action creators

module.exports = {
    store,
    updateContent
};
