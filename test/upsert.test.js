const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: 'database/database.sqlite', // or ':memory:'
  dialectOptions: {
    // Your sqlite3 options here
  }
});

class User extends Model {}
User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ssn: {
    type: DataTypes.STRING,
    unique: true,
  },
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

afterAll(async () => {
  await sequelize.close();
});

test('should return model with id', async () => {
  await sequelize.sync({ force: true });

  const [jane] = await User.upsert({
    ssn: '123456-XXX',
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });

  console.log('janedoe upsert', jane.toJSON());

  expect(jane.id).not.toBeNull(); // fails because the id is null.
});
