# ShoreSquad 🌊

**Rally your crew, track weather, and hit the next beach cleanup with our dope map app!**

## Project Overview

ShoreSquad is a progressive web application (PWA) designed to mobilize young people to clean beaches. It combines interactive maps, real-time weather tracking, and social features to make eco-action fun and connected.

### Key Features

- 🗺️ **Interactive Beach Mapping** - Find nearby beaches and cleanup hotspots
- 🌦️ **Weather Integration** - Real-time forecasts to plan perfect cleanup days
- 👥 **Crew Management** - Create or join cleanup crews in your area
- 📱 **Mobile-First** - Optimized for phones and tablets
- 🚀 **PWA Capabilities** - Works offline with service workers
- ♿ **Accessible** - WCAG 2.1 AA compliant for all users
- ⚡ **Lightning Fast** - Lazy loading and optimized performance

## Colour Palette

Our design uses ocean and eco-inspired colours targeting young, environmentally conscious users:

| Colour | Code | Usage |
|--------|------|-------|
| **Ocean Blue** | #0066CC | Primary brand, CTAs, headings |
| **Teal** | #00B4A6 | Secondary accent, interactive elements |
| **Lime Green** | #7FD426 | Eco-action highlight, energy |
| **Sandy Beige** | #F4E4C1 | Warmth, approachability |
| **Dark Charcoal** | #2C3E50 | Text, contrast, footer |
| **Off-White** | #FAFAFA | Background, cleanliness |

## JavaScript Features

### Interactivity
- **Geolocation API** - Auto-detect user location for nearby beaches
- **Event Listeners** - Smooth navigation, form handling, modal interactions
- **DOM Manipulation** - Dynamic rendering of beaches, crews, weather data
- **State Management** - LocalStorage for offline data persistence

### Performance
- **Debouncing** - Efficient search input handling
- **Lazy Loading** - Intersection Observer for images and content
- **Service Workers** - Offline support and faster load times
- **IndexedDB Ready** - Structure for advanced data caching

### APIs Integration Ready
- **Fetch API** - Weather data from OpenWeatherMap (implementation ready)
- **Leaflet.js** - Interactive maps (can be integrated)
- **Web Notifications** - Event reminders and alerts
- **LocalStorage & IndexedDB** - Offline-first architecture

## UX Design Principles

1. **Mobile-First Design** - Primary experience optimized for phones
2. **Accessibility (WCAG 2.1 AA)**
   - Semantic HTML structure
   - ARIA labels for screen readers
   - Sufficient colour contrast (4.5:1 minimum)
   - Keyboard navigation support
   - Focus indicators for all interactive elements

3. **User-Centric Features**
   - Clear call-to-action buttons
   - Intuitive crew management
   - One-click location detection
   - Social proof (crew size, cleanup stats)

4. **Visual Hierarchy**
   - Bold typography for headings
   - Consistent spacing and alignment
   - Distinct button styles
   - Card-based layout for content

5. **Performance & Speed**
   - Minimal dependencies
   - Optimized CSS (variables, grid layouts)
   - Progressive enhancement
   - Prefers-reduced-motion support

6. **Micro-interactions**
   - Button hover effects
   - Smooth scrolling
   - Toast notifications
   - Loading states

## Project Structure

```
ShoreSquad/
├── index.html          # HTML5 boilerplate with semantic markup
├── css/
│   └── styles.css      # Complete responsive styles with accessibility
├── js/
│   └── app.js          # Interactive features and app logic
├── manifest.json       # PWA manifest for installability
├── .gitignore          # Git configuration
├── .vscode/
│   └── settings.json   # Live Server and editor configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code with Live Server extension (recommended)
- Git for version control

### Installation

1. **Clone or open the project:**
   ```bash
   cd ShoreSquad
   ```

2. **Start Live Server:**
   - Open `index.html` in VS Code
   - Click "Go Live" in the bottom right corner
   - Browser opens at `http://localhost:5500`

3. **Or use any HTTP server:**
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js
   npx http-server
   ```

### Development Workflow

1. Edit files in your preferred editor
2. Live Server automatically refreshes on save
3. Check console (F12) for any errors
4. Test on mobile devices using local IP

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Mobile browsers | ✅ Full |

## Features Roadmap

### Phase 1 (Current)
- ✅ Beach discovery
- ✅ Crew management
- ✅ Weather forecast
- ✅ Impact statistics

### Phase 2 (Planned)
- 🔄 Real Leaflet.js maps integration
- 🔄 OpenWeatherMap API integration
- 🔄 User authentication
- 🔄 Event scheduling system
- 🔄 Photo gallery for cleanup events

### Phase 3 (Future)
- 🔄 Social sharing features
- 🔄 Achievement badges
- 🔄 Leaderboards
- 🔄 Push notifications
- 🔄 Backend database integration

## Git Configuration

The project includes a `.gitignore` file configured for:
- Node modules and dependencies
- OS files (.DS_Store, Thumbs.db)
- IDE configuration files
- Build artifacts and logs
- Environment files (.env)

### Initial Git Setup

```bash
git init
git add .
git commit -m "Initial ShoreSquad project setup"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

## Accessibility Features

- **Semantic HTML** - Proper use of `<nav>`, `<main>`, `<section>`, `<article>`
- **ARIA Labels** - `aria-label`, `aria-labelledby`, `aria-hidden` attributes
- **Keyboard Navigation** - All interactive elements accessible via keyboard
- **Focus Management** - Visible focus indicators on all buttons and links
- **Colour Contrast** - 4.5:1 minimum ratio for readability
- **Reduced Motion** - Respects `prefers-reduced-motion` user preference

## Performance Metrics

- **Lighthouse Score Target:** 90+
- **Page Load Time:** < 2 seconds
- **First Contentful Paint:** < 1 second
- **Mobile Friendly:** 100% responsive

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "Add your feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

## License

MIT License - Feel free to use this project for educational and commercial purposes.

## Support

For issues or questions:
- 📧 Email: hello@shorecrew.app
- 🐛 GitHub Issues: [Report a bug](https://github.com/shorecrew/app/issues)
- 💬 Community: [Join our Discord](https://discord.gg/shorecrew)

## Team & Credits

Built with 🌊 and passion for clean oceans by the ShoreSquad team.

---

**Let's keep our beaches clean together! 🏖️♻️**
