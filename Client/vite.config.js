import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  //   server: {
  //     host: "localhost",
  //     https:false,
  //     port: "5173",

  // },
  server: {
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000/",
    //     changeOrigin: true,
    //     secure: false,
    //     cookiePathRewrite: {
    //       "*": "/",
    //     },
    //     configure:(proxy )=>{
    //       console.log("proxy" , proxy)
    //     }
    //   },
    // },
    // proxy:{
    //   "/api":"http://localhost:3000/",
    // }
  },
  plugins: [react()],
});
