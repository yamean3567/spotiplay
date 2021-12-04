export function registrationReducer(state, action) {
    switch (action.type) {
        case 'setEmail': {
            return {
                ...state,
                email: action.payload.email,
            }
        }
        case 'setPass1': {
            return {
                ...state,
                pass1: action.payload.pass1,
            }
        }
        case 'setPass2': {
            return {
                ...state,
                pass2: action.payload.pass2,
            }
        }
        case 'register': {
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
        default:
            break;
    }
    return state;
}

export const initialState = {
    loading: false,
    email: '',
    pass1: '',
    pass2: '',
    emailError: '',
    passwordError: '',
}
