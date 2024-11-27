const http = require('http');
const url = require('url');

// Define the server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true); // Parse the URL
    const pathname = parsedUrl.pathname; // Get the path
    const method = req.method; // Get the HTTP method

    // Set a basic header for the response
    res.setHeader('Content-Type', 'text/plain');

    // Define routes
    if (pathname === '/' && method === 'GET') {
        res.statusCode = 200;
        res.end('Welcome to the home page!');
    } else if (pathname === '/about' && method === 'GET') {
        res.statusCode = 200;
        res.end('About us page');
    } else if (pathname === '/submit' && method === 'POST') {
        // Handle POST request body
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // Accumulate incoming data
        });
        req.on('end', () => {
            res.statusCode = 200;
            res.end(`Data received: ${body}`);
        });
    } else if (pathname.startsWith('/user/') && method === 'GET') {
        // Handle route with parameters (e.g., /user/123)
        const userId = pathname.split('/')[2]; // Extract ID from the path
        res.statusCode = 200;
        res.end(`User ID: ${userId}`);
    } else {
        // Handle unknown routes
        res.statusCode = 404;
        res.end('404 Not Found');
    }
});

// Define the port
const PORT = 8000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});