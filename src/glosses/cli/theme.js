export default ateos.lazify({
  primary: () => ateos.cli.chalkify("#388E3C"),
  secondary: () => ateos.cli.chalkify("#2196F3"),
  accent: () => ateos.cli.chalkify("#7C4DFF"),
  focus: () => ateos.cli.chalkify("#009688"),
  inactive: () => ateos.cli.chalkify("#616161"),
  error: () => ateos.cli.chalkify("#D32F2F"),
  warn: () => ateos.cli.chalkify("#FF5722"),
  info: () => ateos.cli.chalkify("#FFEB3B"),
  notice: () => ateos.cli.chalkify("#FFEB3B")
}, null);
