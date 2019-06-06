const { fetchArticles } = require("../models/fetch-articles");

exports.sendAllArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      if (articles.length < 1) {
        next({ status: 404, msg: "No such author or topic" });
      } else res.status(200).send(articles);
    })
    .catch(next);
};
