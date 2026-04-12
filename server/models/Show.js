import mongoose from "mongoose";
import Movie from "./Movie.js";

const ShowSchema = new mongoose.Schema(
    {
        movie: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Movie' },
        showDateTime: {type: Date, required: true},
        showPrice: {type: Number, required: true},
        occupiedSeats: {type: Object, default: {}},
    }, {minimize: false}
)

const Show = mongoose.model("Show", ShowSchema);

export default Show;