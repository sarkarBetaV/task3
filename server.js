const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// GCD helper function
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// LCM calculation
function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

// Main endpoint - use a parameter for the email path
app.get('/:emailPath', (req, res) => {
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);
    
    res.setHeader('Content-Type', 'text/plain');
    
    if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
        return res.send('NaN');
    }
    
    const result = lcm(x, y);
    res.send(result.toString());
});

// Alternative: If you want to handle the root path as well
app.get('/', (req, res) => {
    const x = parseInt(req.query.x);
    const y = parseInt(req.query.y);
    
    res.setHeader('Content-Type', 'text/plain');
    
    if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
        return res.send('NaN');
    }
    
    const result = lcm(x, y);
    res.send(result.toString());
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});