# 🚗 Volkswagen Group E-Commerce Platform

A premium full-stack e-commerce platform for the Volkswagen Group India, featuring cars from Volkswagen, Audi, Porsche, Skoda, Bentley, Lamborghini, and Bugatti.

![Volkswagen](https://img.shields.io/badge/Volkswagen-001e50?style=for-the-badge&logo=volkswagen&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## ✨ Features

### 🏎️ Car Showroom
- Browse 32+ premium vehicles across 7 luxury brands
- Detailed car specifications, variants, and colors
- High-quality image galleries
- **AI Car Assistant** - Ask questions about any car using Google Gemini AI

### 🛒 Parts Store
- Genuine OEM parts catalog
- Category-based filtering
- Add to cart & wishlist functionality
- Price comparison (MRP vs Selling Price)

### 🔧 Service Booking
- Book vehicle services online
- Multiple service types (General, Major, AC, Wheel Alignment, etc.)
- Choose from service centers across India
- Upload vehicle documents

### 📦 Order Management
- Complete checkout flow
- Order tracking with real-time status
- Invoice generation (PDF)
- Order history

### 👨‍💼 Admin Dashboard
- Secure JWT authentication
- View all orders, bookings, and test drives
- Dashboard analytics
- Manage inventory

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite
- **Tailwind CSS 4** for styling
- **Zustand** for state management
- **React Router v6** for navigation
- **Lucide React** for icons
- **Axios** for API calls

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Google Gemini AI** for car assistant
- **Multer** for file uploads
- **PDFKit** for invoice generation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/sachin8935/volkswagen_project.git
cd volkswagen_project
```

2. **Setup Backend**
```bash
cd server
npm install
```

3. **Create `.env` file in server folder**
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5174
```

4. **Setup Frontend**
```bash
cd ../client
npm install
```

5. **Create `.env` file in client folder** (for production)
```env
VITE_API_URL=http://localhost:5000/api
```

6. **Run the application**

Terminal 1 (Backend):
```bash
cd server
npm start
```

Terminal 2 (Frontend):
```bash
cd client
npm run dev
```

7. **Open in browser**
```
http://localhost:5174
```

## 🔐 Admin Access

Access the admin dashboard to manage orders, bookings, and view analytics.

| Field | Value |
|-------|-------|
| **URL** | `/admin` |
| **Username** | `admin` |
| **Password** | `admin123` |

> ⚠️ **Note**: Change these credentials in production!

## 📁 Project Structure

```
volkswagen_ecommerce/
├── client/                 # React Frontend
│   ├── public/
│   │   ├── logos/         # Brand logos
│   │   └── team/          # Team member photos
│   └── src/
│       ├── api/           # API service layer
│       ├── components/    # Reusable components
│       ├── pages/         # Page components
│       └── store/         # Zustand stores
│
└── server/                 # Node.js Backend
    ├── config/            # Database config
    ├── data/              # Static data
    ├── models/            # Mongoose models
    ├── routes/            # API routes
    └── uploads/           # Uploaded files
```

## 🌐 API Endpoints

### Cars
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cars` | Get all cars |
| GET | `/api/cars/:id` | Get car by ID |

### Parts
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/parts` | Get all parts |
| GET | `/api/parts/:id` | Get part by ID |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services/types` | Get service types |
| GET | `/api/services/centers` | Get service centers |
| POST | `/api/services/book` | Book a service |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payment/order` | Create order |
| GET | `/api/tracking/:orderId` | Track order |

### AI Assistant
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/car-assistant` | Ask AI about a car |

### Admin
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/dashboard` | Get dashboard data |

## 🎨 Screenshots

### Home Page
Premium landing page with brand showcase and featured cars.

### Showroom
Browse all vehicles with filtering by brand, category, and price.

### Car Detail
Detailed view with AI assistant, test drive booking, and variant selection.

### Parts Store
Shop genuine OEM parts with cart functionality.

### Admin Dashboard
Manage orders, bookings, and view analytics.

## 👥 Team

Meet our amazing team at `/team` page!

## 📞 Contact

- **Phone**: +91 8935904820
- **Email**: sachin.kumar2@volkswagen.co.in
- **Location**: Volkswagen Group India, Pune, Maharashtra

## 📄 License

This project is for educational/demonstration purposes.

---

<p align="center">
  Made with ❤️ by the Volkswagen Group India Digital Team
</p>
