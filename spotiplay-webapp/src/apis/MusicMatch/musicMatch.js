import axios from 'axios'
import { BASE_URL } from './musicMatchConfig'

export const MusicMatch = {
    apiCall(params) {
        if(params.type === 'top') {
            return axios.get(`https://cors-access-allow.herokuapp.com/${BASE_URL}/chart.tracks.get?chart_name=top&page=${params.page}&page_size=${params.amount}&country=${params.country}&f_has_lyrics=1&apikey=`)
                            .then(res => {return res.data})
                            .catch(err => console.log);
        } else {
            return 'no data';
        }
    },
    getTopTracks(amount, country, page) {
        return this.apiCall({type: 'top', country: country, amount: amount, page: page})
    },
}