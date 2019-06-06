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
    it("GET status:200", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.ok).to.equal(true);
        });
    });
    describe("/topics", () => {
      it("GET status: 200,  should return all topics with keys description and slug", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then(({ body }) => {
            expect(body.topics).to.be.an("array");
            expect(body.topics[0]).to.contain.keys("slug", "description");
          });
      });
      it("GET status: 405 route not found if anything else is attached to topics", () => {
        return request(app)
          .get("/api/topic/invaild")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal("Route Not Found");
          });
      });
    });
    describe("/users", () => {
      describe(":username", () => {
        it("GET status: 200 should return a user object with following properties username, avatar_url, name for specific user", () => {
          return request(app)
            .get("/api/users/lurker")
            .then(({ body }) => {
              expect(body.user.username).to.equal("lurker");
              expect(body.user).to.have.keys("username", "avatar_url", "name");
            });
        });
        it("GET status: 404, if user has made a Invaild Route for 1", () => {
          return request(app)
            .get(`/api/users/${1}`)
            .expect(404)
            .then(({ error }) => {
              expect(error.text).to.equal("Invalid Route for 1 request");
            });
        });
        it("GET status: 404, if user has made a Invaild Route for hello", () => {
          return request(app)
            .get(`/api/users/${["hello"]}`)
            .expect(404)
            .then(({ error }) => {
              expect(error.text).to.equal("Invalid Route for hello request");
            });
        });
        it("GET status: 404, if user used right syntax just username is invalid", () => {
          return request(app)
            .get("/api/users/Josh")
            .expect(404)
            .then(({ error }) => {
              expect(error.text).to.equal("Invalid Route for Josh request");
            });
        });
      });
    });
    describe("/articles", () => {
      describe("/:article_id", () => {
        it("GET status:200, reponds an article obj which should have following properties,author, title, article_id, body, topic, created_at,votes, comment_count ", () => {
          return request(app)
            .get("/api/articles/1")
            .expect(200)
            .then(({ body }) => {
              expect(body.article.length).to.eql(1);
              expect(body.article[0]).to.contain.keys(
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
        it("GET status: 400, if user has made a Bad Request", () => {
          return request(app)
            .get(`/api/articles/hello`)
            .expect(400)
            .then(error => {
              expect(error.text).to.equal("Bad Request");
            });
        });
        it("GET status: 404, if user has made a okay Request but not such article id", () => {
          return request(app)
            .get(`/api/articles/999`)
            .expect(404)
            .then(error => {
              expect(error.text).to.equal("Route Not Found");
            });
        });
      });
      describe("/:article_id", () => {
        it("PATCH -article_id- status : 200  increments house points up and down on an updated article ", () => {
          return request(app)
            .patch("/api/articles/1")
            .send({ inc_Votes: 6 })
            .expect(200)
            .then(({ body }) => {
              expect(body.article[0].votes).to.equal(106);
            });
        });
        it("PATCH status 400, if bad request is given or a inncorect format of a body", () => {
          return request(app)
            .patch("/api/articles/2")
            .send({ inc_Votes: "hello" })
            .expect(400)
            .then(error => {
              expect(error.text).to.equal("Bad Request");
            });
        });
        it("PATCH status 404, if ", () => {
          return request(app)
            .patch("/api/articles/999")
            .send({ inc_Votes: 6 })
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
                expect(body.newComment[0].author).to.equal("lurker");
                expect(body.newComment[0]).to.have.keys(
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
                expect(err.text).to.eql("Invalid username input");
              });
          });
          it("POST STATUS: 400, invaild parametric point ", () => {
            return request(app)
              .post("/api/articles/hello/comments")
              .send({ username: "lurker", body: "today is a good day" })
              .expect(400)
              .then(err => {
                expect(err.text).to.eql("Bad Request");
              });
          });
        });
        describe.only("/comments", () => {
          it("GET status :200 responds with array of comments for a given article_id", () => {
            return request(app)
              .get("/api/articles/5/comments")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.have.lengthOf(2);
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
          it("POST STATUS: 404, valid username input but no such article_id ", () => {
            return request(app)
              .get("/api/articles/2/comments")
              .expect(404)
              .then(err => {
                expect(err.text).to.eql("Route Not Found");
              });
          });
          it("POST STATUS: 400, invalid username input ", () => {
            return request(app)
              .get("/api/articles/hello/comments")
              .expect(400)
              .then(err => {
                expect(err.text).to.eql("Bad Request");
              });
          });
          it("Get status 200 takes a sortby query", () => {
            return request(app)
              .get("/api/articles/1/comments?sort_by=votes&&order=asc")
              .expect(200)
              .then(({ body }) => {
                expect(body.comments).to.be.sortedBy("votes");
              });
          });
        });
      });
    });
  });
});
