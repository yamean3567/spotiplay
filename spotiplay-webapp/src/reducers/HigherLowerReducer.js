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
        let color = "";
            switch (action.payload.startTime) {
                case 3:
                    color ="bg-red-500"
                    break;
                case 2:
                    color="bg-yellow-500"
                    break;
                case 1:
                    color="bg-green-500"
                    break;
                default:
                    break;
            }
        return {
            ...state,
            buttonDisabled: true,
            startTime: action.payload.startTime,
            startColor: color,
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
            newPoints: action.payload.newPoints,
        }
    }
    case 'lostGame': {
        return {
            ...state,
            lost: true,
            buttonDisabled: false,
            beatHighscore: action.payload.beatHighscore,
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
            beatHighscore: false,
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
startTime: 0,
startColor: "bg-green-800",
newPoints: null,
beatHighscore: false,
}