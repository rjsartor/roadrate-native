module.exports = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer')
  },
  resolver: {
    sourceExts: ['jsx', 'js', 'ts', 'tsx']
  },
};
