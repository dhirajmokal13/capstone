# Little Lemon - Restaurant Mobile App

A React Native mobile application for Little Lemon restaurant built with Expo. This app allows users to browse the restaurant menu, filter dishes by category, search for specific items, and view detailed information about each dish.

## Features

✨ **Core Features:**
- **Onboarding & Authentication**: User registration with email and profile setup
- **Home Screen**: Display restaurant menu with beautiful UI
- **Menu Display**: FlatList of menu items with images and descriptions fetched from API
- **Category Filtering**: Filter menu items by multiple categories
- **Search Functionality**: Debounced search (500ms) to find dishes by name
- **Offline Support**: SQLite database caches menu data for offline access
- **Profile Management**: Edit user profile and logout functionality
- **Responsive Design**: Beautiful, modern UI with Mediterranean restaurant theme

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - React Native development platform
- **SQLite (Expo-SQLite)** - Local database for caching menu data
- **React Navigation** - Navigation between screens
- **Axios** - HTTP client for API requests
- **AsyncStorage** - Persist user profile data

## Project Structure

```
capstone/
├── App.js                          # Main application entry point
├── app.json                        # Expo configuration
├── package.json                    # Project dependencies
├── navigation/
│   └── RootNavigator.js           # Navigation stack configuration
├── screens/
│   ├── HomeScreen.js              # Main menu display screen
│   ├── ProfileScreen.js           # User profile management
│   └── OnboardingScreen.js        # Initial login/registration
├── components/
│   ├── Header.js                  # Header with logo and avatar
│   ├── Banner.js                  # Hero banner with search
│   ├── CategoryFilter.js          # Category filter component
│   └── MenuItem.js                # Individual menu item card
└── utils/
   ├── database.native.js         # SQLite operations for iOS/Android
   ├── database.web.js            # Local storage fallback for web
   └── api.js                     # API utility functions
```

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`

### Steps

1. **Navigate to project directory:**
   ```bash
   cd capstone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the Expo development server:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on device/emulator:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan QR code with Expo Go app on physical device

## How to Use

### First Time Setup
1. Launch the app - you'll see the Onboarding screen
2. Enter your first name (required) and email (required)
3. Optionally add your last name
4. Tap "Get Started" to complete onboarding

### Main Features

**Browsing Menu:**
- The Home screen displays all menu items with images, descriptions, and prices
- Menu data is fetched from the remote API on first launch
- Data is automatically cached in SQLite for offline access

**Filtering by Category:**
- Scroll through the category filter below the search bar
- Tap categories to filter items (multiple selections allowed)
- Selected categories are highlighted with a dark background

**Searching Dishes:**
- Type in the search bar at the top to find dishes by name
- Search is debounced at 500ms to optimize performance
- Search works in combination with category filters

**Profile Management:**
- Tap the user avatar in the header to access your profile
- Edit your profile information and save changes
- Logout to return to the onboarding screen

## API Integration

### Menu Data API
- **URL:** `https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json`
- **Format:** JSON with menu array containing dish information
- **Cached in:** SQLite database (table: `menu`)

### Image URLs
- **Base URL:** `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/`
- **Image files:** Referenced in the JSON data
- **Example:** `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/greekSalad.jpg?raw=true`

## Database Schema

### Menu Table
```sql
CREATE TABLE menu (
  id INTEGER PRIMARY KEY UNIQUE,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT
);
```

### Categories Table
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  title TEXT UNIQUE NOT NULL
);
```

## Key Functions

### Database Operations (`utils/database.native.js` / `utils/database.web.js`)
- `initDatabase()` - Initialize SQLite database
- `saveMenuItems(items)` - Save menu items to database
- `getMenuItems()` - Retrieve all menu items
- `filterMenuItems(categories, searchQuery)` - Filter items by categories and search
- `menuExists()` - Check if menu data is cached

### API Utilities (`utils/api.js`)
- `fetchMenuData()` - Fetch menu from remote API
- `parseMenuData(data)` - Parse JSON into app format
- `getImageUrl(imageFileName)` - Build image URL
- `getUniqueCategories(items)` - Extract categories from menu items

## Performance Optimizations

✅ **Asynchronous Image Loading** - Images load in background without blocking UI
✅ **Debounced Search** - Search queries debounced at 500ms
✅ **Offline Support** - SQLite caching enables offline browsing
✅ **Conditional API Calls** - API only called on first launch
✅ **Efficient Filtering** - SQL-based filtering for performance

## Styling

The app uses a Mediterranean theme with:
- **Primary Color:** #495057 (Dark Charcoal)
- **Accent Color:** #f4ce14 (Golden Yellow - Little Lemon brand)
- **Background:** #f5f5f5 (Light Gray)
- **Text:** Responsive sizing with clear hierarchy

## Troubleshooting

**Images not loading:**
- Check internet connection for first load
- Verify API URLs are accessible
- Clear cache and rebuild if needed

**SQLite errors:**
- Ensure `expo-sqlite` is properly installed
- Try clearing app data and reinstalling

**Navigation issues:**
- Verify AsyncStorage is working properly
- Check that onboarding status is being saved correctly

**Performance issues:**
- Ensure search debounce is working (500ms)
- Check for console logs indicating repeated database queries

## Future Enhancements

- 🛒 Shopping cart functionality
- 📦 Order history
- ⭐ Ratings and reviews
- 🔔 Push notifications
- 💳 Payment integration
- 🌙 Dark mode
- Multi-language support

## License

This project is created as a Coursera capstone project.

## Support

For issues or questions, refer to the course materials or React Native/Expo documentation.
