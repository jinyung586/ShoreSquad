// ============================================
// ShoreSquad - Beach Cleanup App
// Interactive features and functionality
// ============================================

/**
 * ============================================
 * UTILITY FUNCTIONS
 * ============================================
 */

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type: 'success', 'error', 'warning', 'info'
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Initialize local storage with default data
 */
function initLocalStorage() {
    if (!localStorage.getItem('shorecrew_beaches')) {
        const beaches = [
            { id: 1, name: 'Santa Monica Beach', location: 'Santa Monica, CA', icon: '🏖️', difficulty: 'Easy', cleanups: 12 },
            { id: 2, name: 'Malibu Beach', location: 'Malibu, CA', icon: '🌊', difficulty: 'Moderate', cleanups: 8 },
            { id: 3, name: 'Venice Beach', location: 'Venice, CA', icon: '🏝️', difficulty: 'Hard', cleanups: 15 },
            { id: 4, name: 'Long Beach', location: 'Long Beach, CA', icon: '🌅', difficulty: 'Easy', cleanups: 20 },
        ];
        localStorage.setItem('shorecrew_beaches', JSON.stringify(beaches));
    }
    
    if (!localStorage.getItem('shorecrew_crews')) {
        const crews = [
            { id: 1, name: 'Beach Warriors', location: 'Santa Monica', members: 24, nextCleanup: '2025-12-08' },
            { id: 2, name: 'Ocean Guardians', location: 'Malibu', members: 18, nextCleanup: '2025-12-15' },
            { id: 3, name: 'Coastal Cleaners', location: 'Venice', members: 31, nextCleanup: '2025-12-10' },
            { id: 4, name: 'Tide Riders', location: 'Long Beach', members: 42, nextCleanup: '2025-12-12' },
        ];
        localStorage.setItem('shorecrew_crews', JSON.stringify(crews));
    }
    
    if (!localStorage.getItem('shorecrew_stats')) {
        const stats = {
            cleanups: 47,
            volunteers: 1240,
            trash: 2850,
            crews: 4
        };
        localStorage.setItem('shorecrew_stats', JSON.stringify(stats));
    }
}

/**
 * Debounce function for performance
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

/**
 * ============================================
 * NAVBAR FUNCTIONALITY
 * ============================================
 */

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    hamburger?.addEventListener('click', () => {
        navMenu?.classList.toggle('active');
    });
    
    // Close menu when link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('active');
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', () => {
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const navLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        
        if (navLink) {
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

/**
 * ============================================
 * HERO SECTION
 * ============================================
 */

function initHero() {
    const ctaBtn = document.getElementById('getCTABtn');
    ctaBtn?.addEventListener('click', () => {
        document.getElementById('beaches').scrollIntoView({ behavior: 'smooth' });
    });
}

/**
 * ============================================
 * BEACHES SECTION
 * ============================================
 */

function initBeaches() {
    const searchInput = document.getElementById('searchInput');
    const locationBtn = document.getElementById('locationBtn');
    
    // Search beaches
    searchInput?.addEventListener('input', debounce(() => {
        filterBeaches();
    }, 300));
    
    // Get user location
    locationBtn?.addEventListener('click', () => {
        if (navigator.geolocation) {
            locationBtn.disabled = true;
            locationBtn.textContent = '📍 Locating...';
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    showToast('📍 Location detected! Showing nearby beaches.', 'success');
                    locationBtn.disabled = false;
                    locationBtn.textContent = '📍 Use My Location';
                    // In a real app, filter beaches by coordinates
                    renderBeaches();
                },
                (error) => {
                    showToast('❌ Unable to access location. Please enable location permissions.', 'error');
                    locationBtn.disabled = false;
                    locationBtn.textContent = '📍 Use My Location';
                }
            );
        }
    });
    
    renderBeaches();
    initMap();
}

