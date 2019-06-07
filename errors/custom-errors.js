exports.psqlErrors = (err, req, res, next) => {
  const psqlCodes = ["22P02", "42703"];
  if (psqlCodes.includes(err.code)) {
    res.status(400).send(err.text || "Bad Request");
  } else if (err.code === "23503") {
    res.status(404).send("Invalid Username input");
  } else if (err.code === "23502") {
    res.status(400).send("Invalid Key input");
  } else next(err);
};

exports.customErrors = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(err.status).send(err.msg);
  } else if (err.status === 400) {
    res.status(err.status).send(err.msg);
  } else next(err);
};
