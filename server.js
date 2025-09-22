const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// GCD helper function using BigInt
function gcd(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    if (b === 0n) return a;
    return gcd(b, a % b);
}

// LCM calculation with correct zero handling
function lcm(a, b) {
    a = BigInt(a);
    b = BigInt(b);
    
    // Handle zero cases
    if (a === 0n && b === 0n) return 0n;
    if (a === 0n) return b;
    if (b === 0n) return a;
    
    return (a * b) / gcd(a, b);
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
        
        // Try to parse as BigInt
        let x, y;
        try {
            x = BigInt(xStr);
            y = BigInt(yStr);
            
            // Check if numbers are natural (including zero)
            if (x < 0n || y < 0n) {
                return res.send('NaN');
            }
        } catch (parseError) {
            return res.send('NaN');
        }
        
        res.setHeader('Content-Type', 'text/plain');
        
        // Calculate LCM with correct zero handling
        const result = lcm(x, y);
        
        // Convert to string (no scientific notation with BigInt)
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