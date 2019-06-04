const { formatTimestamp } = require("../utils/convert-timestamp");
const {
  formatBelongToKey,
  createRef,
  formatData
} = require("../utils/format-comments");
const { expect } = require("chai");

describe("#formatTimestamp", () => {
  it("if given an empty array returns empty array ", () => {
    expect(formatTimestamp([])).to.eql([]);
  });
  it("takes an array with singal object returns that object wrapped in an array if no second argument", () => {
    expect(formatTimestamp([{ hello: "s", p: "okay" }])).to.eql([
      { hello: "s", p: "okay" }
    ]);
  });
  it("takes an array with an object and a keytochange returns that object with the formatted timestamp", () => {
    expect(
      formatTimestamp(
        [{ hello: "s", p: "okay", created_at: 1471522072389 }],
        "created_at"
      )
    ).to.eql([{ hello: "s", p: "okay", created_at: new Date(1471522072389) }]);
  });
  it("takes an array with more then a single object returns those objects with formated keytochange", () => {
    expect(
      formatTimestamp(
        [
          { hello: "s", p: "okay", created_at: 1471522074389 },
          { hello: "s", p: "okay", created_at: 1471522074390 }
        ],
        "created_at"
      )
    ).to.eql([
      { hello: "s", p: "okay", created_at: new Date(1471522074389) },
      { hello: "s", p: "okay", created_at: new Date(1471522074390) }
    ]);
  });
});

describe("#formatBelongToKey", () => {
  it("if given an empty array returns an empty array", () => {
    expect(formatBelongToKey([])).to.eql([]);
  });
  it("given an array with an object and returns the obj when keytochange = null", () => {
    expect(formatBelongToKey([{ hello: 1 }])).to.eql([{ hello: 1 }]);
  });
  it("given an array with an object and to arguments returns the object with key changed", () => {
    expect(formatBelongToKey([{ hello: 1 }], "hello", "author")).to.eql([
      { author: 1 }
    ]);
    expect(
      formatBelongToKey([{ hello: 1, weirdexampleshey: 2 }], "hello", "author")
    ).to.eql([{ author: 1, weirdexampleshey: 2 }]);
  });
  it("should loop through all the object converting all the keys created_by to author", () => {
    expect(
      formatBelongToKey(
        [
          {
            body:
              "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
            belongs_to:
              "The People Tracking Every Touch, Pass And Tackle in the World Cup",
            created_by: "tickle122",
            votes: -1,
            created_at: 1468087638932
          },
          {
            body:
              "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
            belongs_to: "Making sense of Redux",
            created_by: "grumpy19",
            votes: 7,
            created_at: 1478813209256
          }
        ],
        "created_by",
        "author"
      )
    ).to.eql([
      {
        body:
          "Itaque quisquam est similique et est perspiciatis reprehenderit voluptatem autem. Voluptatem accusantium eius error adipisci quibusdam doloribus.",
        belongs_to:
          "The People Tracking Every Touch, Pass And Tackle in the World Cup",
        author: "tickle122",
        votes: -1,
        created_at: 1468087638932
      },
      {
        body: "Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.",
        belongs_to: "Making sense of Redux",
        author: "grumpy19",
        votes: 7,
        created_at: 1478813209256
      }
    ]);
  });
});

describe("#createRef", () => {
  it("given an empty array returns an empty array", () => {
    expect(createRef([])).to.eql([]);
  });
  it("given an array with a single object and no other parameters returns that array with the object", () => {
    expect(createRef([{ hello: 1 }])).to.eql([{ hello: 1 }]);
  });
  it("given an array with a single object and all parameters returns that array with new object containing a reference to that object", () => {
    expect(createRef([{ hello: 1, bye: 2 }], "hello", "bye")).to.eql([
      { 1: 2 }
    ]);
  });
  it("given an array with more then one object and all parameters returns that array with new objects containing a reference to that object", () => {
    expect(
      createRef([{ hello: 1, bye: 2 }, { hello: 4, bye: 3 }], "hello", "bye")
    ).to.eql([{ 1: 2 }, { 4: 3 }]);
  });
});

describe.only("#formatData", () => {
  it("given an empty arr in either parameter should return the dataArr", () => {
    expect(formatData([], [{ hello: 1 }])).to.eql([]);
    expect(formatData([], [])).to.eql([]);
    expect(formatData([{ hello: 1 }], [])).to.eql([{ hello: 1 }]);
  });
  it("should compare the two arrs find the smae keys and replace the value from the refArr", () => {
    expect(
      formatData(
        [{ belongs_to: "spiderman", city: "brookyln" }],
        [{ spiderman: 1 }]
      )
    ).to.eql([{ belongs_to: 1, city: "brookyln" }]);
  });
  it("an arr with more then one object", () => {
    const input1 = [
      { belongs_to: "spiderman", city: "brookyln" },
      { belongs_to: "blackwidow" },
      { belongs_to: "ironMan" }
    ];
    const input2 = [{ spiderman: 1 }, { blackwidow: 2 }, { ironMan: 3 }];
    const expected = [
      { belongs_to: 1, city: "brookyln" },
      { belongs_to: 2 },
      { belongs_to: 3 }
    ];
    expect(formatData(input1, input2)).to.eql(expected);
  });
});
