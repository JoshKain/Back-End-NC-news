const { insertNewArticle } = require("../models/insert-new-article");

exports.addNewArticle = (req, res, next) => {
  const article = req.body;
  insertNewArticle(article)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};
