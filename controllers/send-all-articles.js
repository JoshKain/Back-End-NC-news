const { fetchArticles } = require("../models/fetch-articles");
const { countOfArticles } = require("../models/counting-all-articles");

exports.sendAllArticles = (req, res, next) => {
  const { author, topic } = req.query;
  if (!author && !topic) {
    return Promise.all([fetchArticles(req.query), countOfArticles()])
      .then(([articles, count]) => {
        const total_count = count.count;
        res.status(200).send({ total_count, articles });
      })
      .catch(next);
  } else {
    fetchArticles(req.query)
      .then(articles => {
        if (articles.length < 1) {
          return Promise.reject({
            status: 404,
            msg: "No such author or topic"
          });
        } else return articles;
      })
      .then(articles => {
        return Promise.all([articles, countOfArticles(author, topic)]);
      })
      .then(([articles, count]) => {
        const total_count = count.count;
        res.status(200).send({ total_count, articles });
      })
      .catch(next);
  }
};
