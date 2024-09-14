// const {createStore} = require('@reduxjs/toolkit');

// const addConst = 'ADD';

// const initialState = {
//   count: 0,
// };

// const addition = () => {
//   return {
//     type: addConst,
//   };
// };

// const Reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case addConst:
//       return {
//         ...state,
//         count: state.count + 1,
//       };
//     default:
//       return state;
//   }
// };

// const store = createStore(Reducer);

// store.subscribe(() => console.log(store.getState()));

// store.dispatch(addition());

//---------------------------------Redux Toolkit--------------------------------------

const {createSlice, configureStore} = require('@reduxjs/toolkit');

const initialState = {
  count: 0,
};

const addSlice = createSlice({
  name: 'addition',
  initialState: initialState,
  reducers: {
    add: (state, action) => {
      state.count += action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    addSlice: addSlice.reducer,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});

// console.log('addSlice', );

store.dispatch(addSlice.actions.add(2));
