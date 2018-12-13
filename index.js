const {
    store,
    updateNote,
    addNote,
    deleteNote
} = require('./store');

// ================================================
// APP
// ================================================

// #6 - set up subscriptions for notifications of when the state changes
// and perform changes to the state

store.subscribe(() => {
    const currentState = store.getState();
    console.log('-----------');
    console.log(currentState);
    console.log('-----------');
});

// const theAction = updateContent('buy some milk');
// console.log(theAction);

// store.dispatch(addNote('buy some milk'));
// store.dispatch({ type: 'ACTION_UPDATE', content: 'buy some milk' });
// store.dispatch(addNote('drink the milk'));
// store.dispatch(addNote('buy some cookies'));
store.dispatch(addNote('eat all the cookies'));
store.dispatch(addNote('feel terrible'));

const idOfLastOne = store.getState().notes[store.getState().notes.length - 1].id;
store.dispatch(updateNote(idOfLastOne, 'go to lunch'));

store.dispatch(deleteNote(idOfLastOne));