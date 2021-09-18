const INITIAL_STATE = {
  receiveData: [],
  selectedDate: ''
};

const scheduleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE':
      return { ...state, selectedDate: action.payload.date, receiveData: action.payload.data };
    case 'UPDATE_DATE':
      const updatedDate = action.payload.date + state.selectedDate.replace(state.selectedDate.split('/')[0], "")
      return { ...state, selectedDate: updatedDate };
    default:
      return state;
  }
};

export default scheduleReducer;
