const {
    store,
    updateContent
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

store.dispatch(updateContent('buy some milk'));
// store.dispatch({ type: 'ACTION_UPDATE', content: 'buy some milk' });
store.dispatch(updateContent('drink the milk'));
store.dispatch(updateContent('buy some cookies'));
store.dispatch(updateContent('eat all the cookies'));
store.dispatch(updateContent('feel terrible'));