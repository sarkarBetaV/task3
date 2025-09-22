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

// Handle ALL HTTP methods at ALL paths
app.use((req, res) => {
    console.log('Request received for:', req.url);
    
    try {
        // Get parameters safely
        const xStr = req.query.x;
        const yStr = req.query.y;
        
        // Check if parameters exist
        if (xStr === undefined || yStr === undefined) {
            return res.status(400).send('NaN');
        }
        
        // Parse integers
        const x = parseInt(xStr);
        const y = parseInt(yStr);
        
        res.setHeader('Content-Type', 'text/plain');
        
        // Check if parsing failed or numbers are not natural
        if (isNaN(x) || isNaN(y) || x <= 0 || y <= 0) {
            console.log('Invalid input - x:', xStr, 'y:', yStr);
            return res.send('NaN');
        }
        
        const result = lcm(x, y);
        console.log('Valid calculation - x:', x, 'y:', y, 'result:', result);
        res.send(result.toString());
        
    } catch (error) {
        console.error('Unexpected error:', error);
        res.setHeader('Content-Type', 'text/plain');
        res.send('NaN');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});