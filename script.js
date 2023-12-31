document.addEventListener('DOMContentLoaded', function() {
    const movies = [
      { title: 'Film 1', rating: 0 },
      { title: 'Film 2', rating: 0 },
      { title: 'Film 3', rating: 0 },
      { title: 'Film 4', rating: 0 },
      { title: 'Film 5', rating: 0 },
      { title: 'Film 6', rating: 0 },
      { title: 'Film 7', rating: 0 },
      { title: 'Film 8', rating: 0 },
      { title: 'Film 9', rating: 0 },
      { title: 'Film 10', rating: 0 }
    ];
  
    // Sayfa yüklendiğinde local storage'dan verileri çek
    const storedMovies = JSON.parse(localStorage.getItem('movies')) || [];
  
    // Eğer local storage'da veri yoksa, default verileri kullan
    const movieList = storedMovies.length ? storedMovies : movies;
  
    renderMovieList(movieList);
  
    function renderMovieList(movies) {
      const movieListContainer = document.getElementById('movie-list');
      movieListContainer.innerHTML = '';
  
      movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `
          <span>${movie.title}</span>
          <input type="number" placeholder="Puan ver" min="0" max="5" step="0.1" value="${movie.rating}" id="${movie.title.toLowerCase().replace(/\s/g, '-')}-rating">
          <button onclick="rateMovie('${movie.title}')">Puanla</button>
        `;
        movieListContainer.appendChild(movieItem);
      });
    }
  
    window.rateMovie = function(title) {
      const ratingInput = document.getElementById(`${title.toLowerCase().replace(/\s/g, '-')}-rating`);
      const rating = parseFloat(ratingInput.value);
  
      if (!isNaN(rating)) {
        // Puanı local storage'da güncelle
        const updatedMovies = movieList.map(movie => {
          if (movie.title === title) {
            movie.rating = rating;
          }
          return movie;
        });
  
        localStorage.setItem('movies', JSON.stringify(updatedMovies));
        renderMovieList(updatedMovies);
        showTopRatedMovies(updatedMovies);
      }
    };
  
    function showTopRatedMovies(movies) {
      const topRatedMovies = movies.filter(movie => movie.rating >= 3);
      console.log('Üç yıldız ve üzeri filmler:', topRatedMovies);
    }

    const showHighRatedButton = document.getElementById('show-high-rated');
  const highRatedMoviesContainer = document.getElementById('high-rated-movies');

  showHighRatedButton.addEventListener('click', function() {
    const highRatedMovies = movieList.filter(movie => movie.rating >= 3);
    renderHighRatedMovies(highRatedMovies);
  });

  function renderHighRatedMovies(movies) {
    highRatedMoviesContainer.innerHTML = '';

    if (movies.length > 0) {
      movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.innerHTML = `<span>${movie.title} - ${movie.rating} puan</span>`;
        highRatedMoviesContainer.appendChild(movieItem);
      });
      highRatedMoviesContainer.classList.remove('hidden');
    } else {
      highRatedMoviesContainer.innerHTML = '<p>3 puan üzeri film/kitap bulunamadı.</p>';
      highRatedMoviesContainer.classList.remove('hidden');
    }
  }
  });
  