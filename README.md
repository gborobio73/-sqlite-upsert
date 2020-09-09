# Sqlite upsert test
When using sqlite, the model returned by the `upsert` method does not have the primary key updated when it's set to `autoincrement`. See the example in [tests](./test/upsert.test.js)


