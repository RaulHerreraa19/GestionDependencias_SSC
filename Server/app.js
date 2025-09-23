//const express = require('express');
//const cors = require('cors');

import express from 'express';
import cors from 'cors';    
import fs from 'fs';
import path from 'path';

import {join, dirname} from 'path';
import {fileURLToPath} from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));  
const app = express();
const port = 3000;
//const authRoutes = require('./Routes/authroutes');
const routes = require('./routes/routes');

app.use(cors());
app.use(express.json());

// Importing routes

app.use('/api', routes);

app.get('/', (req, res) => {
        res.send('Welcome to the API'); 
    });

    app.use(express.static(join(__dirname, '../Client/src/Pages/Prueba_rend')));

// Endpoint to generate and save HTML file 

app.post('/generate-html', (req, res) => {
  const { pageName, content } = req.body;

    const htmlDir = path.join(__dirname, "../Client/public/HTML");

     if (!fs.existsSync(htmlDir)) {
    fs.mkdirSync(htmlDir, { recursive: true });
  }

  const filePath = path.join(htmlDir, `${pageName}.html`);
  fs.writeFileSync(filePath, content, "utf8");

  res.json({ message: "HTML generado y guardado", url: `/html/${pageName}.html` });
});

// Serve static HTML files
    app.use('/html', express.static(join(__dirname, '../Client/public/HTML')));


    app.use((req, res, next) => {
        res.status(404).json({ message: 'Route not found' });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
