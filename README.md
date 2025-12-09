# **Renshuu** 

The frontend application for **Renshuu**, a modern flashcard app built for efficiency. It features a dark-mode UI, AI integration, and a distraction-free study mode.

**🔗 Live Demo:** [https://renshuu-virid.vercel.app/](https://renshuu-virid.vercel.app/)

## **🛠️ Tech Stack**

* **Framework:** React 18  
* **Build Tool:** Vite  
* **Language:** TypeScript  
* **Styling:** Bootstrap 5 & Custom CSS (Glassmorphism)  
* **State:** Context API  
* **Routing:** React Router v6

## **🚀 Getting Started**

### **Prerequisites**

* Node.js (v18+)

### **Installation**

1. **Clone the repository:**  
   git clone https://github.com/bamboyu/renshuu.git  
   cd renshuu-frontend

2. **Install dependencies:**  
   npm install

3. Environment Configuration:  
   Create a .env.development file in the root for local testing:  
   VITE\_API\_URL=http://localhost:5000

4. **Run the application:**  
   npm run dev

   The app will run at http://localhost:5173.

## **📂 Project Structure**

src/  
├── api/            \# API wrappers (Auth, Card, Deck, Study)  
├── components/     \# Reusable UI (Navbar, DeckCard, Footer)  
├── context/        \# AuthContext (User state)  
├── pages/          \# Views (Home, Decks, Review, Resources, etc.)  
├── config.ts       \# API URL configuration  
└── App.tsx         \# Routing logic

## **☁️ Deployment (Vercel)**

This project is deployed on **Vercel**.

1. Import the repository into Vercel.  
2. **Environment Variables:** Add the following variable in Vercel Settings:  
   * VITE\_API\_URL: https://renshuu-backend.onrender.com  
3. **Routing:** A vercel.json file is included to handle Single Page Application (SPA) redirects.

## **✨ Key Features**

* **Smart Study:** Uses the SM-2 algorithm to schedule reviews.  
* **AI Creator:** Auto-generate card definitions and images via OpenAI.  
* **Responsive:** Fully optimized for mobile and desktop.  
* **Kana Practice:** Built-in tool for learning Hiragana/Katakana.
