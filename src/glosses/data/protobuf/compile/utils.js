const {
  is
} = ateos;

exports.defined = function (val) {
  return !ateos.isNil(val) && (!ateos.isNumber(val) || !isNaN(val));
};
