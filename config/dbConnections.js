const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connection established: ",
      connect.connection.host,
      connect.connection.name,
      connect.connection.port,
    );
  } catch (err) {
    console.log(err);
    process.exit(1); // process.exit(1) used to indicate 'Termination with Error' while process.exit(0) used to indicate 'Sucessful Termination'
  }
};

module.exports = connectDB;
