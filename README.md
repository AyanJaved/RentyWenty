
# 🏠 RentyWenty

RentyWenty is a web-based platform that helps users find rooms or hotels available for rent.
Built using the **MVC architecture**, the project features complete authentication, validation, and image upload functionalities.

---

## 🚀 Live Demo

🔗 [View Live App on Render](https://rentywenty.onrender.com)

---

## 📌 Features

- 🏠 Room & Hotel Listing Management
- ✅ User Authentication (Signup/Login using Passport.js)
- 📸 Image Uploads using Multer & Cloudinary
- ✍️ Review System powered by Startability
- 📜 Input Validation using Joi
- 🔒 Error Handling & Form Validation
- 🌐 Hosted on Render
- ☁️ MongoDB Atlas Integration

---

## 🛠️ Tech Stack

| Category         | Tech                                      |
|------------------|-------------------------------------------|
| Frontend         | HTML, CSS, Bootstrap                      |
| Backend          | Node.js, Express.js                       |
| Database         | MongoDB Atlas                             |
| Authentication   | Passport.js                               |
| Validation       | Joi                                       |
| File Uploads     | Multer + Cloudinary                       |
| Review Library   | Startability                              |
| Deployment       | Render                                    |
| Architecture     | MVC Pattern                               |
| Environment Vars | dotenv                                    |

---

## 📂 Project Structure

```

RentyWenty/
├── app.js
├── routes/
│   └── listings.js
├── controllers/
│   └── listingController.js
├── models/
│   └── Listing.js
├── views/
│   ├── listings/
│   │   └── index.ejs
│   └── home.ejs
├── public/
│   └── (CSS, JS, images)
├── .env
└── README.md

````

---

## 🔐 Environment Variables

You need a `.env` file in your root folder with the following:

```env
PORT=8080
DB_URL=your_mongodb_atlas_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
SESSION_SECRET=your_session_secret
````

---

## 📦 Installation & Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/AyanJaved/RentyWenty.git
   cd RentyWenty
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Add your `.env` file with the required credentials.

4. Run the app locally:

   ```bash
   npm start
   ```

5. Open in browser:

   ```
   http://localhost:8080
   ```

---

## 🌍 Deployment (Render)

This app is deployed on [Render](https://render.com):

* Auto-deploys from GitHub
* `PORT` set via `process.env.PORT`
* MongoDB Atlas for DB connection
* Uses `npm run` to run the app


---

## 🤝 Contributing

Pull requests are welcome! If you'd like to improve or suggest a feature, feel free to fork and contribute.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

> Built with ❤️ by Ayan Javed

```
