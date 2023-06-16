const express = require('express');
const Tree = require('./tree');

const PORT = 3001;

const app = express();

// Body parser
app.use(express.json());

const tree = new Tree();
tree.addNode('root');
tree.addNode('ant', 1);
tree.addNode('bear', 1);
tree.addNode('cat', 3);
tree.addNode('dog', 3);
tree.addNode('elephant', 5);
tree.addNode('frog', 1);

app.get('/api/tree', (req, res) => res.status(200).json(tree.convertToJSON()));

app.post('/api/tree', (req, res) => {
  try {
    // Check if "parent" and "label" are provided in request body
    if (!('parent' in req.body) || !('label' in req.body)) {
      return res.status(400).json({ message: 'Request body must contain "parent" and "label".' });
    }

    // Deconstruct parent and label from request body
    const { parent, label } = req.body;

    // Check if parent is a number and label is a string
    if (typeof parent !== 'number' || typeof label !== 'string') {
      return res.status(400).json({ message: 'Parent must be a number and label must be a string.' });
    }

    tree.addNode(label, parent);
    return res.status(200).json({ message: 'Node added successfully' });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
