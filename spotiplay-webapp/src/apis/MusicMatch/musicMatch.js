import axios from 'axios'
import { BASE_URL } from './musicMatchConfig'

export const MusicMatch = {
    apiCall(params) {
            return axios.get(`https://cors-access-allow.herokuapp.com/${BASE_URL}/${params.type}.get?chart_name=top&page=${params.page}&page_size=${params.amount}&country=${params.country}&f_has_lyrics=1&apikey=e0039f24340cd3b55653c26835851ae8`)
                            .then(res => {
                                switch (params.type) {
                                    case 'chart.tracks':
                                        return res.data.message.body.track_list;
                                    case 'chart.artists':
                                        return res.data.message.body.artist_list;
                                    default:
                                        return 'not implemented';
                                }
                            })
                            .catch(err => console.log);
    },
    getTopTracks(amount, country, page) {
        return this.apiCall({type: 'chart.tracks', country: country, amount: amount, page: page});
    },
    getTopArtists(amount, country, page) {
        return this.apiCall({type: 'chart.artists', country: country, amount: amount, page: page});
    }
}
