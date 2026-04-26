// API Configuration
const API_KEYS = {
    github: process.env.GITHUB_TOKEN || 'demo',
    openWeather: process.env.OPENWEATHER_API_KEY || 'demo',
    unsplash: process.env.UNSPLASH_API_KEY || 'demo',
    newsapi: process.env.NEWSAPI_KEY || 'demo',
    giphy: process.env.GIPHY_API_KEY || 'demo',
};

const API_ENDPOINTS = {
    github: 'https://api.github.com',
    openWeather: 'https://api.openweathermap.org',
    unsplash: 'https://api.unsplash.com',
    newsapi: 'https://newsapi.org',
    openLibrary: 'https://openlibrary.org',
    jsonplaceholder: 'https://jsonplaceholder.typicode.com',
    restCountries: 'https://restcountries.com/v3.1',
    coingecko: 'https://api.coingecko.com/api/v3',
    giphy: 'https://api.giphy.com/v1/gifs',
};

// Utility Functions
function cacheGet(key) {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const data = JSON.parse(cached);
    if (Date.now() - data.timestamp > 3600000) return null; // 1 hour cache
    return data.value;
}

function cacheSet(key, value) {
    localStorage.setItem(key, JSON.stringify({
        value,
        timestamp: Date.now()
    }));
}

async function fetchWithCache(key, fetchFn) {
    const cached = cacheGet(key);
    if (cached) return cached;

    try {
        const data = await fetchFn();
        cacheSet(key, data);
        return data;
    } catch (error) {
        console.error(`Error fetching ${key}:`, error);
        return null;
    }
}

// 1. Weather API Integration
async function loadWeather() {
    try {
        const data = await fetchWithCache('weather', async () => {
            const response = await fetch(`${API_ENDPOINTS.openWeather}/data/2.5/weather?q=Tokyo&appid=${API_KEYS.openWeather}&units=metric`);
            if (!response.ok) {
                throw new Error('Weather API error');
            }
            return response.json();
        });

        if (data) {
            document.getElementById('weatherTemp').textContent = `${Math.round(data.main.temp)}°C`;
            document.getElementById('weatherDesc').textContent = data.weather[0].main;
        }
    } catch (error) {
        console.error('Weather error:', error);
        document.getElementById('weatherWidget').style.display = 'none';
    }
}

