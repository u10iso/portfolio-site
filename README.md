# Portfolio Site

A modern, minimalist portfolio website showcasing projects and skills using 10 integrated APIs.

## Features

- **Weather Integration** - Real-time weather data using OpenWeatherMap API
- **GitHub Projects** - Display your projects with GitHub API
- **Technical Skills** - Showcase your technical expertise
- **Visited Countries** - Track countries you have visited using REST Countries API
- **Reading List** - Display books from your reading list using Open Library API
- **Tech News Feed** - Latest technology news using NewsAPI
- **Crypto Assets** - Display cryptocurrency prices using CoinGecko API
- **Image Gallery** - Beautiful image gallery using Unsplash and Giphy APIs
- **Responsive Design** - Fully responsive layout for mobile, tablet, and desktop
- **Modern Aesthetics** - Gradient-based design with smooth animations

## APIs Used

1. **GitHub API** - Repository and project information
2. **OpenWeatherMap API** - Weather data
3. **Unsplash API** - Stock photography
4. **NewsAPI** - Tech news articles
5. **REST Countries API** - Country information
6. **Open Library API** - Book information
7. **JSONPlaceholder** - Mock data for skills
8. **CoinGecko API** - Cryptocurrency prices
9. **Giphy API** - Animated GIFs
10. **Local Storage Cache** - Data caching mechanism

## Setup

### Prerequisites

- Modern web browser
- API keys for:
  - GitHub (optional)
  - OpenWeatherMap
  - Unsplash
  - NewsAPI
  - Giphy

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-site.git
   cd portfolio-site
   ```

2. Create a `.env` file based on `.env.example`
   ```bash
   cp .env.example .env
   ```

3. Add your API keys to `.env`

4. Run a local server
   ```bash
   python -m http.server 8000
   # or
   npx http-server
   ```

5. Open `http://localhost:8000` in your browser

## Environment Variables

```env
GITHUB_TOKEN=your_github_token
OPENWEATHER_API_KEY=your_openweather_key
UNSPLASH_API_KEY=your_unsplash_key
NEWSAPI_KEY=your_newsapi_key
GIPHY_API_KEY=your_giphy_key
```

## Deployment

This site is configured for easy deployment on Vercel.

1. Push to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Your site will be live automatically on every push to main.

## File Structure

```
portfolio-site/
├── index.html      # Main HTML structure
├── styles.css      # Styling with gradients and animations
├── app.js          # API integration and functionality
├── .env.example    # Example environment variables
├── .gitignore      # Git ignore rules
├── vercel.json     # Vercel configuration
└── README.md       # This file
```

## Design

- **Color Scheme**: Modern gradients with neutral base (blacks, grays, whites)
- **Typography**: System fonts for optimal performance
- **Animations**: Smooth transitions and floating effects
- **Spacing**: Clean, Apple-inspired minimal design
- **No Emojis**: Professional, emoji-free interface
- **Responsive**: Mobile-first, fully responsive layout

## Performance

- Caching: 1-hour cache for API data using localStorage
- Lazy Loading: Images load on demand
- Optimized: Minimalist design for fast load times
- CDN: Compatible with Vercel edge caching

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT

## Author

Your Name - Portfolio Site

## Contributing

Feel free to fork and submit pull requests for any improvements.
# Portfolio Site - Modern Design with 10 APIs
