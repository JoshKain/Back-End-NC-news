<!-- ## Test Output

Read through all errors. Note that any failing test could be caused by a problem uncovered in a previous test on the same endpoint.

### GET `/api/articles`

Assertion: expected [ Array(12) ] to contain key 'articles'

Hints:

- send articles to the client in an object, with a key of articles: `{ articles: [] }`

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- See above

### GET `/api/articles`

Assertion: Cannot read property '0' of undefined

Hints:

- See above

### GET `/api/articles?sort_by=author`

Assertion: Cannot read property '0' of undefined

Hints:

- See above

### GET `/api/articles?order=asc`

Assertion: Cannot read property '0' of undefined

Hints:

- See above -->

<!-- ### GET `/api/articles?author=butter_bridge`

Assertion: Cannot read property 'every' of undefined

Hints:

- See above

### GET `/api/articles?topic=mitch`

Assertion: Cannot read property 'every' of undefined

Hints:

- accept an `topic` query of any topic slug that exists in the database
- use `where` in the model

### GET `/api/articles?sort_by=not-a-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client

### PATCH `/api/articles`

Assertion: expected 404 to equal 405

Hints:

- use `.all()` on each route, to serve a 405: Method Not Found status code

### GET `/api/articles/1`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the article to the client in an object, with a key of `article`: `{ article: {} }`
- return the single article in an object, not in an array
- ensure there are no discrepancies between the README specification and your table column names

### GET `/api/articles/2`

Assertion: expected undefined to equal 0

Hints:

- See above re: expected [ Array(1) ] to be an object

### GET `/api/articles/1`

Assertion: expected undefined to equal '13'

Hints:

- See above re: expected [ Array(1) ] to be an object

### PATCH `/api/articles/1`

Assertion: expected [ Array(1) ] to be an object

Hints:

- send the updated article with a key of `article`

### PATCH `/api/articles/1`

Assertion: expected undefined to equal 101

Hints:

- increment / decrement the `votes` of the specified article with the knex method **`increment`**

### PATCH `/api/articles/1`

Assertion: expected undefined to equal 100

Hints:

- ignore a `patch` request with no information in the request body, and send the unchanged article to the client
- provide a default argument of `0` to the `increment` method, otherwise it will automatically increment by 1

### PATCH `/api/articles/1`

Assertion: expected 200 to equal 400

Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value -->
<!--
### GET `/api/articles/1/comments`

Assertion: expected { Object (comment_id, author, ...) } to have keys 'comment_id', 'votes', 'created_at', 'author', and 'body'

Hints:

- send comments to the client in an object, with a key of comments: `{ comments: [] }`
- use `author` for the column to store the username that created the comment
- use the data from the `test-data` in your tests -->

### GET `/api/articles/2/comments`

Assertion: expected 404 to equal 200

Hints:

- return 200: OK when the article exists
- serve an empty array when the article exists but has no comments

<!-- ### GET `/api/articles/1/comments?sort_by=not-a-valid-column`

Assertion: expected 500 to be one of [ 200, 400 ]

Hints:

- filter out invalid `sort_by` queries _OR_ handle in the error handling middleware
- pick a consistent approach: ignore the invalid query, and use a 200 to serve up the articles with the default sort _OR_ use a 400 and provide a useful message to the client -->

<!-- ### POST `/api/articles/1/comments`

Assertion: expected { Object (newComment) } to contain key 'comment'

Hints:

- send the new comment back to the client in an object, with a key of comment: `{ comment: {} }`
- ensure all columns in the comments table match the README -->

<!-- ### POST `/api/articles/1/comments`

Assertion: Cannot read property 'votes' of undefined

Hints:

- see above: expected { Object (newComment) } to contain key 'comment' -->

<!-- ### PATCH `/api/comments/1`

Assertion: expected undefined to equal 1

Hints:

- see above: expected { Object (newComment) } to contain key 'comment'

### PATCH `/api/comments/1`

Assertion: expected undefined to equal 17

Hints:

- see above: expected { Object (newComment) } to contain key 'comment'

### PATCH `/api/comments/1`

Assertion: expected 200 to equal 400

Hints:

- see above: expected { Object (newComment) } to contain key 'comment'

### PATCH `/api/comments/1`

Assertion: expected undefined to equal 16

Hints:

- see above: expected { Object (newComment) } to contain key 'comment' -->

<!-- ### PATCH `/api/comments/1`

Assertion: expected 200 to equal 400

Hints:

- use a 400: Bad Request status code when sent an invalid `inc_votes` value -->
