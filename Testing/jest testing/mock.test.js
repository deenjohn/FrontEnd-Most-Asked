const Users = require('./users');
let axios = require('axios');

function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}


describe("Ordinal Number", () => {

  test("for each callback", () => {
    const mockCallback = jest.fn(x => 42 + x);
    forEach([0, 1], mockCallback);
    // The mock function is called twice
    expect(mockCallback.mock.calls.length).toBe(2);
  });

  test('should fetch users', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    jest.mock('axios');
    axios.get = jest.fn()

    // axios.get('/users.json').then(resp => resp.data);
    axios.get.mockImplementation(() => Promise.resolve(resp))
   
    return Users.all().then(data => expect(data).toEqual(users));
  });
});