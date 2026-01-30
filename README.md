# Green Haven Arboretum Website

A fully responsive, modern website for a Public Garden/Arboretum built with HTML, CSS, JavaScript, and Bootstrap 5.

## 🌿 Features

### Design & Visual Effects
- **Glassmorphism** design with soft 3D card effects
- **3 color scheme**: Forest Green, Leaf Light Green, Earth Brown (with shades/opacity variations only)
- **Smooth animations** on scroll and hover
- **Parallax scrolling** for garden backgrounds
- **Floating leaf animations**
- **Gradient text effects** using allowed colors
- **Professional typography** with serif + sans-serif font pairing

### Pages & Sections
1. **Home Page**
   - Hero section with 3D animated garden background
   - Welcome text with animated typing effect
   - Call-to-action buttons
   - Featured collections with hover animations
   - Animated counters for statistics

2. **Interactive Garden Map**
   - Clickable garden zones with hover effects
   - Zone information panel
   - Map legend
   - Featured zone details

3. **Event Calendar**
   - Monthly calendar layout
   - Event filtering by category (workshops, tours, kids events)
   - Event cards with 3D tilt effects
   - Registration functionality

4. **Membership Page**
   - 3D flip animation on membership cards
   - Membership form with validation
   - Benefits section with icon animations
   - Multiple membership tiers

### Common Features (All Pages)
- **Responsive header** with navigation and theme toggle
- **Mobile-friendly** hamburger menu (offcanvas)
- **Theme toggle** (Light/Dark mode)
- **4-column footer** with newsletter form
- **Back-to-top button**
- **Smooth scroll navigation**
- **Newsletter subscription**

## 📱 Responsive Design

- **Mobile-first approach** with breakpoints at 576px, 768px, 992px, 1200px
- **No horizontal scroll** on any device
- **Touch-friendly** buttons and interactions
- **Proper card stacking** on mobile
- **Responsive navigation** with offcanvas menu
- **Optimized typography** for all screen sizes

## 🎨 Technical Implementation

### Color Scheme
- **Forest Green**: `#2d5016` (primary)
- **Leaf Light Green**: `#8bc34a` (secondary)
- **Earth Brown**: `#6d4c41` (accent)
- Only shades and opacity variations of these colors are used

### CSS Features
- **CSS Variables** for easy theme management
- **Glassmorphism effects** with backdrop-filter
- **3D transforms** for card animations
- **Custom animations** (typing, floating leaves, counters)
- **Responsive grid system** using Bootstrap 5

### JavaScript Features
- **Theme persistence** using localStorage
- **Intersection Observer** for scroll animations
- **Form validation** with real-time feedback
- **Interactive map zones** with click handlers
- **Event filtering** system
- **Smooth scrolling** navigation
- **Performance optimized** with debouncing

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. Navigate through all pages to explore features

### File Structure
```
garden/
├── index.html              # Home page
├── garden-map.html         # Interactive map
├── events.html             # Event calendar
├── membership.html         # Membership plans
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── script.js           # Main JavaScript file
└── README.md               # This file
```

## 🌟 Key Features Demonstrated

### Glassmorphism Design
- Semi-transparent backgrounds with backdrop blur
- Soft shadows and borders
- Layered depth effects

### 3D Animations
- Card flip animations on membership page
- Hover lift effects with shadows
- 3D tilt on event cards

### Interactive Elements
- Clickable garden map zones
- Theme toggle with persistence
- Form validation with feedback
- Event filtering system

### Performance Optimizations
- Debounced scroll events
- Intersection Observer for animations
- Lazy loading ready structure
- Efficient CSS animations

### Accessibility
- Semantic HTML5 structure
- ARIA labels for dynamic content
- Keyboard navigation support
- Focus management

## 🎯 Browser Compatibility

- **Modern browsers**: Full support
- **IE11**: Basic functionality (no glassmorphism)
- **Mobile browsers**: Full responsive support
- **Touch devices**: Optimized interactions

## 📝 Development Notes

### Customization
- Modify CSS variables in `:root` for quick color changes
- Add new garden zones by updating the JavaScript map data
- Extend event categories in the filtering system
- Customize membership tiers in the HTML structure

### Performance
- Images use placeholder URLs - replace with optimized images for production
- Consider implementing lazy loading for images
- Minify CSS and JavaScript for production
- Enable gzip compression on server

### SEO
- Semantic HTML5 structure for better indexing
- Meta tags included in each page
- Proper heading hierarchy
- Image alt tags for accessibility

## 🌻 Enjoy the Garden!

This website showcases modern web development techniques while maintaining clean, maintainable code. The glassmorphism design creates a beautiful, ethereal atmosphere perfect for a botanical garden website.

Feel free to explore all the interactive features, test the responsive design on different devices, and enjoy the peaceful garden experience!
