const {
  is
} = ateos;

exports.defined = function (val) {
  return !is.nil(val) && (!is.number(val) || !isNaN(val));
};
