# ShoreSquad 

**Rally your crew, track weather, and hit the next beach cleanup with ShoreSquad** - a modern, responsive web application for organizing and coordinating beach cleanup activities.

##  Features

### Core Features
- ** Interactive Beach Map** - Explore beaches on an interactive map with real-time marker locations (Leaflet.js + OpenStreetMap)
- ** Next Cleanup Tracker** - Google Maps embed showing your next cleanup location (Pasir Ris, Singapore: 1.381497, 103.955574)
- ** Crew Management** - Create and join cleanup crews, track members and next scheduled cleanups
- ** Real-time Weather** - Live weather data from NEA (National Environment Agency) via data.gov.sg
- ** Impact Dashboard** - Track cleanups organized, volunteers involved, waste removed, and active crews
- ** Fully Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- ** Accessible** - WCAG compliant with keyboard navigation and screen reader support
- ** Robust Error Handling** - Try/catch blocks, loading spinners, user feedback

##  Quick Start

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No server setup required!

### Run Locally

**Option A: VS Code Live Server (Recommended)**
- Install "Live Server" extension by Ritwick Dey
- Right-click index.html  "Open with Live Server"
- Browser opens at http://127.0.0.1:5500

**Option B: Python**
\\\ash
python -m http.server 8000
\\\
Then visit http://localhost:8000

**Option C: Node.js**
\\\ash
npm install -g http-server
http-server
\\\

##  Usage Guide

### Main Features
1. **Find Your Beach** - Search beaches or use location detection
2. **Interactive Map** - Click markers for details and scheduling
3. **Join a Crew** - Create or join cleanup crews
4. **Weather** - Real-time conditions from 4 NEA stations
5. **Next Cleanup** - Pasir Ris beach location on Google Map
6. **Impact** - Track collective cleanup statistics

### Creating a Crew
1. Click "Create Crew" button
2. Enter crew name, location, target size
3. You become the first member
4. Invite friends to grow your crew

##  Technical Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Mapping:** Leaflet.js v1.9.4 + OpenStreetMap
- **Weather API:** NEA Real-time Weather Readings (data.gov.sg)
- **Storage:** Browser LocalStorage
- **No build process needed** - pure static site

##  Error Handling

- Try/Catch wrapped functions
- Loading spinners during API calls
- Graceful fallbacks for failed APIs
- User feedback via toast notifications
- Console logging for debugging

##  Responsive Design

- **Desktop:** Full multi-column layouts
- **Tablet:** 2-column optimized view
- **Mobile:** Single-column, touch-friendly

##  Browser Support

- Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

##  Accessibility (WCAG 2.1 Level AA)

- Semantic HTML with ARIA labels
- Full keyboard navigation
- High contrast colors (4.5:1 ratio)
- Focus indicators on all interactive elements
- Screen reader support

##  Data Privacy

- All data stored locally in browser
- No tracking or analytics scripts
- No user login required
- Connects only to public government APIs
- No data sent to external servers

##  Deployment

### GitHub Pages (Free & Easy)

1. Go to Repository Settings  Pages
2. Source: Deploy from a branch
3. Branch: main, Folder: / (root)
4. Click "Save"

Access at: https://jinyung586.github.io/ShoreSquad

Auto-updates on every push to main!

##  Contributing

1. Fork the repository
2. Create feature branch: git checkout -b feature/amazing-feature
3. Commit: git commit -m 'Add feature'
4. Push: git push origin feature/amazing-feature
5. Open Pull Request

##  License

MIT License - Use freely for any purpose

##  Credits

- Leaflet.js team for mapping library
- OpenStreetMap contributors
- NEA for real-time weather data
- data.gov.sg for public APIs
- Google Maps for cleanup location embed

##  Support

- Report bugs: GitHub Issues
- Questions: Check console (F12) for errors
- Cache issues: Clear browsing data

##  About ShoreSquad

Making beach cleanup easy and impactful. We empower volunteers to keep beaches clean through technology and community.

**Let's keep our beaches clean, together! **

---
**Version:** 1.0.0 | **Status:** Live & Maintained | **Last Updated:** December 2025
