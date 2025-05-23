// Movie data (shared across pages)
const movies = [
    {
        id: 1,
        title: "Dragon",
        genre: "Comedy, Drama",
        duration: "2h 37m",
        poster: "https://www.malco.com/assets/images/6sgaq1zBQK-300.webp",
        rating: "PG-13",
        price: 120
    },
    {
        id: 2,
        title: "Thug Life",
        genre: "Action, Drama",
        duration: "3h 1m",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4bm-xgKJm1gbDp7X6UgXLO8r6_2CbbAgZmg&s",
        rating: "PG",
        price: 120
    },
    {
        id: 3,
        title: "Good Bad Ugly",
        genre: "Action, Drama, Thriller",
        duration: "2h 20m",
        poster: "https://cdn.123telugu.com/content/wp-content/uploads/2024/05/good-bad-ugly.jpg",
        rating: "R",
        price: 120
    },
    {
        id: 4,
        title: "Coolie",
        genre: "Action,Thriller",
        duration: "2h 2m",
        poster: "https://assets.gadgets360cdn.com/pricee/assets/product/202404/Coolie_1713955198.jpg",
        rating: "PG",
        price: 120
    },
    {
        id: 5,
        title: "Amaran",
        genre: "Action, Drama",
        duration: "2h 49m",
        poster: "https://assetscdn1.paytm.com/images/cinema/Amaran-608x800-3b60ca10-4594-11ef-83ec-5d141d381675.jpg",
        rating: "R",
        price: 120
    },
    {
        id: 6,
        title: "GOAT",
        genre: "Drama ,Action ,Thriller ",
        duration: "3h 3m",
        poster: "https://cdn.123telugu.com/content/wp-content/uploads/2024/08/The-GOAT-4.jpg",
        rating: "R",
        price: 120
    }
];

// Cinema data
const cinemas = [
    {
        id: "cineplex-downtown",
        name: "Cineplex Downtown",
        address: "123 Main St, City Center"
    },
    {
        id: "cineplex-mall",
        name: "Cineplex Mall",
        address: "456 Shopping Ave, Mall District"
    },
    {
        id: "cineplex-premium",
        name: "Cineplex Premium",
        address: "789 Luxury Blvd, Uptown"
    }
];

// Common functions
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

function getBookingData() {
    return {
        movie: JSON.parse(sessionStorage.getItem('selectedMovie')),
        cinema: JSON.parse(sessionStorage.getItem('selectedCinema')),
        time: sessionStorage.getItem('selectedTime'),
        seats: JSON.parse(sessionStorage.getItem('selectedSeats')) || [],
        price: parseInt(sessionStorage.getItem('seatPrice')) || 12
    };
}

function calculateTotal(seats, price) {
    return seats.length * price;
}

function generateBookingId() {
    return 'CB-' + Math.floor(Math.random() * 1000000);
}

// Initialize based on current page
function initPage() {
    setupMobileMenu();
    
    const path = window.location.pathname.split('/').pop();
    
    switch(path) {
        case 'index.html':
        case '':
            initHomePage();
            break;
        case 'movies.html':
            initMoviesPage();
            break;
        case 'booking.html':
            initBookingPage();
            break;
        case 'payment.html':
            initPaymentPage();
            break;
        case 'confirmation.html':
            initConfirmationPage();
            break;
    }
}

// Home Page
function initHomePage() {
    const featuredMovies = document.getElementById('featured-movies');
    
    if (featuredMovies) {
        const featured = movies.slice(0, 4); // Show first 4 movies as featured
        
        featured.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.genre}</span>
                        <span>${movie.duration}</span>
                    </div>
                    <a href="booking.html?movie=${movie.id}" class="book-btn">Book Now</a>
                </div>
            `;
            featuredMovies.appendChild(movieCard);
        });
    }
}

// Movies Page
function initMoviesPage() {
    const movieGrid = document.getElementById('movie-grid');
    
    if (movieGrid) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <div class="movie-meta">
                        <span>${movie.genre}</span>
                        <span>${movie.duration}</span>
                    </div>
                    <a href="booking.html?movie=${movie.id}" class="book-btn">Book Now</a>
                </div>
            `;
            movieGrid.appendChild(movieCard);
        });
    }
}

