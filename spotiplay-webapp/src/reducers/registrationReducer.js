export function registrationReducer(state, action) {
    switch (action.type) {
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
                error: 'Incorrectly formatted email or password too short',
                loading: false,
            }
        }
        default:
            break;
    }
    return state;
}

export const initialState = {
    error: '',
    loading: false,
}
