const initialState = {
    userId: 0,
    fName: '',
    lName: '',
    phone: '',
    address: '',
    city: '',
    stateLived: '',
    zip: 0,
    orderId: 0,
    totalInCents: 0,
    loggedIn: true,
    cart: [],
    total: 0,
    quantity: 0
}

const USERID = "USERID";
const FIRSTNAME = "FIRSTNAME";
const LASTNAME = "LASTNAME";
const PHONE = "PHONE";
const ADDRESS = "ADDRESS";
const CITY = "CITY";
const STATE = "STATE";
const ZIP = "ZIP";
const ORDERID = "ORDERID";
const TOTALINCENTS = "TOTALINCENTS";
const LOGGEDIN = "LOGGEDIN";
const CART = "CART";
const CARTTOTAL = "CARTTOTAL"
const QUANTITY = "QUANTITY"

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
            return Object.assign({}, state, {address: action.payload});
        case STATE: 
            return Object.assign({}, state, {stateLived: action.payload});
        case ZIP: 
            return Object.assign({}, state, {zip: action.payload});
        case ORDERID:
            return Object.assign({}, state, {orderId: action.payload});
        case TOTALINCENTS:
            return Object.assign({}, state, {totalInCents: action.payload});
        case LOGGEDIN: 
            return Object.assign({}, state, {loggedIn: action.payload});
        case CART: 
            return Object.assign({}, state, {cart: action.payload});
        case CARTTOTAL: 
            return Object.assign({}, state, {total: action.payload});
        case QUANTITY:
            return Object.assign({}, state, {quantity: action.payload})
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

export function getOrderId (orderId) {
    return {
        type: ORDERID,
        payload: orderId
    }
}

export function getTotalPennies(totalInCents) {
    return {
        type: TOTALINCENTS,
        payload: totalInCents
    }
}

export function loggedUser(loggedIn) {
    return {
        type: LOGGEDIN,
        payload: loggedIn
    }
}

export function getCart(cart) {
    return {
        type: CART,
        payload: cart
    }
}

export function updateCartTotal(total) {
    return {
        type: CARTTOTAL,
        payload: total
    }
}

export function updateQuant(quantity) {
    return {
        type: QUANTITY,
        payload: quantity
    }
}