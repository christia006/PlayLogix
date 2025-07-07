import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const stage = process.env.STAGE || "local";

let envConfig: { secrets: { jwt: string; expiresIn: string }; port: number };

if (stage === "production") {
  envConfig = require("./prod").default;
} else {
  envConfig = require("./local").default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 3000,
    secrets: {
      jwt: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN as string,
      dbUrl: process.env.DATABASE_URL,
    },
  },
  envConfig
);
