export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function login(data){
    return {
        type: SET_USER,
        payload: data
    }
}

export function update(data){
    return {
        type: UPDATE_USER,
        payload: data
    }
}
