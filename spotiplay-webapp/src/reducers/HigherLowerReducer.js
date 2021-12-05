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
            id1: action.payload.id1,
            gameTime: action.payload.gameTime,
        };
    }
    case 'gameTick': {
        return {
            ...state,
            gameTime: action.payload.gameTime,
            deduction: 0,
        }
    }
    case 'correctAnswer': {
        return {
            ...state, 
            track1: action.payload.track1,
            id1: action.payload.id1,
            currentScore: action.payload.currentScore,
            buttonDisabled: false,
            formDisabled: false,
            gameTime: action.payload.gameTime
        }
    }
    case 'wrongAnswer': {
        return {
            ...state,
            deduction: action.payload.deduction,
            buttonDisabled: false,
            gameTime: action.payload.gameTime,
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
            id1: action.payload.id1,
            currentScore: 0,
            buttonDisabled: false,
            lost: false,
            gameTime: action.payload.gameTime,
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
id1: null,
started: false,
buttonDisabled: false,
currentScore: 0,
lost: false,
fetching: false,
restartTime: -1,
startTime: -1,
gameTime: -10000,
}