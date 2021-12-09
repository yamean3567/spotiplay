export function HigherLowerReducer(state, action) {
switch (action.type) {
    case 'disableForm': {
        return {
            ...state,
            formDisabled: true,
        }
    }
    case 'loadRestart': {
        return {
            ...state,
            buttonDisabled: true,
            restartTime: action.payload.restartTime,
        };
    }
    case 'loadStart': {
        return {
            ...state,
            buttonDisabled: true,
            startTime: action.payload.startTime,
        }
    }
    case 'startGame': {
        return {
            ...state,
            started: true,
            loading: false,
            buttonDisabled: false,
            formDisabled: false,
            track1: action.payload.track1,
            artist1: action.payload.artist1,
            id1: action.payload.id1,
            track2: action.payload.track2,
            artist2: action.payload.artist2,
            id2: action.payload.id2,
        };
    }
    case 'correctAnswer': {
        return {
            ...state, 
            track1: action.payload.track1,
            artist1: action.payload.artist1,
            id1: action.payload.id1,
            track2: action.payload.track2,
            artist2: action.payload.artist2,
            id2: action.payload.id2,
            currentScore: action.payload.currentScore,
            buttonDisabled: false,
            formDisabled: false,
        }
    }
    case 'lostGame': {
        return {
            ...state,
            lost: true,
            buttonDisabled: false,
        }
    }
    case 'restartGame': {
        return {
            ...state,
            track1: action.payload.track1,
            artist1: action.payload.artist1,
            id1: action.payload.id1,
            track2: action.payload.track2,
            artist2: action.payload.artist2,
            id2: action.payload.id2,
            currentScore: 0,
            buttonDisabled: false,
            lost: false,
        }

    }
    default:
        break;
    }
return state;
}

export const initialState = {
loading: true,
track1:  null,
artist1: null,
id1: null,
track2:  null,
artist2: null,
id2: null,
started: false,
buttonDisabled: false,
currentScore: 0,
lost: false,
fetching: false,
restartTime: -1,
startTime: -1,
}