export default {
  expo: {
    name: "SmartMedicalApp",
    slug: "smartmedicalapp",
    version: "1.0.0",
    sdkVersion: "54.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    android: {
      package: "com.paramveer.smartmedicalapp"
    },
    extra: {
      API_URL: "https://smartmedicalai-backend-7.onrender.com",
      eas: {
        projectId: "39f0a55f-93f9-4d56-b7ec-7d41334a1477"
      }
    }
  }
};