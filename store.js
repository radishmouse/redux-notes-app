// console.log('yay redux');
const { createStore } = require('redux');
const uuid = require('uuid/v4');

// ================================================
// SETUP
// ================================================

// #1 - Describe the state
const defaultState = {
    notes: [
        // {
        //     id: uuid(),
        //     content: ''
        // }
    ]
}

// #2 - List out all the kinds/types of changes you could make to state
/*
- UPDATE_CONTENT    
- ADD_NOTE
- DELETE_NOTE
*/
const ACTION_UPDATE = {
    type: 'ACTION_UPDATE',
    // content: '??????',
    // id: '???????'
};

const ACTION_ADD = {
    type: 'ACTION_ADD',
    // content: '?????'
};

const ACTION_DEL = {
    type: 'ACTION_DEL',
    // id: '??????'
}

// #3 - Write action creator functions
// These are functions that use/return those descriptions
// of changes you can make to state.
const updateNote = (id, content) => {
    return {
        ...ACTION_UPDATE,
        id,
        content
    };
};

const addNote = (content) => {
    return {
        ...ACTION_ADD,
        content
    };
};

const deleteNote = (id) => {
    return {
        ...ACTION_DEL,
        id
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
                notes: state.notes.map(note => {
                    if (note.id === action.id) {
                        return {
                            ...note,
                            // alternative to spread operator: just copy all the existing keys 
                            // id: note.id,
                            // content: note.content,                            

                            // immediately overwrite the content with what
                            // came in through the action
                            content: action.content
                        }
                    } else {
                        // This is not the one to update.
                        // Just return the original
                        // return note;

                        // Anal retentive version: create a new object,
                        // and sprinkle in all the key/value pairs
                        return {
                            ...note
                        };
                    }
                })
            }   
        case ACTION_ADD.type:
            return {
                notes: [
                    ...state.notes,
                    {
                        id: uuid(),
                        content: action.content
                    }
                ]
            }
        case ACTION_DEL.type:
            return {
                notes: state.notes.filter(note => {
                    return note.id !== action.id;
                })
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

const store = createStore(note);
// const store = createJankStore(note);


// #5 and a half - export the store and action creators

module.exports = {
    store,
    updateNote,
    addNote,
    deleteNote
};
