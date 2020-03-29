// [Should] Include some log file or messages at controllers/ and models/?.

// https://www.google.com/search?client=firefox-b-d&q=how+to+show+log+node+js+npm+package
// https://www.twilio.com/blog/guide-node-js-logging
// https://www.jstorimer.com/blogs/workingwithcode/7766119-when-to-use-stderr-instead-of-stdout
// https://nodejs.org/api/util.html#util_util_format_format_args
// https://www.npmjs.com/package/pino

const chalk = require("chalk");
const express = require('express');
const app = express();
const useMongo = require("./db/mongoose");
useMongo();

const {
  email,
} = require("./routes");

app.use(express.json());
app.use("/api/email/v1", email);

const PORT = 8000;

app.listen(PORT, () => {
  const blue = chalk.blue;
  const target = blue(`http://localhost:${PORT}`);
  console.log(`🚀 Server ready at ${target}`);
});
