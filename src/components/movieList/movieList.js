import React, {useEffect, useState} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()
     const [query, setQuery] = useState("");

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
        console.log(movieList)
        
    }

    return (
      <div className="movie__list">
      <h2 className="list__title">
      <input
        type="text"
        placeholder="Seach..."
        className="candidate-search"
        onChange={(e) => setQuery(e.target.value)}
      /><br></br>
          {(type ? type : "POPULAR").toUpperCase()}
        </h2>
        <div className="list__cards">
          {movieList
            .filter((elem) => elem.title.toLowerCase().includes(query))
            
            .map((movie) => (
              <Cards movie={movie} />
            ))}
        </div>
      </div>
    );
}

export default MovieList