## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint)

### GET `/api/articles/1/comments`

Assertion: expected { Object (comment_id, author, ...) } to have keys 'comment_id', 'votes', 'created_at', 'author', and 'body'

Hints:

- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- use the data from the `test-data` in your tests

### GET `/api/articles/2/comments`

Assertion: expected { Object (article_id, title, ...) } to deeply equal []

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments
- if the endpoint is for comments(plural), even if we only return one comment, it should be inside an array - this will make it much easier to handle on the front-end
