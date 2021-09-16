const INITIAL_STATE = {
  receiveData: [],
  selectedDate: ''
};

const scheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, selectedDate: action.payload.date, receiveData: action.payload.data };
    default:
      return state;
  }
};

export default scheduleReducer;
