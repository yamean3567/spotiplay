export function loginReducer(state, action) {
    switch (action.type) {
        case 'login': {
            return {
                ...state,
                loading: true,
                error: '',
            };
        }
        case 'success': {
            return {
                ...state,
                loading: false,
            };
        }
        case 'error': {
            return {
                ...state,
                emailError: action.payload.emailErr ?  action.payload.emailErr : '',
                passwordError: action.payload.passErr ? action.payload.passErr : '', 
                loading: false,
            }
        }
        case 'setEmail': {
            return {
                ...state,
                email: action.payload.email
            }
        }
        case 'setPassword': {
            return {
                ...state,
                password: action.payload.password
            }
        }
        default:
            break;
    }
    return state;
}

export const initialState = {
    emailError: '',
    passwordError: '',
    loading: false,
    email: '',
    password: '',
}
