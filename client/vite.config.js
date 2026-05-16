import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:'/',
  plugins: [react()],
})



// sudo nano /etc/nginx/sites-available/default

// server {
//     listen 80;
//     server_name _;

//     location / {
//         root /home/ubuntu/ECommerce/client/dist;
//         index index.html;
//         try_files $uri $uri/ /index.html;
//     }

//     location /api/ {
//         proxy_pass http://172.31.x.x:5000;  # backend private IP
//         proxy_http_version 1.1;
//         proxy_set_header Host $host;
//     }
// }

// sudo chmod -R 755 /home/ubuntu/Task-Management-System
// sudo chown -R ubuntu:ubuntu /home/ubuntu/Task-Management-System
// sudo chmod 755 /home/ubuntu
