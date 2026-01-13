# MA Shop

A modern e-commerce platform built with React and Vite.

## Live Demo

Visit the live application: [ma-shop.netlify.app](https://ma-shop.netlify.app)

## Features

- Shopping cart functionality
- Wishlist management
- User authentication (Login/Register)
- Product browsing and search
- Product categories
- Protected routes for authenticated users
- Admin dashboard for managing:
  - Products (CRUD operations)
  - Categories
  - Users
  - Activity logs

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **Deployment:** Netlify

## Project Structure

```
ma-shop/
├── src/
│   ├── components/
│   │   ├── admin/          # Admin-specific components
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   ├── Searchbar.jsx
│   │   └── Sidebar.jsx
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── WishlistContext.jsx
│   ├── pages/              # Page components
│   │   ├── AdminDashboard.jsx
│   │   ├── Cart.jsx
│   │   ├── Categories.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Register.jsx
│   │   └── Wishlist.jsx
│   ├── services/           # API service functions
│   │   ├── authService.js
│   │   ├── cartService.js
│   │   ├── categoryService.js
│   │   ├── productService.js
│   │   └── userService.js
│   └── utils/              # Utility functions
│       ├── api.js
│       └── confirmToast.js
├── public/
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/munezeromas/ma-shop.git
cd ma-shop
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Contributors

- **munezeromas** - [GitHub Profile](https://github.com/munezeromas)
- **muhimpunduanne** - [GitHub Profile](https://github.com/muhimpunduanne)

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue on the GitHub repository.

---

**Live Site:** [ma-shop.netlify.app](https://ma-shop.netlify.app)

**Repository:** [github.com/munezeromas/ma-shop](https://github.com/munezeromas/ma-shop)
