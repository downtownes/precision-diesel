const initialState = {
    userId: 0,
    fName: '',
    lName: '',
    phone: '',
    address: '',
    city: '',
    stateLived: '',
    zip: 0
}

const USERID = "USERID";
const FIRSTNAME = "FIRSTNAME";
const LASTNAME = "LASTNAME";
const PHONE = "PHONE";
const ADDRESS = "ADDRESS";
const CITY = "CITY";
const STATE = "STATE";
const ZIP = "ZIP";

export default function(state = initialState, action){
    switch(action.type) {
        case USERID: 
            return Object.assign({}, state, {userId: action.payload})
        case FIRSTNAME: 
            return Object.assign({}, state, {fName: action.payload});
        case LASTNAME: 
            return Object.assign({}, state, {lName: action.payload});
        case PHONE:
            return Object.assign({}, state, {phone: action.payload});
        case ADDRESS: 
            return Object.assign({}, state, {city: action.payload});
        case CITY: 
            return Object.assign({}, state, {city: action.payload});
        case STATE: 
            return Object.assign({}, state, {stateLived: action.payload});
        case ZIP: 
            return Object.assign({}, state, {zip: action.payload})
        default:
            return state;
    }
}

export function getUserId(userId) {
    return {
        type: USERID,
        payload: userId
    }
}

export function firstName(fName) {
    return {
        type: FIRSTNAME,
        payload: fName
    }
}

export function lastName(lName) {
    return {
        type: LASTNAME,
        payload: lName
    }
}

export function phoneNumber(phone) {
    return {
        type: PHONE,
        payload: phone
    }
}

export function location(address) {
    return {
        type: ADDRESS,
        payload: address
    }
}

export function cityLoc(city) {
    return {
        type: CITY,
        payload: city
    }
}

export function stateLoc(stateLived) {
    return { 
        type: STATE,
        payload: stateLived
    }
}

export function zipCode(zip) {
    return {
        type: ZIP,
        payload: zip
    }
}