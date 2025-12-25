# The Wild Oasis

A modern hotel and resort management dashboard application built with React. Manage cabins, bookings, guests, and settings all in one place with an intuitive and beautiful interface.

## Features

- 🏨 **Dashboard** - Overview with statistics, charts, and recent activity
- 📅 **Bookings Management** - View, filter, and manage all bookings
- 🏠 **Cabins Management** - Add, edit, and delete cabin listings
- 👥 **User Management** - Manage user accounts and permissions
- ✅ **Check-in/Check-out** - Streamlined guest check-in and check-out process
- ⚙️ **Settings** - Configure application settings
- 🔐 **Authentication** - Secure login and signup functionality
- 🌙 **Dark Mode** - Toggle between light and dark themes
- 📊 **Analytics** - Visual charts and statistics for bookings and sales

## Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Routing**: React Router DOM
- **State Management**: TanStack React Query
- **Backend**: Supabase
- **Styling**: Styled Components
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Icons**: React Icons
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/The-wild-oasis.git
cd The-wild-oasis
```

2. Install dependencies:
```bash
npm install
```

3. Set up your Supabase configuration:
   - Update the Supabase URL and API key in `src/services/supabase.js` with your own credentials

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
src/
├── assets/          # Static assets (images, icons)
├── context/         # React context providers (DarkModeContext)
├── data/           # Mock data and data utilities
├── features/       # Feature-based modules
│   ├── authentication/
│   ├── bookings/
│   ├── cabins/
│   ├── check-in-out/
│   ├── dashboard/
│   ├── guests/
│   └── settings/
├── hooks/          # Custom React hooks
├── pages/          # Page components
├── services/       # API services (Supabase clients)
├── styles/         # Global styles and themes
├── ui/             # Reusable UI components
├── utils/          # Utility functions and constants
├── App.jsx         # Main application component
└── main.jsx        # Application entry point
```

## Features Breakdown

### Dashboard
- Real-time statistics and metrics
- Sales and duration charts
- Recent bookings and stays overview
- Filterable dashboard data

### Bookings
- Complete booking management system
- Filter and sort bookings
- Detailed booking information
- Check-in and check-out functionality

### Cabins
- CRUD operations for cabin listings
- Image upload support
- Cabin availability management

### Authentication
- User login and signup
- Password update functionality
- User profile management
- Protected routes

## Environment Setup

Make sure to configure your Supabase credentials in `src/services/supabase.js`:

```javascript
export const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_KEY";
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Acknowledgments

- Built with modern React best practices
- Uses Supabase for backend services
- Styled with Styled Components for a beautiful UI
