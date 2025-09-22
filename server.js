const express = require('express');
const app = express();
const PORT = process.env.Port || 3000;

// GCD helper function
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// LCM calculation
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Endpoint with path segment before email (like the example)
app.get('/api/sarkarshiponb_gmail_com', (req, res) => {
    console.log('Request received for email endpoint:', req.url);
    
    try {
        const xStr = req.query.x;
        const yStr = req.query.y;
        
        if (xStr === undefined || yStr === undefined) {
            return res.status(400).send('NaN');
        }
        
        const x = parseInt(xStr);
        const y = parseInt(yStr);
        
        res.setHeader('Content-Type', 'text/plain');
        
        if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
            return res.send('NaN');
        }
        
        const result = lcm(x, y);
        res.send(result.toString());
        
    } catch (error) {
        res.setHeader('Content-Type', 'text/plain');
        res.send('NaN');
    }
});

// 404 for all other routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});