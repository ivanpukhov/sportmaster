const express = require('express');
const path = require('path');
const app = express();
const PORT = 3434;

const cacheOptions = {
    setHeaders: (res, path) => {
        if (path.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        } else {
            res.setHeader('Cache-Control', 'public, max-age=31536000');
        }
    }
};

app.use(express.static(path.join(__dirname, 'build'), cacheOptions));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

