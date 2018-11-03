const http      = require('http'),
      url       = require('url'),
      fs        = require('fs'),
      path      = require('path'),
      router    = require('./lib/router.js'),
      port      = 5000;

let fileExtensions = {
    'html':'text/html',
    'css':'text/css',
    'js':'text/javascript',
    'json':'application/json',
    'png':'image/png',
    'jpg':'image/jpg',
    'wav':'audio/wav'
}

// TODO: Create wrapper for server and apply middleware
// to add router to server
router.get('/routes', function() {
    require('./main.js');
});

const requestHandler = ( req, res ) => {
  // Move implementation from createServer() to here
}

// TODO: Move server implementation to requestHandler method
let server = http.createServer((req, res) => {
    let reqMethod = req.method.toLowerCase();
    let parsedUrl = url.parse(req.url, true);

    let reqFile = parsedUrl.pathname;
    let ext = path.extname(reqFile).replace('.', '');

    // TODO: apply middleware instead of this
    let execMethod = router.routes[reqMethod][parsedUrl.pathname];

    if ( execMethod ) {
        execMethod();
    }

    if (parsedUrl.path === '/') {
        let indexHtml = fs.readFileSync(path.join(__dirname, './dist/index.html'));
        res.writeHead(200, {'Content-Type': fileExtensions['html']});
        res.end(indexHtml);
    } else {
        let type;
        if (fileExtensions.hasOwnProperty(ext)) {
            type = fileExtensions[ext];
        }
        let file_path = path.join(__dirname, 'dist', reqFile);
        fs.exists(file_path, function(exists) {
            if ( exists ) {
                let fileStream = fs.createReadStream(file_path, 'utf-8');
                res.writeHead(200, {'Content-Type': type});
                fileStream.pipe(res);
            }
        });
    }  
});

server.listen(port, (err) => {
    if ( err ) {
        console.log('Error while starting the server');
    }

    console.log(`Server up and running on port ${port}`);
});