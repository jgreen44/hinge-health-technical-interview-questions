const validateData = require('./utils/validateData');

/**
 * Class representing a node in the tree.
 */
class Node {
  constructor(id, label) {
    this.id = id;
    this.label = label;
    this.children = [];
  }

  addChild(node) {
    this.children.push(node);
  }
}

/**
 * Class representing the tree data structure.
 */
class Tree {
  constructor() {
    this.nodes = {};
    this.root = null;
    this.idCounter = 1;
  }

  /**
   * Add a new node to the tree.
   * @param {string} label - The label for the new node.
   * @param {null} parentId - The ID of the parent node.
   * @return {Node} The new node.
   */
  addNode(label, parentId = null) {
    console.log(`Adding node: label=${label}, parentId=${parentId}`);
    validateData(label, parentId, this.nodes, this.root);

    const node = new Node(this.idCounter++, label);

    this.nodes[node.id] = node;

    if (parentId) {
      this.nodes[parentId].addChild(node);
    } else if (!this.root) {
      this.root = node;
    }

    return node;
  }

  /**
   * Convert the tree or a subtree to a JSON representation.
   * @param {Node} [node=this.root] - The root of the subtree to convert to JSON
   * (default: the root of the tree).
   * @return {Object} A JSON object with the ID, label, and children of the node.
   */
  convertToJSON(node = this.root) {
    return {
      [node.id]: {
        label: node.label,
        children: node.children.map((child) => this.convertToJSON(child)),
      },
    };
  }
}

module.exports = Tree;
