# feedback on NC-News BE for Josh K

## Seeding

- `let`? do you need to use `let`? are you reassigning?
- `final`? not sure what this variable could contain.

### Utils

formatData
`let x`!!!!!!!!!!!! <<<<<<<<<<whats this!!>>>>>>>>>> anything but x!

- do you need to destucture here?
- don't forget about mutation of the obj
  formatBelongToKey
  `comments` OR `comment` ?
  formatTimestamp
- careful of mutation. we should always avoid it where possible. You are mutating the `data` and as well as not using `map` as intended!

## Routers

- really neat and well layed out! nice work.
- all follow chaining pattern which is nice
- You shouldn't need a routeNotFound on all routers, should be ok having one just for all in app. (from what I remember). possibly because of where you have put the app.js routeNotFound. for readability i would put the routeNotFound higher up in app, however this should work for all routes that are garbage.

## Controllers

- no nested thens! In order to async code more readable promises allow us to return promises from the callbacks and access the result in the next `then` block. Use this style
- Careful when using `next` within a then callback function. In some situations you have used `Promise.reject` and others you have used `next` to pass on the error, but the difference between the 2 is down to the promise chain itself. If there is an error ultimately we don't want any more code to run after this `then` block so `Promise.reject` ignores any further `.then` chains and passes the argument straight to the `catch`. In contrast `next` will pass on an error to your error handlers but the promise chain will continue running as normal which can be problematic if you develop you controller further. For consistency and to be secure with our error handling I would opt for using `Promise.reject` throughout.
  sendCommentsByArticle_id
- why routeNotFound in the message?? with the route/path, this clearly exist since you have created it and it would normally response under normal conditions, the error needs to be more tailored to what's actually happening.
  sendUserByUsername
- why invalid route?
  deleteCommentByComment_id
- the body won't send on a 204 since this is a no content

## Models

fetchArticleByArticle_id

- this is doing 2 things at once, although I like that you're trying to remain DRY with your code, this function has multiple
- two `returning('*')` in this?
- the incrementing is not in line with the description of the function
  fetchDeletedComment
- not sure on the function name here...

### returning all

- this is not required when the method is already requesting data. methods like inserting don't return the information by default therefore it would be required there.
- be sure to remove the ones that aren't required.
  Other than that, model it good!!

## Error handling

great stuff!
just remember about the promise.reject vs next thing
next is great in the catch because the catch receives all errors that occur above in the promise chain.

## Testing

- looks good, glad you're making use of chai-sorted and testing for potential errors
- in the utils one might be worth testing for mutation

## Hosting

- is it?

## README

- do you have one?

## Others

- make sure to remove additional unrequired files (e.g. quiries.sql)
- consider _Code Spell Checker_ extension by _Street Side Software_ for spelling mistakes
