# Little Lemon App - Quick Start Guide

Welcome to the Little Lemon React Native Restaurant App! This guide will help you get the app up and running.

## 🚀 Quick Start (5 Minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm start
```

You'll see the Expo CLI menu with options:
```
› Press i ‣ open iOS simulator
› Press a ‣ open Android emulator
› Press w ‣ open web
› Press r ‣ reload app
› Press m ‣ toggle menu
› Press q ‣ quit
```

### Step 3: Run on Emulator/Device
- **iOS**: Press `i` (requires Mac)
- **Android**: Press `a` (requires Android Studio/Emulator)
- **Physical Device**: Scan QR code with Expo Go app

## 📋 Project Overview

### What This App Does
✅ Display restaurant menu with dishes from remote API
✅ Search dishes by name
✅ Filter by categories
✅ Store data locally (works offline)
✅ User profile management
✅ Beautiful Mediterranean-themed UI

### Technology Stack
- **Framework**: React Native with Expo
- **Database**: SQLite (Expo-SQLite)
- **Navigation**: React Navigation
- **Storage**: AsyncStorage for user data
- **HTTP**: Axios for API calls

## 🎯 Core Features Implemented

### 1. Onboarding Screen
- Email and name registration
- Validation checks
- Persistent user data with AsyncStorage

### 2. Home Screen (Main Menu)
- Displays all menu items in a FlatList
- Shows dish name, description, price, and image
- Header with logo and profile avatar

### 3. Menu Display
- **API Integration**: Fetches from GitHub repository
- **Image Loading**: Asynchronous loading with loading states
- **Caching**: SQLite stores menu data for offline access
- **First Load**: Fetches API, subsequent loads use cache
- **Offline Support**: App works without internet after first load

### 4. Search Functionality
- Real-time search as you type
- Case-insensitive name matching
- **Debounced at 500ms** to reduce database queries
- Works with category filters (AND logic)

### 5. Category Filtering
- Multi-select categories
- Horizontal scrollable list
- Visual feedback for selected categories
- Filters combined with search results

### 6. Profile Screen
- View and edit user information
- Save profile changes
- Logout functionality
- Profile data persists with AsyncStorage

## 📁 Project Structure

```
capstone/
├── App.js                        # Application entry point
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── README.md                     # Full documentation
├── SETUP.md                      # This file
│
├── navigation/
│   └── RootNavigator.js         # Navigation logic (Onboarding → Home/Profile)
│
├── screens/                      # Screen components
│   ├── OnboardingScreen.js      # First-time user registration
│   ├── HomeScreen.js            # Main menu display
│   └── ProfileScreen.js         # User profile management
│
├── components/                   # Reusable UI components
│   ├── Header.js                # Logo and user avatar
│   ├── Banner.js                # Hero section with search
│   ├── CategoryFilter.js        # Category selection bar
│   └── MenuItem.js              # Individual menu item card
│
├── utils/                        # Utility functions
│   ├── database.native.js       # SQLite operations for iOS/Android
│   ├── database.web.js          # Local storage fallback for web
│   └── api.js                   # API calls and parsing
│
├── constants/
│   └── index.js                 # Theme colors and configuration
│
├── .babelrc                      # Babel configuration
├── .gitignore                    # Git ignore rules
└── metro.config.js               # Metro bundler config
```

## 🔌 API Integration

### Menu Data Source
- **URL**: https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json
- **Format**: JSON array with menu items
- **Fields**: id, name, price, description, image, category

### Image URLs
- **Base**: https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/
- **Example**: `greekSalad.jpg` → full URL with `?raw=true`

### Database Schema

**Menu Table**
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

**Categories Table**
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  title TEXT UNIQUE NOT NULL
);
```

## 🎨 Styling & Theme

The app uses a beautiful Mediterranean restaurant theme:

| Element | Color | Hex |
|---------|-------|-----|
| Primary | Dark Charcoal | #495057 |
| Accent | Golden Yellow | #f4ce14 |
| Background | Light Gray | #f5f5f5 |
| Text | Dark Gray | #333333 |
| Borders | Light | #dddddd |

## 🔑 Key Implementation Details

### Data Flow on App Launch
1. Check if user completed onboarding (AsyncStorage)
2. Show Onboarding or Home screen
3. Home screen initializes SQLite database
4. Check if menu data exists in SQLite
5. If NO data: Fetch from API → Parse → Save to SQLite
6. If YES data: Load directly from SQLite
7. Display menu items in FlatList

### Search & Filter Logic
1. User types in search (triggers with 500ms debounce)
2. Or selects/deselects categories
3. Build SQL query with WHERE conditions
4. Combine filters: `WHERE category IN (...) AND name LIKE '%query%'`
5. Update FlatList with filtered results

### Image Loading
1. Image URI built from filename
2. Image starts loading in background
3. Shows loading indicator while fetching
4. On success: Display image
5. On error: Show placeholder emoji

## 🐛 Troubleshooting

### Dependencies Not Installing
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Images Not Loading
- Ensure internet connection (first load needs it)
- Check API URLs in `utils/api.js`
- Verify GitHub URLs are accessible

### SQLite Errors
- Ensure `expo-sqlite` is installed: `npm install expo-sqlite`
- If permission denied, clear app cache
- Reinstall: `npm install`

### Navigation Not Working
- Delete app cache: `npm start -- -c`
- Verify AsyncStorage is returning correct onboarding status
- Check that `RootNavigator.js` is properly checking status

### Emulator Issues

**Android:**
```bash
# If emulator won't start
emulator -list-avds  # List available emulators
emulator -avd <name> # Start specific emulator
```

**iOS (Mac only):**
```bash
# If simulator won't work
expo client:install:ios
npm start
```

## 📝 Next Steps

### After Getting It Running
1. ✅ Create your user account on (onboarding screen
2. ✅ Browse the menu items
3. ✅ Try searching and filtering
4. ✅ Go to profile and edit your info
5. ✅ Log out and log back in

### To Extend the App
Consider adding:
- 🛒 Shopping cart & checkout
- 📦 Order history
- ⭐ Review system
- 💳 Payment integration
- 🌙 Dark mode
- 📍 Location/Maps

## 📚 Resources

- **React Native Docs**: https://reactnative.dev
- **Expo Docs**: https://docs.expo.dev
- **React Navigation**: https://reactnavigation.org
- **SQLite Expo**: https://docs.expo.dev/versions/latest/sdk/sqlite/

## ✨ Features Checklist

### Completed ✅
- [x] Onboarding/Login flow
- [x] Home screen with menu
- [x] Fetch data from API
- [x] Store in SQLite database
- [x] Display menu items with images
- [x] Category filtering
- [x] Search with debounce (500ms)
- [x] Profile management
- [x] Offline support
- [x] Navigation between screens

### Potential Improvements
- [ ] Shopping cart
- [ ] Order history
- [ ] Ratings & reviews
- [ ] Push notifications
- [ ] Dark mode
- [ ] Animations

## 🆘 Need Help?

1. Check the **README.md** for full documentation
2. Review the course materials on Coursera
3. Check React Native docs: https://reactnative.dev/docs
4. Review code comments in component files

## 🎉 You're All Set!

Your Little Lemon restaurant app is ready to use. Enjoy exploring the Mediterranean cuisine! 🍋

---

**Happy Coding!** 🚀
