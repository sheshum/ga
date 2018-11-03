
function getGAResults() {
    axios({
        method: 'get',
        url: 'routes.json',
        responseType: 'json',
        responseEncoding: 'utf8'
    })
        .then( data => {
            console.log(data);
        }).catch( err => {
            console.log(err);
        });
}