function renderBeaches() {
    const beaches = JSON.parse(localStorage.getItem('shorecrew_beaches') || '[]');
    const beachesList = document.getElementById('beachesList');
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    const filtered = beaches.filter(beach => 
        beach.name.toLowerCase().includes(searchTerm) ||
        beach.location.toLowerCase().includes(searchTerm)
    );
    
    beachesList.innerHTML = filtered.map(beach => `
        <article class="beach-card" role="article">
            <div class="beach-card-header">${beach.icon}</div>
            <div class="beach-card-body">
                <h3>${beach.name}</h3>
                <div class="beach-card-meta">
                    <div class="beach-meta-item">📍 ${beach.location}</div>
                    <div class="beach-meta-item">⭐ ${beach.difficulty}</div>
                </div>
                <p>Recent cleanups: ${beach.cleanups}</p>
                <button class="btn btn-primary" onclick="selectBeach(${beach.id})">
                    Schedule Cleanup
                </button>
            </div>
        </article>
    `).join('');
}

function filterBeaches() {
    renderBeaches();
}

function selectBeach(beachId) {
    const beaches = JSON.parse(localStorage.getItem('shorecrew_beaches') || '[]');
    const beach = beaches.find(b => b.id === beachId);
    
    if (beach) {
        showToast(`🌊 Selected ${beach.name}! Now join or create a crew.`, 'success');
        document.getElementById('crewModal').setAttribute('aria-hidden', 'false');
    }
}

function initMap() {
    const mapContainer = document.getElementById('beachesMap');
    
    if (!mapContainer) return;
    
    // Create a simple visual map (in production, use Leaflet.js)
    mapContainer.innerHTML = `
        <div style="padding: 20px; display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #00B4A6, #7FD426); color: white; text-align: center;">
            <div>
                <div style="font-size: 3rem; margin-bottom: 10px;">🗺️</div>
                <p><strong>Interactive map would load here</strong></p>
                <p style="font-size: 0.9rem; margin-top: 10px;">In production: Use Leaflet.js + OpenStreetMap API</p>
                <p style="font-size: 0.9rem;">Features: Click to view beach details, weather overlay, crew locations</p>
            </div>
        </div>
    `;
}

/**
 * ============================================
 * CREWS SECTION
 * ============================================
 */

function initCrews() {
    const createCrewBtn = document.getElementById('createCrewBtn');
    const crewModal = document.getElementById('crewModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const crewForm = document.getElementById('crewForm');
    
    // Open modal
    createCrewBtn?.addEventListener('click', () => {
        crewModal?.setAttribute('aria-hidden', 'false');
    });
    
    // Close modal
    closeModalBtn?.addEventListener('click', () => {
        crewModal?.setAttribute('aria-hidden', 'true');
        crewForm?.reset();
    });
    
    // Close modal on outside click
    crewModal?.addEventListener('click', (e) => {
        if (e.target === crewModal) {
            crewModal.setAttribute('aria-hidden', 'true');
        }
    });
    
    // Handle form submission
    crewForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        createCrew();
    });
    
    renderCrews();
}

function renderCrews() {
    const crews = JSON.parse(localStorage.getItem('shorecrew_crews') || '[]');
    const crewsList = document.getElementById('crewsList');
    
    crewsList.innerHTML = crews.map(crew => `
        <article class="crew-card" role="article">
            <h3>${crew.name}</h3>
            <p class="crew-members">👥 ${crew.members} members</p>
            <div class="beach-card-meta">
                <div class="beach-meta-item">📍 ${crew.location}</div>
                <div class="beach-meta-item">📅 ${crew.nextCleanup}</div>
            </div>
            <div class="crew-actions">
                <button class="btn btn-primary" onclick="joinCrew(${crew.id})">Join</button>
                <button class="btn btn-secondary" onclick="viewCrew(${crew.id})">Details</button>
            </div>
        </article>
    `).join('');
}