// Booking Page
function initBookingPage() {
    // Get movie ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = parseInt(urlParams.get('movie'));
    
    if (!movieId) {
        window.location.href = 'movies.html';
        return;
    }
    
    const selectedMovie = movies.find(movie => movie.id === movieId);
    
    if (!selectedMovie) {
        window.location.href = 'movies.html';
        return;
    }
    
    // Store selected movie in sessionStorage
    sessionStorage.setItem('selectedMovie', JSON.stringify(selectedMovie));
    sessionStorage.setItem('seatPrice', selectedMovie.price.toString());
    
    // Update movie info
    document.getElementById('selected-movie-poster').src = selectedMovie.poster;
    document.getElementById('selected-movie-title').textContent = selectedMovie.title;
    document.getElementById('selected-movie-duration').textContent = selectedMovie.duration;
    document.getElementById('selected-movie-genre').textContent = selectedMovie.genre;
    document.getElementById('summary-movie').textContent = selectedMovie.title;
    
    // Cinema selection
    const cinemaSelect = document.getElementById('cinema-select');
    
    cinemas.forEach(cinema => {
        const option = document.createElement('option');
        option.value = cinema.id;
        option.textContent = cinema.name;
        cinemaSelect.appendChild(option);
    });
    
    cinemaSelect.addEventListener('change', function() {
        const cinemaId = this.value;
        const selectedCinema = cinemas.find(c => c.id === cinemaId);
        
        if (selectedCinema) {
            // Store selected cinema
            sessionStorage.setItem('selectedCinema', JSON.stringify(selectedCinema));
            
            // Generate time slots
            const timeSlots = document.getElementById('time-slots');
            timeSlots.innerHTML = '';
            
            const times = ['10:00 AM', '1:30 PM', '4:00 PM', '6:30 PM', '9:00 PM'];
            times.forEach(time => {
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = time;
                timeSlot.addEventListener('click', function() {
                    document.querySelectorAll('.time-slot').forEach(slot => {
                        slot.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    
                    // Store selected time
                    sessionStorage.setItem('selectedTime', this.textContent);
                    
                    generateSeats();
                    updateSummary();
                    
                    // Update active step
                    document.getElementById('step1').classList.remove('active');
                    document.getElementById('step1').querySelector('.step-number').innerHTML = '<i class="fas fa-check"></i>';
                    document.getElementById('step2').classList.add('active');
                });
                timeSlots.appendChild(timeSlot);
            });
        }
    });
    
    // Initialize summary
    updateSummary();
}

function generateSeats() {
    const seatsContainer = document.getElementById('seats-container');
    seatsContainer.innerHTML = '';
    
    // Generate seats (5 rows x 10 seats)
    for (let row = 1; row <= 5; row++) {
        for (let seatNum = 1; seatNum <= 10; seatNum++) {
            const seat = document.createElement('div');
            seat.className = 'seat available';
            seat.textContent = `${String.fromCharCode(64 + row)}${seatNum}`;
            
            // Randomly occupy some seats (30% chance)
            if (Math.random() < 0.3) {
                seat.classList.remove('available');
                seat.classList.add('occupied');
            }
            
            seat.addEventListener('click', function() {
                if (this.classList.contains('occupied')) return;
                
                this.classList.toggle('selected');
                const seatId = this.textContent;
                
                let selectedSeats = JSON.parse(sessionStorage.getItem('selectedSeats')) || [];
                
                if (this.classList.contains('selected')) {
                    if (!selectedSeats.includes(seatId)) {
                        selectedSeats.push(seatId);
                    }
                } else {
                    selectedSeats = selectedSeats.filter(s => s !== seatId);
                }
                
                // Store selected seats
                sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
                
                updateSummary();
                
                // Update active step if seats are selected
                if (selectedSeats.length > 0) {
                    document.getElementById('step2').classList.remove('active');
                    document.getElementById('step2').querySelector('.step-number').innerHTML = '<i class="fas fa-check"></i>';
                    document.getElementById('step3').classList.add('active');
                } else {
                    document.getElementById('step2').classList.add('active');
                    document.getElementById('step3').classList.remove('active');
                }
            });
            
            seatsContainer.appendChild(seat);
        }
    }
}

function updateSummary() {
    const bookingData = getBookingData();
    
    if (bookingData.movie) {
        document.getElementById('summary-movie').textContent = bookingData.movie.title;
    }
    
    if (bookingData.cinema) {
        document.getElementById('summary-cinema').textContent = bookingData.cinema.name;
    }
    
    if (bookingData.time) {
        document.getElementById('summary-time').textContent = bookingData.time;
    }
    
    if (bookingData.seats.length > 0) {
        document.getElementById('summary-seats').textContent = bookingData.seats.join(', ');
    } else {
        document.getElementById('summary-seats').textContent = 'None selected';
    }
    
    const total = calculateTotal(bookingData.seats, bookingData.price);
    document.getElementById('summary-total').textContent = `$${total}`;
    
    // Enable/disable proceed button
    const proceedBtn = document.getElementById('proceed-btn');
    if (proceedBtn) {
        if (bookingData.seats.length > 0 && bookingData.time && bookingData.cinema) {
            proceedBtn.classList.remove('disabled');
            proceedBtn.href = `payment.html`;
        } else {
            proceedBtn.classList.add('disabled');
            proceedBtn.removeAttribute('href');
        }
    }
}

// Payment Page
function initPaymentPage() {
    const bookingData = getBookingData();
    
    // Validate booking data
    if (!bookingData.movie || !bookingData.cinema || !bookingData.time || bookingData.seats.length === 0) {
        window.location.href = 'movies.html';
        return;
    }
    
    // Update payment details
    document.getElementById('payment-movie').textContent = bookingData.movie.title;
    document.getElementById('payment-cinema').textContent = bookingData.cinema.name;
    document.getElementById('payment-time').textContent = bookingData.time;
    document.getElementById('payment-seats').textContent = bookingData.seats.join(', ');
    
    const total = calculateTotal(bookingData.seats, bookingData.price);
    document.getElementById('payment-total').textContent = `$${total}`;
    
    // Payment form submission
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real app, you would process payment here
            // For demo, we'll just redirect to confirmation
            const bookingId = generateBookingId();
            sessionStorage.setItem('bookingId', bookingId);
            
            window.location.href = 'confirmation.html';
        });
    }
}

