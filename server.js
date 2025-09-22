const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// GCD helper function (handles zero correctly)
function gcd(a, b) {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// LCM calculation (ensures integer result)
function lcm(a, b) {
    if (a === 0 && b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

// SPECIFIC endpoint that only works with your email path
app.get('/sarkarshiponb_gmail_com', (req, res) => {
    console.log('Request received for email endpoint:', req.url);
    
    try {
        // Get parameters safely
        const xStr = req.query.x;
        const yStr = req.query.y;
        
        // Check if parameters exist
        if (xStr === undefined || yStr === undefined) {
            return res.send('NaN');
        }
        
        // Parse integers more carefully
        const x = parseInt(xStr, 10);
        const y = parseInt(yStr, 10);
        
        res.setHeader('Content-Type', 'text/plain');
        
        // Check if parsing failed - NOW INCLUDING ZERO AS VALID
        if (isNaN(x) || isNaN(y) || x < 0 || y < 0) {
            console.log('Invalid input - x:', xStr, 'y:', yStr);
            return res.send('NaN');
        }
        
        // Calculate LCM and ensure it's an integer
        const result = lcm(x, y);
        
        // Ensure the result is an integer (not float)
        if (!Number.isInteger(result)) {
            return res.send('NaN');
        }
        
        // Send as string without decimal points
        res.send(result.toString());
        
    } catch (error) {
        console.error('Unexpected error:', error);
        res.setHeader('Content-Type', 'text/plain');
        res.send('NaN');
    }
});

// 404 for all other routes
app.use((req, res) => {
    res.status(404).send('Not Found');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});