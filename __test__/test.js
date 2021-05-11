const supertest = require("supertest")
const app = require("../bin/www")

afterEach(() => {
    app.close()
})
describe("GET /fetchRecords", function () {
  it("responds with fetchall computation from database", function (done) {
    supertest(app)
      .get("/fetchRecords")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
})
describe("POST  for TRIANGLE /calculate", function () {
    it("responds with 201 created", function (done) {
        const Data = {
            "shape": "triangle",
            "dimension": {
                "a": 5,
                "b": 4,
                "c": 7
            },
        };
        supertest(app)
            .post("/calculate")
            .send(Data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    });
    it("responds with 400 Bad Request incomplete dimention for triangle", function (done) {
        const Data = {
            "shape": "triangle",
            "dimension": {
                "a": 3,
                "b": 4
            },
        };
        supertest(app)
            .post("/calculate")
            .send(Data)
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(400)
            .end(function (err, res) {
                if (err) return done(err);
                return done();
            });
    })     
})

describe("POST  for SQUARE /calculate", function () {
  it("responds with 201 created", function (done) {
    const Data = {
      "shape": "square",
      "dimension": 2
    };
    supertest(app)
      .post("/calculate")
      .send(Data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
  it("responds with 400 Bad Request incomplete dimention for square", function (done) {
    const Data = {
      "shape": "square",
      "dimension":"2"
    };
    supertest(app)
      .post("/calculate")
      .send(Data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
describe("POST  for RECTANGLE /calculate", function () {
  it("responds with 201 created", function (done) {
    const Data = {
      "shape": "rectangle",
      "dimension": {
        "a": 5,
        "b": 4
      },
    };
    supertest(app)
      .post("/calculate")
      .send(Data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
  it("responds with 400 Bad Request incomplete dimention for RECTANGLE", function (done) {
    const Data = {
      "shape": "rectangle",
      "dimension": {
        "a": 3
      },
    };
    supertest(app)
      .post("/calculate")
      .send(Data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
describe("POST  for CIRCLE /calculate", function () {
  it("responds with 201 created", function (done) {
    const Data = {
      "shape": "circle",
      "dimension": 2,
    };
    supertest(app)
      .post("/calculate")
      .send(Data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
  it("responds with 400 Bad Request incomplete dimention for square", function (done) {
    const Data = {
      "shape": "square",
      "dimension": "2",
    };
    supertest(app)
      .post("/calculate")
      .send(Data)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});