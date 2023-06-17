# Task 3

> Design a data schema for a database of your choice that would support the tree data above.

Designing a database schema for the data representation of hierarchical data can utilize both noSQL (such as MongoDB)
and SQL databases (such as PostgreSQL). However, deciding on one or the other is not a matter of simply the data 
structure that was given in this assignment, but rather what we will be doing with the data. That information, 
unfortunately, is out of the scope of this project. Things to consider are:

1. How the data will be queried?
2. The types operations that will be performed.
3. The scale of the data and any changes that may need to occur over time.

Due to not having this information, I will provide a data schema for not only a noSQL database (MongoDB), but also 
an SQL database (PostgreSQL):

### MongoDB

> Recursive Schema

```javascript
new mongoose.Schema({
  id: Number,
  label: String,
  children: [this]
});
```

### PostgreSQL

> Adjacency List Schema

```sql
    CREATE TABLE Nodes (
    id SERIAL,
    label VARCHAR(255) NOT NULL,
    parent_id INT,
    FOREIGN KEY (parent_id) REFERENCES Nodes (id)
);
```

| id  | label    | parent_id |
|-----|----------|-----------|
| 1   | root     | NULL      |
| 2   | ant      | 1         |
| 3   | bear     | 1         |
| 4   | cat      | 3         |
| 5   | dog      | 3         |
| 6   | elephant | 5         |
| 7   | frog     | 1         |


# Task 4

>Write sample queries / code that would support the two routes that are detailed above.

### MongoDB

This would be saved in a Models folder to hold the business logic and additional code would need to be added
to the `addNode()` function to store the data in the database

```javascript
const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema({
  id: Number,
  label: String,
  children: [this]
});

const TreeSchema = mongoose.model('Tree', treeSchema);

module.exports = TreeSchema;
```

### PostgreSQL

The `addNode()` function would need to be slightly altered (similar to above example) so the data could be saved
in the database

tree.js
```javascript
const TreeSchema = require('../models/treeModel');

class Tree {
  constructor() {
    this.nodes = {};
    this.root = null;
    this.idCounter = 1;
    this.treeSchema = new TreeSchema();
  }

  async addNode(label, parentId = null) {
    //... no change ...

    // Save the node to the database
    await this.treeSchema.addNode(node, parentId);

    // ... no change ...
  }
}

module.exports = Tree;

```

/models/treeModel.js
```javascript
const { Pool } = require('pg');
// this would be saved in a .env file and brought in with dotenv.config({ path: './config/config.env' });
const pool = new Pool({
  user: 'dbuser',
  host: 'database.server.com',
  database: 'mydb',
  password: 'secretpassword',
  port: 5432, 
});

class TreeSchema {
  async addNode(node, parentId) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const insertText = 'INSERT INTO Nodes(id, label, parent_id) VALUES($1, $2, $3)';
      const insertValues = [node.id, node.label, parentId];
      await client.query(insertText, insertValues);
      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }
}

module.exports = TreeSchema;

```
