process.env.NODE_ENV = "test";
const chai = require("chai");

const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

const chaiSorted = require("chai-sorted");

chai.use(chaiSorted);

describe("/", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    it("GET STATUS: 200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.api).to.be.an("array");
        });
    });
    describe("/topics", () => {
      it("GET STATUS: 200,  should return all topics with keys description and slug", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys("slug", "description");
          });
      });
      it("GET STATUS: 404 route not found if anything else is attached to topics", () => {
        return request(app)
          .get("/api/topics/invalid")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Route Not Found");
          });
      });
      it("POST STATUS: 201 request body accepts an obj with username and body properties responds with posted topic ", () => {
        return request(app)
          .post("/api/topics")
          .send({ description: "CODING WORLD WIDE", slug: "coding" })
          .expect(201)
          .then(({ body }) => {
            expect(body.topic).to.have.keys("description", "slug");
          });
      });
    });
    describe("/users", () => {
      it("POST STATUS: 201 request body accepts an obj with username and body properties responds with posted users", () => {
        return request(app)
          .post("/api/users")
          .send({
            username: "surfingBoy",
            name: "JoshyKain",
            avatar_url:
              "https://media.giphy.com/media/xT9IgKyHvBNqm1guMo/giphy.gif"
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.user).to.have.keys("username", "name", "avatar_url");
          });
      });
      it("POST STATUS: 400 incorrect body structure", () => {
        return request(app)
          .post("/api/users")
          .send({
            user: "surfingBoy",
            name: "JoshyKain",
            avatar: "https://media.giphy.com/media/xT9IgKyHvBNqm1guMo/giphy.gif"
          })
          .expect(400)
          .then(error => {
            expect(error.text).to.equal("Bad Request");
          });
      });
      it("GET STATUS: 200 all the users", () => {
        return request(app)
          .get("/api/users")
          .expect(200)
          .then(({ body }) => {
            expect(body.users).to.be.an("array");
          });
      });
      it("GET STATUS: 404", () => {
        return request(app)
          .get(`/api/user`)
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Route Not Found");
          });
      });
      describe(":username", () => {
        it("GET STATUS: 200 should return a user object with following properties username, avatar_url, name for specific user", () => {
          return request(app)
            .get("/api/users/lurker")
            .then(({ body }) => {
              expect(body.user.username).to.equal("lurker");
              expect(body.user).to.have.keys("username", "avatar_url", "name");
            });
        });
        it("GET STATUS: 404, if user has made a Invalid Route for 1", () => {
          return request(app)
            .get(`/api/users/1`)
            .expect(404)
            .then(({ error }) => {
              expect(error.text).to.equal("Invalid Route for 1 request");
            });
        });
        it("GET STATUS: 404, if user has made a Invalid Route for hello", () => {
          return request(app)
            .get(`/api/users/${["hello"]}`)
            .expect(404)
            .then(({ error }) => {
              expect(error.text).to.equal("Invalid Route for hello request");
            });
        });
        it("GET STATUS: 404, if user used right syntax just username is invalid", () => {
          return request(app)
            .get("/api/users/Josh")
            .expect(404)
            .then(({ error }) => {
              expect(error.text).to.equal("Invalid Route for Josh request");
            });
        });
      });
    });
    describe.only("/articles", () => {
      it("GET STATUS: 200, responds with an articles array of article objects each with properties author, title, article_id, topic, created_at, votes and comment count", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0]).to.have.keys(
              "author",
              "title",
              "article_id",
              "topic",
              "created_at",
              "votes",
              "comment_count",
              "body"
            );
          });
      });
      it("GET STATUS: 200, responds with an articles array sorted by specific property and in asc order", () => {
        return request(app)
          .get("/api/articles?sort_by=created_at&&order=asc")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy("created_at");
          });
      });
      it("GET STATUS: 200, responds with an articles array sorted by specific property and in desc order", () => {
        return request(app)
          .get("/api/articles?sort_by=article_id")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy("article_id");
          });
      });
      it("GET STATUS: 200, responds with an articles array of username value specified to a query for an author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.articles[0].author).to.equal("butter_bridge");
            expect(body.articles).to.have.length(3);
          });
      });
      it("GET STATUS: 404,responds with an error due to an invalid input", () => {
        return request(app)
          .get("/api/articles?author=R2D2")
          .expect(404)
          .then(({ error }) => {
            expect(error.text).to.equal("No such author or topic");
          });
      });
      it("GET STATUS: 200, responds with an articles array of topics value specified to a query for an topic", () => {
        return request(app)
          .get("/api/articles?topic=cats")
          .expect(200)
          .then(({ body }) => {
            expect(body.articles[0].topic).to.equal("cats");
            expect(body.articles).to.have.length(1);
          });
      });
      it("GET STATUS: 404,responds with an error due to an invalid input", () => {
        return request(app)
          .get("/api/articles?topic=xx")
          .expect(404)
          .then(({ error }) => {
            expect(error.text).to.equal("No such author or topic");
          });
      });
      describe("/articles", () => {
        it("POST STATUS: 201 request body accepts an obj with username and body properties responds with posted article", () => {
          return request(app)
            .post("/api/articles")
            .send({
              title: "Mandela's long walk to freedom",
              topic: "cats",
              author: "icellusedkars",
              body: "South Africans are all my children",
              votes: 50
            })
            .expect(201)
            .then(({ body }) => {
              expect(body.article).to.have.keys(
                "article_id",
                "title",
                "topic",
                "author",
                "body",
                "votes",
                "created_at"
              );
            });
        });
        it("POST STATUS: 404, invalid input ", () => {
          return request(app)
            .post("/api/articles")
            .send({
              title: "Mandela's long walk to freedom",
              body: "South Africans are all my children",
              votes: 50
            })
            .expect(400)
            .then(err => {
              expect(err.text).to.eql("Invalid Key input");
            });
        });
      });
      describe("/:article_id", () => {
        it("GET STATUS: 200, responds an article obj which should have following properties,author, title, article_id, body, topic, created_at,votes, comment_count ", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article).to.contain.keys(
                "author",
                "title",
                "article_id",
                "body",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              );
            });
        });
        it("GET STATUS: 400, if user has made a Bad Request", () => {
          return request(app)
            .get(`/api/articles/hello`)
            .expect(400)
            .then(error => {
              expect(error.text).to.equal("Bad Request");
            });
        });
        it("GET STATUS: 404, if user has made a okay Request but not such article id", () => {
          return request(app)
            .get(`/api/articles/999`)
            .expect(404)
            .then(error => {
              expect(error.text).to.equal("Route Not Found");
            });
        });
      });
      describe("/:article_id", () => {
        it("PATCH -article_id- STATUS: 200  increments house points up and down on an updated article ", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_votes: 6 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article.votes).to.equal(106);
            });
        });
        it("PATCH STATUS: 400, if bad request is given or a incorrect format of a body", () => {
          return request(app)
            .patch("/api/articles/2")
            .send({ inc_votes: "hello" })
            .expect(400)
            .then(error => {
              expect(error.text).to.equal("Bad Request");
            });
        });
        it("PATCH STATUS: 404, if ", () => {
          return request(app)
            .patch("/api/articles/999")
            .send({ inc_votes: 6 })
            .expect(404)
            .then(error => {
              expect(error.text).to.equal("Route Not Found");
            });
        });
      });
      describe("/:article_id", () => {
        describe("/comments", () => {
          it("POST STATUS: 201, request body accepts an obj with username and body properties responds with posted comment ", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({
                username: "lurker",
                body: "today is a good day"
              })
              .expect(201)
              .then(({ body }) => {
                expect(body.comment.author).to.equal("lurker");
                expect(body.comment).to.have.keys(
                  "author",
                  "body",
                  "votes",
                  "article_id",
                  "comment_id",
                  "created_at"
                );
              });
          });
          it("POST STATUS: 404, invalid username input ", () => {
            return request(app)
              .post("/api/articles/22/comments")
              .send({ username: "mitch", body: "today is a good day" })
              .expect(404)
              .then(err => {
                expect(err.text).to.eql("Invalid Username input");
              });
          });
          it("POST STATUS: 400, invalid parametric point ", () => {
            return request(app)
              .post("/api/articles/hello/comments")
              .send({ username: "lurker", body: "today is a good day" })
              .expect(400)
              .then(err => {
                expect(err.text).to.eql("Bad Request");
              });
          });
          it("POST STATUS: 400, missing required fields ", () => {
            return request(app)
              .post("/api/articles/1/comments")
              .send({ body: "today is a good day" })
              .expect(400);
          });
        });
        describe("/comments", () => {
          it("GET STATUS: 200 responds with array of comments for a given article_id", () => {
            return request(app)
              .get("/api/articles/5/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0]).to.have.keys(
                  "comment_id",
                  "votes",
                  "article_id",
                  "body",
                  "author",
                  "created_at"
                );
              });
          });
          it("Get STATUS: 200, article_id does exist but doesn't have any comments receive empty array", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(200);
          });
          it("Get STATUS: 404, valid username input but no such article_id ", () => {
            return request(app)
              .get("/api/articles/99999/comments")
              .expect(404)
              .then(err => {
                expect(err.text).to.eql("Route Not Found");
              });
          });
          it("Get STATUS: 400, invalid username input ", () => {
            return request(app)
              .get("/api/articles/hello/comments")
              .expect(400)
              .then(err => {
                expect(err.text).to.eql("Bad Request");
              });
          });
          it("Get STATUS: 200 takes a sort-by query", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes&&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("votes");
              });
          });
          it("Get STATUS: 400 query sort-by is invalid", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=bob&&order=asc")
              .expect(400)
              .then(err => {
                expect(err.text).to.equal("Bad Request");
              });
          });
        });
      });
    });
    describe("/:comments_id", () => {
      it("PATCH STATUS: 200 takes a comment-id and a body of {inc_Votes :newVote} and increments votes by newVote ", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_Votes: 6 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment).to.have.keys(
              "comment_id",
              "author",
              "article_id",
              "votes",
              "created_at",
              "body"
            );
          });
      });
      it("PATCH STATUS: 200 takes a comment-id and a body of {inc_Votes :newVote} and increments votes by newVote ", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_Votes: 6 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment.votes).to.eql(22);
          });
      });
      it("PATCH STATUS: 400, if bad request is given or a incorrect format of a body", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({ inc_Votes: "hello" })
          .expect(400)
          .then(error => {
            expect(error.text).to.equal("Bad Request");
          });
      });
      it("PATCH STATUS: 404, if valid input by comment_id is not found ", () => {
        return request(app)
          .patch("/api/comments/999")
          .send({ inc_Votes: 6 })
          .expect(404)
          .then(error => {
            expect(error.text).to.equal("Route Not Found");
          });
      });
      it("PATCH STATUS: 400, if invalid key of inc_Votes ", () => {
        return request(app)
          .patch("/api/comments/2")
          .send({ wrongKey: 1 })
          .expect(400)
          .then(error => {
            expect(error.text).to.equal("Bad Request");
          });
      });
    });
    describe("/:comment_id", () => {
      it("DELETE, STATUS: 204 delete a comment by given comment_id", () => {
        return request(app)
          .delete("/api/comments/2")
          .expect(204);
      });
      it("DELETE, STATUS: 400 invalid comment_id", () => {
        return request(app)
          .delete("/api/comments/hello")
          .expect(400);
      });
      it("DELETE, STATUS: 404 valid comment_id but none existent", () => {
        return request(app)
          .delete("/api/comments/999")
          .expect(404)
          .then(({ error }) => {
            expect(error.text).to.equal("No such comment_id");
          });
      });
    });
    describe("/api", () => {
      describe("/ articles", () => {
        it("GET STATUS: 200 get all articles but limited to 10", () => {
          return request(app)
            .get("/api/articles?limit=10")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).to.have.lengthOf(10);
            });
        });
        it("GET STATUS: 200 get all articles but limited to 5 pg 2", () => {
          return request(app)
            .get("/api/articles?limit=5&&p=2")
            .expect(200)
            .then(({ body }) => {
              expect(body.articles[0].article_id).to.equal(6);
            });
        });
      });
      describe("/:articles:", () => {
        describe("/comments", () => {
          it("GET STATUS: 200 get all articles but limited to 10 0n pg 1", () => {
            return request(app)
              .get("/api/articles/1/comments?limit=5&&p=2")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments[0].comment_id).to.equal(7);
              });
          });
        });
      });
    });
  });
});
