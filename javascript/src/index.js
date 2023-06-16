const express = require('express');
const Tree = require('./tree');

const db = [];

const PORT = 3001;

const app = express();

// Body parser
app.use(express.json());

const tree = new Tree();
tree.addNode(1, 'root');
tree.addNode(2, 'ant', 1);
tree.addNode(3, 'bear', 1);
tree.addNode(4, 'cat', 3);
tree.addNode(5, 'dog', 3);
tree.addNode(6, 'elephant', 5);
tree.addNode(7, 'frog', 1);

let idCounter = 8;

app.get('/api/tree', (req, res) => {
  if (db.length === 0) {
    db.push(res.json(tree.toJSON()));
  }
  res.json(tree.toJSON());
});

app.post('/api/tree', (req, res) => {
  const { parent, label } = req.body;

  // generate new unique id
  // eslint-disable-next-line no-plusplus
  const newId = idCounter++;

  db.push(tree.addNode(newId, label, parent));

  res.json({ message: 'Node added successfully' });
});

app.listen(PORT, () => {
  console.log('App listening on port 3001!');
});
