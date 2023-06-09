const db = require("./data/dbConfig");
const request = require("supertest");
const server = require("./api/server");

afterAll(async () => {
  await db.destroy();
});

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
  await db.seed.run();
});

test("Sanity check", () => {
  expect(process.env.NODE_ENV).toBe("testing");
});

test("[0] Testler çalışır durumda", () => {
  expect(true).toBe(true);
});

test("[1] Get methoduyla tüm görevler geliyor mu", async () => {
  //act
  const allGorevs = await request(server).get("/api/users");
  //assert
  expect(allGorevs.statusCode).toBe(200);
});

describe("UserTestler", () => {
  test("[1] Get methoduyla tüm görevler geliyor mu", async () => {
    //act
    const allGorevs = await request(server).get("/api/users");
    //assert
    expect(allGorevs.statusCode).toBe(200);
  });
});
test("[2] Post(/register) ile kayıt olunuyor mu?", async () => {
  // Arrange
  const userData = {
    username: "username",
    password: "1234567",
    email: "deneme1@example.com",
    avatar_url: "avatar1.jpg",
  };

  // Act
  const response = await request(server)
    .post("/api/auth/register")
    .send(userData);

  // Assert
  expect(response.status).toBe(201);
  expect(response.body.insertedUser).toHaveProperty(
    "username",
    userData.username
  );
  expect(response.body.insertedUser).toHaveProperty("email", userData.email);
  expect(response.body.insertedUser).toHaveProperty(
    "avatar_url",
    userData.avatar_url
  );
});

// test("[2] Post(/register) ile kayıt olunuyor mu?", async () => {
//   // Arrange
//   const userData = {
//     username: "username",
//     password: "1234567",
//     email: "deneme1@example.com",
//     avatar_url: "avatar1.jpg",
//   };

//   // Act
//   const response = await request(server)
//     .post("/api/auth/register")
//     .send(userData);

//   // Assert
//   expect(response.status).toBe(201);
//   expect(response.body).toHaveProperty("username", userData.username);
//   expect(response.body).toHaveProperty("email", userData.email);
//   expect(response.body).toHaveProperty("avatar_url", userData.avatar_url);
// });

const newAdminUser = {
  username: "baha",
  password: "password",
  email: "baha@wit.com",
  avatar_url: "avatar_url",
};

const loginUser = {
  usernameOrEmail: "baha",
  password: "password",
};

describe(" ___ auth___", () => {
  test("create a new user", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send(newAdminUser);
    const user = await db("users")
      .where({
        username: "baha",

        password: "password",
      })
      .first();

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User successfully created.");
  });

  test("new user can login ", async () => {
    await request(server).post("/api/auth/register").send(newAdminUser);
    const res = await request(server).post("/api/auth/login").send(loginUser);

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
  });
});
