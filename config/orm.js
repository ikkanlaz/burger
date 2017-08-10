// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}


// Object for all our SQL statement functions.
var orm = {
  all: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??;";
    connection.query(queryString,[tableInput], function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  create: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
  update: function(table, objKey, objValue, conditionKey, conditionValue, cb) {
    var queryString = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
    connection.query(queryString, [table, objKey, objValue, conditionKey, conditionValue], function(err, result) {
      if (err) {
        throw err;
      }
      console.log("row updated");
      cb(result);
    });
  },
  delete: function(table, col, colVal, cb){
    var deleteQuery = "DELETE FROM ?? WHERE ?? = ?";
    connection.query(deleteQuery, [table, col, colVal], function(err, result) {
      if (err) {
        throw err;
      }
      console.log("row deleted");
      cb(result);
    });
  }
};

// Export the orm object for the model (cat.js).
module.exports = orm;
