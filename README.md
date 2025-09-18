# 🌐 Live Demo

[https://renshuu-notesapp.vercel.app/](https://renshuu-notesapp.vercel.app/)

# 📝 Renshuu Notes App  

A beautiful and modern note-taking application built with **React, Vite, Supabase, Tailwind CSS, and Lucide Icons**.  
Designed to be fast, secure, and intuitive — perfect for learners, writers, and anyone who values a clean, distraction-free note-taking experience.  

---

## ✨ Features  

- 🔐 **User Authentication** — Sign up and log in with email + password using Supabase Auth  
- 🗒️ **Personal Notes** — Add, view, and delete your own notes  
- 🕵️ **Secret Notes** — Confidential notes that only you can access  
- 🌍 **Public Notes** — View public notes from other users  
- 🎨 **Modern UI** — Clean white/blue theme, responsive design, and Lucide icons  
- 🛡️ **Secure** — Only you can delete your own notes, and secret notes stay private  

---

## 🚀 Getting Started  

### 1. Clone the Repository  
```bash
git clone https://github.com/yourusername/renshuu-notesapp.git
cd renshuu-notesapp
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [Supabase](https://supabase.com/).
2. Copy your **API URL** and **Anon Key** from **Project Settings → API**.
3. Create a `.env.local` file in the root folder and add:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 4. Run the Development Server

```bash
npm run dev
```

Your app should now be running at **[http://localhost:5173](http://localhost:5173)** 🎉

---

## 🛠️ Tech Stack

* **Frontend:** [React](https://react.dev/), [Vite](https://vitejs.dev/), [Tailwind CSS](https://tailwindcss.com/)
* **Backend & Database:** [Supabase](https://supabase.com/)
* **Icons:** [Lucide](https://lucide.dev/)

---

## 📂 Project Structure

```
renshuu-notesapp/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page views (Login, Notes, etc.)
│   ├── lib/           # Supabase client & helper utilities
│   ├── styles/        # Tailwind and global styles
│   └── main.jsx       # App entry point
├── .env.local         # Environment variables
├── package.json
└── README.md
```

---

## 🧪 Testing

Run the app locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add some feature"
   ```
4. Push to the branch:

   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request 🎉

---