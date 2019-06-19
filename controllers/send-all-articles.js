const { fetchArticles } = require("../models/fetch-articles");

exports.sendAllArticles = (req, res, next) => {
  fetchArticles(req.query)
    .then(articles => {
      if (articles.length < 1) {
        return Promise.reject({ status: 404, msg: "No such author or topic" });
      } else res.status(200).send({ articles });
    })
    .catch(next);
};

// const getAllArticles = (req, res, next) => {
//   const { author } = req.query;
//   const { topic } = req.query;

//   if (!author && !topic) {
//     return Promise.all([fetchAllArticles(req.query), countOfArticles()])
//       .then(([articles, count]) => {
//         const total_count = count.count;
//         res.status(200).send({ total_count, articles });
//       })
//       .catch(next);
//   } else {
//     Promise.all([
//       topic ? fetchTopicByName(topic) : null,
//       author ? fetchUserByUsername(author) : null
//     ])
//       .then(([topicRows, authorRows]) => {
//         if (authorRows !== null && !authorRows) {
//           return Promise.reject({ code: 404, msg: 'Author does not exist' });
//         } else if (topicRows !== null && !topicRows) {
//           return Promise.reject({ code: 404, msg: 'Topic does not exist' });
//         } else return fetchAllArticles(req.query);
//       })
//       .then(articles => {
//         return Promise.all([articles, countOfArticles()]);
//       })
//       .then(([articles, count]) => {
//         const total_count = count.count;
//         res.status(200).send({ total_count, articles });
//       })
//       .catch(next);
//   }
// };
