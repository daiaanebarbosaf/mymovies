const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");

describe("UserCreateService", () => {

  it("user shold be create", async () => {

    const user = {
      name: "User Test",
      email: "user@test.com",
      password: "123"
    };
  
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const userCreateService = new UserCreateService(userRepositoryInMemory);
    const userCreated = await userCreateService.execute(user);
  
    expect(userCreated).toHaveProperty("id");
  
  });

  it("user not should be create with exists email", async () => {

  });
  
});

