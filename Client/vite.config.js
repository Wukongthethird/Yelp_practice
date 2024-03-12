import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { chakra } from "@chakra-ui/react";

// https://vitejs.dev/config/
export default defineConfig({

  server: {
    watch: {
      usePolling: true,
    },
  },
  // server: {
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
  // },
  plugins: [react()],
});
