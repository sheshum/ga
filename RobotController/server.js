const http  = require('http'),
      url   = require('url'),
      fs    = require('fs'),
      path  = require('path'),
      port  = 5000;

let fileExtensions = {
    'html':'text/html',
    'css':'text/css',
    'js':'text/javascript',
    'json':'application/json',
    'png':'image/png',
    'jpg':'image/jpg',
    'wav':'audio/wav'
}

const requestHandler = ( req, res ) => {
  // Move implementation from createServer() to here
}

let server = http.createServer((req, res) => {
    let parsedUrl = url.parse(req.url, true);

    let reqFile = parsedUrl.pathname;
    let ext = path.extname(reqFile).replace('.', '');

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