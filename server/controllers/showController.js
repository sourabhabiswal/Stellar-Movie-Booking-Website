import axios from 'axios';  
import Movie from '../models/Movie.js';

//api to get tmdb api
export const getNowplayingMovies = async (req, res) => {
    try {
        const { data } = await axios.get('https://api.themoviedb.org/3/movie/now_playing',
            
           { headers: {Authorization: `Bearer ${process.env.TMDB_API_KEY}`},
        })

        const movies = data.results;
        res.json({ success: true, movies: movies })
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message});
    }
}

// //api to add anew show to the database
// export const addShow = async (req, res) => {
//     try {
//         const { movieId, showInput, showPrice} = req.body;
        
//         let movie = await Movie.findById(movieId);
//         if (!movie) {
//             //fetch movie deatails and credits from TMDb 
//             return res.json({ success: false, message: 'Movie not found' });
//         }

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message});
//     }
// }