const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movies = [];


const renderMovies = (filter = "") => {
    const movieList = document.getElementById("movie-list");

    if (movies.length === 0) {
        movieList.classList.remove("visible");
        return;
    } else {
        movieList.classList.add("visible");
    }
    movieList.innerHTML = "";

    const filteredMovies = !filter ? movies : movies.filter(movie => movie.info.title.includes(filter));

    filteredMovies.forEach((movie) => {
        const movieEl = document.createElement("li");
        const { info, ...otherProps } = movie; //object destructuring
        console.log(otherProps);
        // movieEl.textContent = movie.info.title;

        const { title: movieTitle } = info;
        let text = movieTitle;
        for (const key in info) {
            if (key !== 'title') {
                text = text + ` - ${key}:${info[key]}`
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);

    });
    document.getElementById("filter-title").value = "";
};

const addMovieHandler = () => {
    const title = document.getElementById("title").value;
    const extraName = document.getElementById("extra-name").value;
    const extraValue = document.getElementById("extra-value").value;

    if (title.trim() === "" || extraName.trim() === "" || extraValue.trim() === "") {
        return;
    }
    const newMovie = {
        info: {
            title: title,
            [extraName]: extraValue
        },
        id: Math.random()
    };
    movies.push(newMovie);
    renderMovies();

    document.getElementById("title").value = "";
    document.getElementById("extra-name").value = "";
    document.getElementById("extra-value").value = "";
};

const searchMovieHandler = () => {
    const filterTerm = document.getElementById("filter-title").value;
    renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMovieHandler);