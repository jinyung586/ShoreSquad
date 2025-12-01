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
    try {
        const searchInput = document.getElementById('searchInput');
        const locationBtn = document.getElementById('locationBtn');
        
        // Search beaches
        searchInput?.addEventListener('input', debounce(() => {
            try {
                filterBeaches();
            } catch (error) {
                console.error('Error filtering beaches:', error);
            }
        }, 300));
        
        // Get user location
        locationBtn?.addEventListener('click', () => {
            try {
                if (navigator.geolocation) {
                    locationBtn.disabled = true;
                    locationBtn.textContent = '📍 Locating...';
                    
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            showToast('📍 Location detected! Showing nearby beaches.', 'success');
                            locationBtn.disabled = false;
                            locationBtn.textContent = '📍 Use My Location';
                            renderBeaches();
                        },
                        (error) => {
                            showToast('❌ Unable to access location. Please enable location permissions.', 'error');
                            locationBtn.disabled = false;
                            locationBtn.textContent = '📍 Use My Location';
                        }
                    );
                }
            } catch (error) {
                console.error('Error getting location:', error);
                showToast('❌ Error accessing location services', 'error');
            }
        });
        
        renderBeaches();
        initMap();
    } catch (error) {
        console.error('Error initializing beaches:', error);
        showToast('❌ Error loading beaches section', 'error');
    }
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
    try {
        const mapContainer = document.getElementById('beachesMap');
        
        if (!mapContainer) {
            console.warn('Map container not found');
            return;
        }
        
        // Clear the container
        mapContainer.innerHTML = '';
        mapContainer.style.height = '400px';
        
        // Initialize Leaflet map - centered on Singapore
        const map = L.map('beachesMap').setView([1.3521, 103.8198], 11);
        
        // Add OpenStreetMap tiles with error handling
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
            errorTileUrl: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><rect fill="%23f0f0f0" width="256" height="256"/><text x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle" font-size="14" fill="%23999">Tile Load Error</text></svg>'
        }).addTo(map);
        
        // Get beaches from localStorage
        const beaches = JSON.parse(localStorage.getItem('shorecrew_beaches') || '[]');
        
        // Define actual beach coordinates in Singapore area
        const beachCoordinates = {
            1: { lat: 1.3521, lng: 103.8198, name: 'Santa Monica Beach' },
            2: { lat: 1.3624, lng: 103.7995, name: 'Malibu Beach' },
            3: { lat: 1.3044, lng: 103.8063, name: 'Venice Beach' },
            4: { lat: 1.4082, lng: 103.7618, name: 'Long Beach' },
        };
        
        // Add markers for each beach
        beaches.forEach(beach => {
            try {
                const coords = beachCoordinates[beach.id] || { lat: 1.3521, lng: 103.8198 };
                
                const marker = L.marker([coords.lat, coords.lng], {
                    title: beach.name,
                    icon: L.icon({
                        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41]
                    })
                }).addTo(map);
                
                // Create popup content
                const popupContent = `
                    <div style="font-weight: bold; margin-bottom: 8px;">${beach.name}</div>
                    <div style="font-size: 0.9rem; margin-bottom: 8px;">📍 ${beach.location}</div>
                    <div style="font-size: 0.9rem; margin-bottom: 8px;">⭐ ${beach.difficulty}</div>
                    <div style="font-size: 0.9rem; margin-bottom: 10px;">Recent cleanups: ${beach.cleanups}</div>
                    <button onclick="selectBeach(${beach.id})" style="padding: 6px 12px; background-color: #0066CC; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">Schedule Cleanup</button>
                `;
                
                marker.bindPopup(popupContent);
            } catch (error) {
                console.error(`Error adding marker for ${beach.name}:`, error);
            }
        });
        
        // Add Pasir Ris cleanup location marker
        try {
            const pasirRisMarker = L.marker([1.381497, 103.955574], {
                title: 'Next Cleanup - Pasir Ris',
                icon: L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            }).addTo(map);
            
            pasirRisMarker.bindPopup(`
                <div style="font-weight: bold; margin-bottom: 8px; color: #D32F2F;">🎯 Next Cleanup Location</div>
                <div style="font-size: 0.9rem; margin-bottom: 8px;">Pasir Ris, Singapore</div>
                <div style="font-size: 0.9rem; margin-bottom: 8px;">📍 1.381497, 103.955574</div>
                <div style="font-size: 0.9rem; margin-bottom: 10px;">🏷️ Street View Asia</div>
                <button onclick="selectBeach(0)" style="padding: 6px 12px; background-color: #D32F2F; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">Register for Cleanup</button>
            `);
            
            // Open Pasir Ris popup by default
            pasirRisMarker.openPopup();
        } catch (error) {
            console.error('Error adding Pasir Ris marker:', error);
        }
    } catch (error) {
        console.error('Error initializing map:', error);
        showToast('⚠️ Map failed to load. Some features may be unavailable.', 'warning');
    }
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
    fetchNEAWeather();
    // Refresh weather data every 30 minutes
    setInterval(fetchNEAWeather, 30 * 60 * 1000);
}

/**
 * Fetch real-time weather data from NEA API (data.gov.sg)
 */
function fetchNEAWeather() {
    const weatherContainer = document.getElementById('weatherContainer');
    
    try {
        // Show loading state
        weatherContainer.innerHTML = '<div class="loading-container"><div class="spinner"></div><span>Loading weather data...</span></div>';
        
        Promise.all([
            fetch('https://api.data.gov.sg/v1/environment/air-temperature')
                .then(res => {
                    if (!res.ok) throw new Error(`Temperature API failed: ${res.status}`);
                    return res.json();
                }),
            fetch('https://api.data.gov.sg/v1/environment/relative-humidity')
                .then(res => {
                    if (!res.ok) throw new Error(`Humidity API failed: ${res.status}`);
                    return res.json();
                }),
            fetch('https://api.data.gov.sg/v1/environment/wind-speed')
                .then(res => {
                    if (!res.ok) throw new Error(`Wind API failed: ${res.status}`);
                    return res.json();
                })
        ])
        .then(([tempData, humidityData, windData]) => {
            renderNEAWeather(tempData, humidityData, windData);
        })
        .catch(error => {
            console.error('Error fetching weather:', error);
            showToast('⚠️ Unable to load real-time weather. Showing default forecast.', 'warning');
            renderDefaultWeather();
        });
    } catch (error) {
        console.error('Weather initialization error:', error);
        showToast('❌ Error loading weather section', 'error');
        renderDefaultWeather();
    }
}

/**
 * Render weather data from NEA API
 */
function renderNEAWeather(tempData, humidityData, windData) {
    try {
        const weatherContainer = document.getElementById('weatherContainer');
        
        // Extract station data and get current readings
        const tempStations = tempData.metadata?.stations || [];
        const humidityStations = humidityData.metadata?.stations || [];
        const windStations = windData.metadata?.stations || [];
        
        // Get readings from the last data point
        const latestTemp = tempData.items?.[0]?.readings || [];
        const latestHumidity = humidityData.items?.[0]?.readings || [];
        const latestWind = windData.items?.[0]?.readings || [];
        
        // Create a consolidated view of available data
        const stations = new Map();
        
        latestTemp.forEach(reading => {
            if (!stations.has(reading.station_id)) {
                stations.set(reading.station_id, {});
            }
            stations.get(reading.station_id).temp = reading.value;
        });
        
        latestHumidity.forEach(reading => {
            if (!stations.has(reading.station_id)) {
                stations.set(reading.station_id, {});
            }
            stations.get(reading.station_id).humidity = reading.value;
        });
        
        latestWind.forEach(reading => {
            if (!stations.has(reading.station_id)) {
                stations.set(reading.station_id, {});
            }
            stations.get(reading.station_id).wind = reading.value;
        });
        
        // Get station names
        const stationNames = new Map();
        tempStations.forEach(station => {
            stationNames.set(station.id, station.name);
        });
        
        // Display top 4 stations with data
        let displayCount = 0;
        const weatherCards = [];
        
        stations.forEach((data, stationId) => {
            if (displayCount >= 4) return;
            
            const stationName = stationNames.get(stationId) || `Station ${stationId}`;
            const temp = data.temp || 'N/A';
            const humidity = data.humidity || 'N/A';
            const wind = data.wind || 'N/A';
            
            // Determine weather icon based on conditions
            let icon = '🌤️';
            let condition = 'Partly Cloudy';
            
            if (humidity > 80) {
                icon = '🌧️';
                condition = 'Humid/Rainy';
            } else if (humidity > 70) {
                icon = '☁️';
                condition = 'Cloudy';
            } else if (temp > 30) {
                icon = '☀️';
                condition = 'Sunny & Warm';
            }
            
            const tempC = typeof temp === 'number' ? temp.toFixed(1) : temp;
            const humidityPct = typeof humidity === 'number' ? humidity.toFixed(0) : humidity;
            const windSpeed = typeof wind === 'number' ? wind.toFixed(1) : wind;
            
            weatherCards.push(`
                <div class="weather-card">
                    <div class="weather-icon">${icon}</div>
                    <div class="weather-day" style="font-weight: 600; margin-bottom: 8px; font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${stationName}</div>
                    <div class="weather-temp">${tempC}°C</div>
                    <div class="weather-condition">${condition}</div>
                    <div class="weather-details">
                        <div>💨 ${windSpeed} m/s</div>
                        <div>💧 ${humidityPct}%</div>
                    </div>
                </div>
            `);
            
            displayCount++;
        });
        
        if (weatherCards.length === 0) {
            renderDefaultWeather();
            return;
        }
        
        weatherContainer.innerHTML = weatherCards.join('');
        
        // Add attribution
        const attribution = document.createElement('div');
        attribution.style.cssText = 'grid-column: 1/-1; text-align: center; font-size: 0.8rem; color: #666; margin-top: 10px; padding-top: 10px; border-top: 1px solid #eee;';
        attribution.innerHTML = 'Data source: NEA (National Environment Agency) via <a href="https://data.gov.sg" target="_blank" rel="noopener">data.gov.sg</a>';
        weatherContainer.appendChild(attribution);
    } catch (error) {
        console.error('Error rendering weather:', error);
        showToast('❌ Error processing weather data', 'error');
        renderDefaultWeather();
    }
}

/**
 * Fallback weather display
 */
function renderDefaultWeather() {
    try {
        const weatherContainer = document.getElementById('weatherContainer');
        const weatherData = [
            { day: 'Today', temp: '28-30', condition: 'Partly Cloudy', icon: '⛅', wind: '10 m/s', humidity: '70%' },
            { day: 'Tomorrow', temp: '27-29', condition: 'Cloudy', icon: '☁️', wind: '12 m/s', humidity: '75%' },
            { day: 'Day 3', temp: '26-28', condition: 'Rainy', icon: '🌧️', wind: '15 m/s', humidity: '85%' },
            { day: 'Day 4', temp: '27-30', condition: 'Sunny', icon: '☀️', wind: '8 m/s', humidity: '65%' },
        ];
        
        weatherContainer.innerHTML = weatherData.map(data => `
            <div class="weather-card">
                <div class="weather-icon">${data.icon}</div>
                <div class="weather-day" style="font-weight: 600; margin-bottom: 8px;">${data.day}</div>
                <div class="weather-temp">${data.temp}°C</div>
                <div class="weather-condition">${data.condition}</div>
                <div class="weather-details">
                    <div>💨 ${data.wind}</div>
                    <div>💧 ${data.humidity}</div>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error rendering default weather:', error);
    }
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
    try {
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
    } catch (error) {
        console.error('Critical error during app initialization:', error);
        showToast('❌ Error initializing app. Some features may not work.', 'error');
    }
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
