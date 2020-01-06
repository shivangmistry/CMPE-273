import { SET_USER, UPDATE_USER } from '../actions/actions';

export const initialState = {
    id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    cno: '',
    about: '',
    city: '',
    country: '',
    company: '',
    school: '',
    hometown: '',
    language: '',
    gender: '',
    image: ''
}

const reducer = (state = initialState, action ) => {
    // console.log(state);
    // console.log(action.payload);
    switch(action.type){
        case SET_USER:
            return Object.assign(state,action.payload); 
        case UPDATE_USER:
            return Object.assign(state, action.payload); 
        default: return state;
    }
}

export default reducer;
