let popularMovie={}
let movieGenreId={}
let topRMovie={}
let upComingMovie={}
const popContainer= document.getElementById("popular")
const topRContainer=document.getElementById("top_rated")
const upComingContainer=document.getElementById("upcoming")
getMovieGenre()
getPopMovies(popContainer)
getTopRatedMovies(topRContainer)
upComingMovies(upComingContainer)



async function upComingMovies(container) {
    const upComingMoviesData = await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=a1da3b13110340ab19ccd74bee7d1bf9");
    const upComingMoviesJson = await upComingMoviesData.json();
    upComingMovie = upComingMoviesJson
    createCards(upComingMovie,container)
  }
async function getTopRatedMovies(container) {
    const topRMoviesData = await fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=a1da3b13110340ab19ccd74bee7d1bf9");
    const topRMoviesJson = await topRMoviesData.json();
    topRMovie = topRMoviesJson
    createCards(topRMovie,container)
  }
async function getPopMovies(container) {
    const popMoviesData = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=a1da3b13110340ab19ccd74bee7d1bf9");
    const popMoviesJson = await popMoviesData.json();
    popularMovie = popMoviesJson
    createCards(popularMovie,container)
  }
  
  //get movie genre id
  async function getMovieGenre() {
    const movieGenreData = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=a1da3b13110340ab19ccd74bee7d1bf9");
    const movieGenreJson = await movieGenreData.json();
    movieGenreId = movieGenreJson
 
  }

  //creating cards
  function createCards(jsonData,container,pageNum=0){
    let multipler=pageNum*5
    for(let i=0+multipler; i<5+multipler; i++ ){
        let movieData=jsonData.results[i]
        const cardUI= `
        <div class="card" style="width: 18rem;">
        <img src="https://image.tmdb.org/t/p/original${movieData.poster_path}" class="card-img-top" alt="poster of ${movieData.title}">
        <div class="card-body">
            <h4>${i+1}. ${movieData.title}</h4>
            <h6>${movieData.release_date}</h6>
            <p class="card-text">${movieData.overview}</p>
            ${createButtonGenre(movieData)}
        </div>
        `
        container.innerHTML += cardUI
    }
}

function createButtonGenre(movieJson){
    let genreButtons =``
    for(let x in movieJson.genre_ids){
        for(let k in movieGenreId.genres){
            if(movieJson.genre_ids[x]===movieGenreId.genres[k].id){
                genreButtons+= `<button type="button" class="btn btn-outline-secondary" disabled>${movieGenreId.genres[k].name}</button>`                    
            }
        }
    }
    return genreButtons
}
//to clear html to from container and change page
function pageChange(jsonData,container,page){
    container.innerHTML=``
    createCards(jsonData,container,page)
}