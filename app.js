// DOM Elements
const mainContent = document.getElementById('main-content');
const heroTitle = document.getElementById('hero-title');
const heroDesc = document.getElementById('hero-desc');
const hero = document.getElementById('hero');
const navbar = document.getElementById('navbar');

// Scroll Event for Navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize App
async function initApp() {
    // 1. Setup Auth UI
    checkAuthState();

    // 2. Load Hero Movie (Random Netflix Original)
    const originals = await fetchData(requests.fetchNetflixOriginals);
    if (originals && originals.length > 0) {
        const randomMovie = originals[Math.floor(Math.random() * originals.length)];
        setHeroMovie(randomMovie);
    }

    // 3. Load Rows
    loadRow("Trending Now", requests.fetchTrending);
    loadRow("Top Rated", requests.fetchTopRated);
    loadRow("Action Movies", requests.fetchActionMovies);
    loadRow("Comedy Movies", requests.fetchComedyMovies);
    loadRow("Horror Movies", requests.fetchHorrorMovies);

    // 4. Load Language Categories
    loadRow("Telugu Movies", requests.fetchTelugu);
    loadRow("Hindi Movies", requests.fetchHindi);
    loadRow("Tamil Movies", requests.fetchTamil);
    loadRow("Malayalam Movies", requests.fetchMalayalam);
    loadRow("Kannada Movies", requests.fetchKannada);
    loadRow("Anime Series", requests.fetchAnime, true); // isPoster = true
}

function setHeroMovie(movie) {
    if (!movie) return;
    heroTitle.innerText = movie.title || movie.name || movie.original_name;
    heroDesc.innerText = movie.overview;

    const bannerPath = movie.backdrop_path ? IMAGE_BASE_URL + movie.backdrop_path : '';
    if (bannerPath) {
        hero.style.backgroundImage = `url('${bannerPath}')`;
    }
}

async function loadRow(title, fetchUrl, isLargeRow = false) {
    const movies = await fetchData(fetchUrl);
    if (!movies || movies.length === 0) return;

    const row = document.createElement('div');
    row.className = 'row';

    const titleEl = document.createElement('h2');
    titleEl.className = 'row-title';
    titleEl.innerText = title;
    row.appendChild(titleEl);

    const posters = document.createElement('div');
    posters.className = 'row-posters';

    movies.forEach(movie => {
        // Filter out items without images
        if ((isLargeRow && !movie.poster_path) || (!isLargeRow && !movie.backdrop_path && !movie.poster_path)) return;

        const img = document.createElement('img');
        const imgPath = isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path;

        img.className = `row-poster ${isLargeRow ? 'row-poster-large' : ''}`;
        img.src = `${SMALL_IMAGE_BASE_URL}${imgPath}`;
        img.alt = movie.name || movie.title;
        img.loading = "lazy"; // Performance optimization

        // Add Click Event (e.g., Open Modal or Detail Page)
        img.addEventListener('click', () => {
            openModal(movie);
        });

        posters.appendChild(img);
    });

    row.appendChild(posters);
    mainContent.appendChild(row);
}

// Modal Logic
const modal = document.getElementById('movie-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalOverview = document.getElementById('modal-overview');
const modalAddBtn = document.getElementById('modal-add-btn');

let currentMovie = null;

function openModal(movie) {
    currentMovie = movie;
    modalTitle.innerText = movie.title || movie.name;
    modalOverview.innerText = movie.overview;
    modal.style.display = "flex";
}

if (closeModal) {
    closeModal.onclick = function () {
        modal.style.display = "none";
    }
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

if (modalAddBtn) {
    modalAddBtn.onclick = () => {
        if (currentMovie) addToWishlist(currentMovie);
    }
}

// Start
initApp();
