const Tree = require('../tree');

describe('Tree', () => {
  let tree;

  beforeEach(() => {
    tree = new Tree();
  });

  describe('addNode', () => {
    it('adds a root node if no parent ID is given', () => {
      tree.addNode('root');
      expect(tree.root).toEqual(expect.objectContaining({ id: 1, label: 'root' }));
      expect(tree.nodes[1]).toEqual(expect.objectContaining({ id: 1, label: 'root' }));
    });

    it('adds a child node to the root node if parent ID is given', () => {
      tree.addNode('root');
      tree.addNode('child', 1);
      expect(tree.root.children[0]).toEqual(expect.objectContaining({ id: 2, label: 'child' }));
    });

    it('throws an error if trying to add a second root', () => {
      tree.addNode('root');
      expect(() => tree.addNode('anotherRoot')).toThrow('A root node already exists.');
    });

    it('throws an error if trying to add a node to a non-existent parent', () => {
      expect(() => tree.addNode('child', 999)).toThrow('Parent node does not exist.');
    });
  });

  describe('convertToJSON', () => {
    it('returns the correct JSON representation of the tree', () => {
      tree.addNode('root');
      tree.addNode('child', 1);
      const json = tree.convertToJSON();
      expect(json).toEqual({
        1: {
          label: 'root',
          children: [
            {
              2: {
                label: 'child',
                children: [],
              },
            },
          ],
        },
      });
    });
  });
});
