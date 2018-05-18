const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
    for (i = 0; i<num; i++){
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob){
    var arr = [];
    for (var key in ob){
        var value = ob[key];
        console.log(ob);

        if (Object.hasOwnProperty.call(ob, key)){
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = `"${value}"`;
            } 
            arr.push(key + '=' + value);
        }
    }
    return arr.toString();
}

var orm = {
    all: function(tableInput, cb) {
        var queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    create: function(table, cols, vals, cb){
        var queryString = `INSERT INTO ${table} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)}) `;
        console.log(queryString);

        connection.query(queryString, vals, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    update: function(table, objColVals, condition, cb){
        var queryString = `UPDATE ${table} SET ${objToSql(objColVals)} WHERE ${condition}`;
        console.log(queryString);
        
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    },

    delete: function(table, condition, cb){
        var queryString = `DELETE FROM ${table} WHERE ${condition}`;
        console.log(queryString);
        connection.query(queryString, function(err, result){
            if (err) throw err;
            cb(result);
        });
    }
};


module.exports = orm;