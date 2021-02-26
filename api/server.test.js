const request = require("supertest");
const server = require("./server");
const db = require("../database/connection");


beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})


beforeEach(async () => {
    await db("users").truncate()
})
  

  afterAll(async () => {
    await db.destroy()
})


const User = require('./users/users-model')
const UserData1 = {
    username: "testTest",
    password: "$2a$08$X3ISJNHVJmzCJVBj4L6RKexR.wRN3QF4Za5xkWVNBNsaevh8.YpF2",
    department: "Test"
}


const UserData2 = {
  username: "testTester",
  password: "$2a$08$X3ISJNHVJmzCJVBj4L6RKexR.wRN3QF4Za5xkWVNBNsaevh8.YpF2",
  department: "Test"
}

describe("sanityTest", () => {
    test('math', () => {
      expect(2).toEqual(2)
    })
})
  


test('get returns users', async () => {
  await db('users').insert(UserData1)
    const result = await User.find()
    expect(result).toHaveLength(1)
    expect(result[0]).toMatchObject(UserData1) 
    expect(result[0]).toHaveProperty('username','testTest')
})
    

test('insert new user', async () => {
  await User.add(UserData1)
  await User.add(UserData2)

  const result = await User.find()

  expect(result).toHaveLength(2)
  expect(result[0]).toMatchObject(UserData1)
  expect(result[0]).toHaveProperty('username', 'testTest')
  expect(result[1]).toMatchObject(UserData2)
  expect(result[1]).toHaveProperty('username', 'testTester')
})


test('remove user at id', async () => {
  await db('users').insert(UserData1)
  await db('users').insert(UserData2)
  let result = await User.find()
  expect(result).toHaveLength(2)
  expect(result[0]).toMatchObject(UserData1)
  await User.remove(1)
  result = await User.find()
  expect(result[0]).toMatchObject(UserData2)
  expect(result).toHaveLength(1)
})