const axios = require('axios');

axios
    .get('http://192.168.1.78:8000/select')
    .then(res => {
        console.log(`statusCode : ${res.status}`)
        console.log(res)
    })
    .catch(error => {
        console.log(error)
    })