// 2. GitHub API Integration
async function loadProjects() {
    try {
        const data = await fetchWithCache('github-projects', async () => {
            // Using mock data for demo
            return [
                { name: 'Portfolio Site', description: 'Modern portfolio built with vanilla JS', stars: 42, language: 'JavaScript', url: '#' },
                { name: 'API Dashboard', description: 'Real-time API monitoring dashboard', stars: 128, language: 'React', url: '#' },
                { name: 'Web Scraper', description: 'Efficient data scraping tool', stars: 89, language: 'Python', url: '#' },
            ];
        });

        const grid = document.getElementById('projectsGrid');
        grid.innerHTML = data.map(project => `
            <div class="project-card">
                <h3>${project.name}</h3>
                <p>${project.description}</p>
                <div class="project-meta">
                    <span class="project-tag">${project.language}</span>
                    <span class="project-tag">Stars: ${project.stars}</span>
                </div>
                <div class="project-stats">
                    <span>Active Development</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('GitHub error:', error);
    }
}

// 3. Skills from JSONPlaceholder
async function loadSkills() {
    try {
        const data = await fetchWithCache('skills', async () => {
            return [
                { name: 'JavaScript', proficiency: 95 },
                { name: 'React', proficiency: 90 },
                { name: 'HTML/CSS', proficiency: 95 },
                { name: 'Node.js', proficiency: 85 },
                { name: 'Python', proficiency: 80 },
                { name: 'Web APIs', proficiency: 90 },
                { name: 'Git', proficiency: 85 },
                { name: 'UI/UX Design', proficiency: 80 },
            ];
        });

        const grid = document.getElementById('skillsGrid');
        grid.innerHTML = data.map(skill => `
            <div class="skill-card">
                <h3>${skill.name}</h3>
                <div class="proficiency">
                    <span>Proficiency: ${skill.proficiency}%</span>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Skills error:', error);
    }
}

// 4. Countries REST API
async function loadCountries() {
    try {
        const data = await fetchWithCache('countries', async () => {
            const response = await fetch(`${API_ENDPOINTS.restCountries}/all`);
            if (!response.ok) throw new Error('Countries API error');
            const allCountries = await response.json();
            // Get a selection of countries
            return allCountries.slice(0, 6).map(c => ({
                name: c.name.common,
                capital: c.capital ? c.capital[0] : 'N/A',
                region: c.region,
            }));
        });

        const grid = document.getElementById('countriesGrid');
        grid.innerHTML = data.map(country => `
            <div class="country-card">
                <h3>${country.name}</h3>
                <div class="region">${country.region}</div>
                <div class="region">Capital: ${country.capital}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Countries error:', error);
    }
}

// 5. Open Library API
async function loadBooks() {
    try {
        const data = await fetchWithCache('books', async () => {
            const response = await fetch(`${API_ENDPOINTS.openLibrary}/search.json?q=programming&limit=6`);
            if (!response.ok) throw new Error('Open Library error');
            const result = await response.json();
            return result.docs.slice(0, 6).map(book => ({
                title: book.title,
                author: book.author_name ? book.author_name[0] : 'Unknown',
                year: book.first_publish_year || 'N/A',
            }));
        });

        const grid = document.getElementById('readingGrid');
        grid.innerHTML = data.map(book => `
            <div class="book-card">
                <h3>${book.title}</h3>
                <div class="author">By ${book.author}</div>
                <div class="year">Published: ${book.year}</div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Books error:', error);
    }
}

// 6. News API
async function loadNews() {
    try {
        const data = await fetchWithCache('news', async () => {
            const response = await fetch(`${API_ENDPOINTS.newsapi}/v2/top-headlines?category=technology&sortBy=publishedAt&pageSize=6&apiKey=${API_KEYS.newsapi}`);
            if (!response.ok) throw new Error('News API error');
            const result = await response.json();
            return result.articles || [];
        });

        const grid = document.getElementById('newsGrid');
        if (data && data.length > 0) {
            grid.innerHTML = data.slice(0, 6).map(article => `
                <div class="news-card">
                    <h3>${article.title}</h3>
                    <div class="source">${article.source.name}</div>
                    <p>${article.description || 'No description available'}</p>
                    <div class="timestamp">${new Date(article.publishedAt).toLocaleDateString()}</div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('News error:', error);
        document.getElementById('newsGrid').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Unable to load news</p>';
    }
}

// 7. CoinGecko API
async function loadCrypto() {
    try {
        const data = await fetchWithCache('crypto', async () => {
            const response = await fetch(`${API_ENDPOINTS.coingecko}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=6&sparkline=false`);
            if (!response.ok) throw new Error('CoinGecko error');
            return response.json();
        });

        const grid = document.getElementById('cryptoGrid');
        grid.innerHTML = data.slice(0, 6).map(coin => {
            const change = coin.price_change_percentage_24h || 0;
            const isPositive = change >= 0;
            return `
                <div class="crypto-card">
                    <h3>${coin.name}</h3>
                    <div class="crypto-price">$${coin.current_price.toLocaleString()}</div>
                    <div class="crypto-change ${isPositive ? 'positive' : 'negative'}">
                        ${isPositive ? '+' : ''}${change.toFixed(2)}%
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Crypto error:', error);
    }
}

// 8. Unsplash API - Gallery
async function loadGallery() {
    try {
        const data = await fetchWithCache('gallery', async () => {
            const response = await fetch(`${API_ENDPOINTS.unsplash}/photos/random?count=6&client_id=${API_KEYS.unsplash}`);
            if (!response.ok) throw new Error('Unsplash error');
            return response.json();
        });

        const grid = document.getElementById('galleryGrid');
        grid.innerHTML = data.slice(0, 6).map(photo => `
            <a href="${photo.links.html}" target="_blank" class="gallery-item">
                <img src="${photo.urls.small}" alt="${photo.alt_description || 'Gallery image'}" loading="lazy">
            </a>
        `).join('');
    } catch (error) {
        console.error('Gallery error:', error);
        // Fallback: use Giphy API if Unsplash fails
        loadGalleryFallback();
    }
}

// 9. Giphy API - Gallery Fallback
async function loadGalleryFallback() {
    try {
        const data = await fetchWithCache('gallery-fallback', async () => {
            const response = await fetch(`${API_ENDPOINTS.giphy}/search?q=abstract&limit=6&api_key=${API_KEYS.giphy}`);
            if (!response.ok) throw new Error('Giphy error');
            return response.json();
        });

        const grid = document.getElementById('galleryGrid');
        grid.innerHTML = data.data.slice(0, 6).map(gif => `
            <a href="${gif.url}" target="_blank" class="gallery-item">
                <img src="${gif.images.fixed_height.url}" alt="Gallery image" loading="lazy">
            </a>
        `).join('');
    } catch (error) {
        console.error('Giphy error:', error);
        document.getElementById('galleryGrid').innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-secondary);">Unable to load gallery</p>';
    }
}

// Hero description with dynamic text
function updateHeroDescription() {
    const descriptions = [
        'Building digital experiences with modern technologies',
        'Crafting elegant solutions to complex problems',
        'Creating seamless user interfaces and experiences',
    ];
    const index = Math.floor(Date.now() / 3000) % descriptions.length;
    document.getElementById('heroDescription').textContent = descriptions[index];
}

// Initialize all sections
async function initializePortfolio() {
    updateHeroDescription();
    setInterval(updateHeroDescription, 3000);

    // Load all data in parallel
    await Promise.all([
        loadWeather(),
        loadProjects(),
        loadSkills(),
        loadCountries(),
        loadBooks(),
        loadNews(),
        loadCrypto(),
        loadGallery(),
    ]);
}

// Start when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initializePortfolio();
});
