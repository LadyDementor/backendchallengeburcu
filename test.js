const request = require("supertest");
const server = require("./api/server");
const db = require("./data/dbConfig");

beforeAll(async ()=>{
  await db.migrate.rollback();
   await db.migrate.latest();
}) ;

beforeEach(async ()=>{
  await db.seed.run();
})

test("Sanity check", ()=>{
  expect(process.env.NODE_ENV).toBe("testing");
})

test("[0] Testler çalışır durumda", () => {
  expect(true).toBe(true);
});

test("[1] kayıt olunca kayıtlar dönüyor mu?", async () => {
  let userModel = { username: "Burcu", password: "1234" };
  let actual = await request(server).post("/api/auth/register").send(userModel);
  expect(actual.status).toBe(201);
  expect(actual.body.username).toBe("Burcu");
});
