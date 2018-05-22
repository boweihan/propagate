module.exports = {
  extends: 'airbnb',
  rules: {
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'max-len': ['error', 200],
    'react/forbid-prop-types': ['error', { forbid: [] }],
    'arrow-parens': 0,
    'no-mixed-operators': 0,
    'import/prefer-default-export': 0,
  },
};
