var mysql = require('mysql');

module.exports = {
    con: null,
    isConnected: false,
    startConnection: function () {
        con = mysql.createPool({
            host: "127.0.0.1",
            user: "ragemp",
            password: "ragemp",
            database: "ragemp",
            connectionLimit: 150
        });
        isConnected = true;
    },

    onError: function () {
        con.on('error', function (err) {

            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                con = mysql.createPool({
                    host: "127.0.0.1",
                    user: "ragemp",
                    password: "ragemp",
                    database: "ragemp",
                    connectionLimit: 150
                });

                console.log("[DB] Connected to Database");
            } else {
                throw err;
            }
        });
    },

    getConnection: function () {
        if (!isConnected) {
            console.log("[DB] Is not connected!");
            return;
        }
        return con;
    },

    isConnected: function () {
        return isConnected;
    },

    query: function (qr) {
        if (!isConnected) {
            console.log("[DB] There is no active connection!");
            return;
        }

        con.query(qr, function (err, res) {
            if (err) throw err;
            console.log("[DB] updated database!");
        });
    }
};