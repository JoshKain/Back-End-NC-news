const {
  fetchCommentsByArticle_id
} = require("../models/fetch-comments-by-article_id");
const {
  fetchArticleByArticle_id
} = require("../models/fetch-article-by-article_id");

exports.sendCommentsByArticle_id = (req, res, next) => {
  const article_id = req.params;
  fetchCommentsByArticle_id({ article_id }, req.query)
    .then(([...comments]) => {
      if (comments.length < 1) {
        let num = 0;
        return fetchArticleByArticle_id({ article_id, num }).then(
          ([comments]) => {
            if (!comments) {
              return Promise.reject({
                status: 404,
                msg: "Route Not Found"
              });
            } else res.status(200).send({ comments });
          }
        );
      } else res.status(200).send({ comments });
    })
    .catch(next);
};
