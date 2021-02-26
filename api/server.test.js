const request = require("supertest");
const server = require("./server");
const db = require("../database/connection");


beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });



beforeEach(async () => {
    await db("users").truncate();
  });
  
  afterAll(async () => {
    await db.destroy();
  });


describe("sanityTest", () => {
    test('math', () => {
      expect(2).toEqual(2)
    })
  });
  