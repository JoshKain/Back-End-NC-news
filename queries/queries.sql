--for articles

\c be_nc_news_test;

-- SELECT articles.*, COUNT(comment_id) AS comments_count
-- FROM articles
--     LEFT JOIN comments ON comments.article_id = articles.article_id
-- GROUP BY articles.article_id;



-- SELECT username, body
-- FROM comments
-- JOIN users ON comments.author = users.username
-- INSERT INTO comments (username, body)
-- VALUES ('josh', 'hello');


SELECT articles.*, COUNT(comment_id) AS comment_count
FROM articles
LEFT JOIN comments ON comments.article_id = articles.article_id
GROUP BY articles.article_id;
