const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const envConfig = {
  firebaseConfig,
  supabaseUrl: `${import.meta.env.VITE_SUPABASE_API_URL}`,
  supabaseApiKey: import.meta.env.VITE_SUPABASE_API_KEY,
  api_url: `${import.meta.env.VITE_SUPABASE_API_URL}/graphql/v1`,
};
