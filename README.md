# 🧠 Smart Medical AI Assistant

An AI-powered mobile application that provides instant medical advice based on user symptoms using **Google's Gemini Pro API**. Built with **React Native (Expo)** for the frontend and **Node.js + Express** for the backend, this app delivers a seamless, secure, and intelligent healthcare experience.

---

## 📲 Try the App

### 🔗 Download APK

👉 [Download APK](https://expo.dev/accounts/param3840/projects/smartmedicalapp/builds/02678292-42f3-4e96-8568-8ce29babea64)

### 📷 Scan QR Code

Scan the QR code below to install the app directly on your Android device:

![QR Code](./assets/qr.PNG)

---

## 🎥 Demo Video

Watch the full working demo of the app in action:

👉 [Watch Demo on Google Drive](https://drive.google.com/file/d/1lwVWl2KChlIyFZGYnHgtXF_6hsYNJQug/view?usp=sharing)

---

## 🚀 Key Features

- 🤖 **AI-Powered Symptom Analysis** using Gemini Pro
- 🔐 **JWT Authentication** with secure login/signup
- 🧠 **Medical Predictions** with fallback logic
- 🏥 **Nearby Hospitals** using Geoapify + Google Maps
- ⏰ **Smart Reminders** with local notifications
- 📦 **Persistent Login** using AsyncStorage
- 📱 **Responsive UI** built with React Native & Expo

---

## 🧰 Tech Stack

### 🖥️ Frontend (React Native + Expo)

- `React Native` with `Expo Router`
- `AsyncStorage` for session & reminder storage
- `Expo Notifications` for local reminders
- `React Navigation`, `DateTimePicker`, `Picker`, `Platform API`

### 🌐 Backend (Node.js + Express)

- `Express.js` REST API with `/ask` endpoint
- `MongoDB Atlas` (Cloud Cluster) for user data & reminders
- `Mongoose` for schema modeling
- `JWT` for authentication
- `bcrypt` for password hashing
- `dotenv`, `cors`, `axios` for secure API handling

### 🧠 AI & APIs

- `Gemini Pro API` for medical Q&A
- `Geoapify` for hospital location data
- `Google Maps` for directions & hospital info

---

## 🧪 Sample Prompts to Try

- "I have a fever and body ache. What could it be?"
- "I feel tired and cold all the time."
- "I have a red itchy rash on my arms."
- "I’m sneezing and have a runny nose. What’s wrong?"

---

## 🗃️ Deployment Details

| Component     | Platform             |
|---------------|----------------------|
| **Backend**   | [Render](https://render.com/) |
| **Database**  | MongoDB Atlas (Cloud Cluster) |
| **APK Build** | [Expo EAS Build](https://expo.dev/) |

