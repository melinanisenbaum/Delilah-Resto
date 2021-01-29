const mysql2 = require('mysql2');

const mysql2Connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rootserver',
    database: 'delilahResto'
})

mysql2Connection.connect(function (err) {
    if(err) {
        console.log(err);
        return;
    } else {
        console.log('Db is connected');
    }
});

module.exports = mysql2Connection;
