import mongoose from "mongoose";
import Movie from "./Movie";

const ShowSchema = new mongoose.Schema(
    {
        Movie: {type: String, required: true, ref: 'Movie'},
        showDateTime: {type: Date, required: true},
        showPrice: {type: Number, required: true},
        occupiedSeats: {type: Object, default: {}},
    }, {minimize: false}
)

const Show = mongoose.model("Show", ShowSchema);

export default Show;