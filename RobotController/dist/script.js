
function getGAResults() {
    axios({
        method: 'get',
        url: 'http://localhost:5000/routes',
        responseType: 'json',
        responseEncoding: 'utf8'
    })
        .then( data => {
            console.log(data);
        }).catch( err => {
            console.log(err);
        });
}