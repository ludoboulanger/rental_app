const mongoose = require("mongoose");
console.log(process.env.DEV_DB_NAME);
mongoose
	.connect("mongodb://127.0.0.1:27017/"+process.env.DEV_DB_NAME, { useNewUrlParser: true,  useUnifiedTopology: true  })
	.catch((e) => {
		console.error("Connection error", e.message);
	});

const Database = mongoose.connection;

module.exports = Database;
