const { formatTimestamp } = require("../utils/convert-timestamp");
const { expect } = require("chai");

describe.only("#formatTimestamp", () => {
  it("takes an empty array returns empty array ", () => {
    expect(formatTimestamp([])).to.eql([]);
  });
  it("takes an array with singal object returns that object if no second argument", () => {
    expect(formatTimestamp([{ hello: "s", p: "okay" }])).to.eql([
      { hello: "s", p: "okay" }
    ]);
  });
  it("takes an array with object returns that object with formated keytochange", () => {
    expect(
      formatTimestamp(
        [{ hello: "s", p: "okay", created_at: 1471522072389 }],
        "created_at"
      )
    ).to.eql([{ hello: "s", p: "okay", created_at: new Date(1471522072389) }]);
  });
  it("takes an array with object returns that object with formated keytochange", () => {
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
