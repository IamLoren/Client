import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    baseUrl: "https://client-sigma-three.vercel.app/",
  },
})