// Confirmation Page
function initConfirmationPage() {
    const bookingData = getBookingData();
    const bookingId = sessionStorage.getItem('bookingId');
    
    // Validate booking data
    if (!bookingData.movie || !bookingData.cinema || !bookingData.time || bookingData.seats.length === 0 || !bookingId) {
        window.location.href = 'index.html';
        return;
    }
    
    // Update confirmation details
    document.getElementById('booking-id').textContent = bookingId;
    document.getElementById('confirmation-movie').textContent = bookingData.movie.title;
    document.getElementById('confirmation-cinema').textContent = bookingData.cinema.name;
    document.getElementById('confirmation-time').textContent = bookingData.time;
    document.getElementById('confirmation-seats').textContent = bookingData.seats.join(', ');
    
    // Print tickets
    document.getElementById('print-btn').addEventListener('click', function() {
        window.print();
    });
    
    // Clear booking data from sessionStorage
    sessionStorage.removeItem('selectedMovie');
    sessionStorage.removeItem('selectedCinema');
    sessionStorage.removeItem('selectedTime');
    sessionStorage.removeItem('selectedSeats');
    sessionStorage.removeItem('seatPrice');
    sessionStorage.removeItem('bookingId');
}

// Initialize the current page
document.addEventListener('DOMContentLoaded', initPage);