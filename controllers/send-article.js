const {
  fetchArticleByArticle_id
} = require("../models/fetch-article-by-article_id");

exports.sendArticleByArticle_id = (req, res, next) => {
  let article_id = req.params;
  let num = req.body;
  fetchArticleByArticle_id({ article_id, num })
    .then(([article]) => {
      if (!article) {
        next({ status: 404, msg: "Route Not Found" });
      } else res.status(200).send({ article });
    })
    .catch(next);
};
