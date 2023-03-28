const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

const closeMoviesDelitionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  closeMoviesDelitionModal();
  updateUI();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionButton.removeEventListener("click", closeMoviesDelitionModal);

  cancelDeletionButton.addEventListener("click", closeMoviesDelitionModal);
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};

const renderNewMovieElement = (id, title, imgUrl, raiting) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image">
    <img src="${imgUrl}" alt="${title}" />
  </div>
  <div class="movie-element__info">
    <h2>${title}</h2>
    <p>${raiting}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.appendChild(newMovieElement);
};

const clearMovieInputs = () => {
  for (const userInput of userInputs) {
    userInput.value = "";
  }
};

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible");
};

const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInputs();
  toggleBackdrop();
};

const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const raitingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    raitingValue.trim() === "" ||
    +raitingValue < 1 ||
    +raitingValue > 5
  ) {
    alert("Please enter valid value (raiting between 1 and 5)");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    raiting: raitingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.raiting
  );
  updateUI();
};

const backdropClickHandler = () => {
  closeMovieModal();
  closeMoviesDelitionModal();
  clearMovieInputs();
};

startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
