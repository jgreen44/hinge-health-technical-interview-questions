// eslint-disable-next-line max-classes-per-file
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

class Tree {
  constructor() {
    this.nodes = {};
    this.root = null;
  }

  addNode(id, label, parentId) {
    const node = new Node(id, label);

    this.nodes[id] = node;

    if (parentId) {
      this.nodes[parentId].addChild(node);
    } else if (!this.root) {
      this.root = node;
    }

    return node;
  }

  toJSON(node = this.root) {
    return {
      [node.id]: {
        label: node.label,
        children: node.children.map((child) => this.toJSON(child)),
      },
    };
  }
}

module.exports = Tree;
