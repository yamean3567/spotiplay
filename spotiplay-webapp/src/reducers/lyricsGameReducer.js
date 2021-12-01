export function lyricsGameReducer(state, action) {
    switch (action.type) {
        case 'disableButton': {
            return {
                ...state,
                disabled: true,
            };
        }
        case 'startGame': {
            const params = action.payload;
            console.log(params.sentence);
            return {
                ...state,
                started: true,
                loading: false,
                sentence: action.payload.sentence,
                word: action.payload.word,
            };
        }
        case 'setGuessedWord': {
            return {
                ...state,
                guessedWord: action.payload.guessedWord
            }
        }
        case 'correctAnswer': {
            return {
                ...state, 
                sentence: action.payload.sentence,
                word: action.payload.word,
                currentScore: action.payload.currentScore,
                guessedWord: '',
            }
        }
        default:
            break;
    }
    return state;
}

export const initialState = {
    loading: true,
    sentence: '',
    word: '',
    guessedWord: '',
    started: false,
    disabled: false,
    currentScore: 0,
}
