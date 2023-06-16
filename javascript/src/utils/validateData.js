const validateData = (label, parentId, nodeData, rootData) => {
// Validate parentId, but only if it is not null
  if (parentId !== null) {
    if (!Number.isInteger(parentId) || parentId <= 0) {
      throw new Error('Invalid parentId.');
    }
  }

  // Validate input
  if (parentId !== null && !nodeData[parentId]) {
    throw new Error('Parent node does not exist.');
  }

  // Check if root node already exists
  if (parentId === null && rootData !== null) {
    throw new Error('A root node already exists.');
  }

  // Check if label is a non-empty string
  if (typeof label !== 'string' || label.trim() === '') {
    throw new Error('Label must be a non-empty string.');
  }

  // Does label contain double quotes or backslashes?
  if (/["\\]/.test(label)) {
    throw new Error('Label contains invalid characters.');
  }
};

module.exports = validateData;