function createCrew() {
    const name = document.getElementById('crewName')?.value;
    const location = document.getElementById('crewLocation')?.value;
    const size = parseInt(document.getElementById('crewSize')?.value);
    
    if (!name || !location || !size) {
        showToast('❌ Please fill in all fields', 'error');
        return;
    }
    
    const crews = JSON.parse(localStorage.getItem('shorecrew_crews') || '[]');
    const newCrew = {
        id: Math.max(...crews.map(c => c.id), 0) + 1,
        name,
        location,
        members: 1,
        nextCleanup: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    
    crews.push(newCrew);
    localStorage.setItem('shorecrew_crews', JSON.stringify(crews));
    
    document.getElementById('crewForm')?.reset();
    document.getElementById('crewModal')?.setAttribute('aria-hidden', 'true');
    
    showToast(`🎉 Crew "${name}" created successfully!`, 'success');
    renderCrews();
    updateStats();
}

function joinCrew(crewId) {
    const crews = JSON.parse(localStorage.getItem('shorecrew_crews') || '[]');
    const crew = crews.find(c => c.id === crewId);
    
    if (crew) {
        crew.members += 1;
        localStorage.setItem('shorecrew_crews', JSON.stringify(crews));
        showToast(`✅ You joined ${crew.name}!`, 'success');
        renderCrews();
        updateStats();
    }
}

function viewCrew(crewId) {
    const crews = JSON.parse(localStorage.getItem('shorecrew_crews') || '[]');
    const crew = crews.find(c => c.id === crewId);
    
    if (crew) {
        showToast(`👥 ${crew.name} has ${crew.members} members. Next cleanup: ${crew.nextCleanup}`, 'info');
    }
}

/**
 * ============================================
 * WEATHER SECTION
 * ============================================
 */

function initWeather() {
    renderWeather();
}

function renderWeather() {
    const weatherContainer = document.getElementById('weatherContainer');
    const weatherData = [
        { day: 'Mon', temp: 72, condition: 'Sunny', icon: '☀️', wind: '10 mph', humidity: '65%' },
        { day: 'Tue', temp: 68, condition: 'Cloudy', icon: '☁️', wind: '15 mph', humidity: '70%' },
        { day: 'Wed', temp: 70, condition: 'Partly Cloudy', icon: '⛅', wind: '12 mph', humidity: '68%' },
        { day: 'Thu', temp: 65, condition: 'Rainy', icon: '🌧️', wind: '20 mph', humidity: '85%' },
    ];
    
    weatherContainer.innerHTML = weatherData.map(data => `
        <div class="weather-card">
            <div class="weather-icon">${data.icon}</div>
            <div class="weather-day" style="font-weight: 600; margin-bottom: 8px;">${data.day}</div>
            <div class="weather-temp">${data.temp}°F</div>
            <div class="weather-condition">${data.condition}</div>
            <div class="weather-details">
                <div>💨 ${data.wind}</div>
                <div>💧 ${data.humidity}</div>
            </div>
        </div>
    `).join('');
}

/**
 * ============================================
 * STATS SECTION
 * ============================================
 */

function initStats() {
    updateStats();
}

function updateStats() {
    const stats = JSON.parse(localStorage.getItem('shorecrew_stats') || '{}');
    const crews = JSON.parse(localStorage.getItem('shorecrew_crews') || '[]');
    
    document.getElementById('cleanupCount').textContent = stats.cleanups || 0;
    document.getElementById('volunteerCount').textContent = stats.volunteers || 0;
    document.getElementById('trashCount').textContent = stats.trash || 0;
    document.getElementById('crewCount').textContent = crews.length || 0;
}

/**
 * ============================================
 * PERFORMANCE OPTIMIZATION
 * ============================================
 */

/**
 * Lazy load images and content
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Register Service Worker for offline support
 */
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker not available in development
        });
    }
}

/**
 * ============================================
 * INITIALIZATION
 * ============================================
 */

/**
 * Initialize all app features
 */
function initApp() {
    console.log('🌊 ShoreSquad App Initializing...');
    
    // Initialize data
    initLocalStorage();
    
    // Initialize UI components
    initNavbar();
    initHero();
    initBeaches();
    initCrews();
    initWeather();
    initStats();
    
    // Initialize performance features
    initLazyLoading();
    registerServiceWorker();
    
    // Accessibility: Skip to main content
    document.addEventListener('keydown', (e) => {
        if (e.altKey && e.key === 'm') {
            document.querySelector('main')?.focus();
        }
    });
    
    console.log('✅ ShoreSquad App Ready!');
}

// Start app when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

/**
 * ============================================
 * ERROR HANDLING
 * ============================================
 */

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
    showToast('❌ An error occurred. Please try again.', 'error');
});

// Prevent memory leaks
window.addEventListener('beforeunload', () => {
    // Cleanup if needed
    console.log('🌊 ShoreSquad App Closing');
});
