const { fetchArticleToBeDeleted } = require("../models/fetch-deleted-article");

exports.deleteArticleByArticle_id = (req, res, next) => {
  fetchArticleToBeDeleted(req.params)
    .then(body => {
      if (!body[0]) {
        return Promise.reject({ status: 404, msg: "No such article_id" });
      } else
        res.status(204).send({
          msg: `comment_id ${req.params} has been successfully deleted`
        });
    })
    .catch(next);
};
