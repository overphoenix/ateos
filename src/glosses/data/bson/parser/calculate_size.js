const {
  is
} = ateos;

const Binary = require("../binary");
const normalizedFunctionString = require("./utils").normalizedFunctionString;
const constants = require("../constants");

// To ensure that 0.4 of node works correctly
function isDate(d) {
  return typeof d === "object" && Object.prototype.toString.call(d) === "[object Date]";
}

function calculateObjectSize(object, serializeFunctions, ignoreUndefined) {
  let totalLength = 4 + 1;

  if (ateos.isArray(object)) {
    for (let i = 0; i < object.length; i++) {
      totalLength += calculateElement(
        i.toString(),
        object[i],
        serializeFunctions,
        true,
        ignoreUndefined
      );
    }
  } else {
    // If we have toBSON defined, override the current object

    if (object.toBSON) {
      object = object.toBSON();
    }

    // Calculate size
    for (const key in object) {
      totalLength += calculateElement(key, object[key], serializeFunctions, false, ignoreUndefined);
    }
  }

  return totalLength;
}

/**
 * @ignore
 * @api private
 */
function calculateElement(name, value, serializeFunctions, isArray, ignoreUndefined) {
  // If we have toBSON defined, override the current object
  if (value && value.toBSON) {
    value = value.toBSON();
  }

  switch (typeof value) {
    case "string":
      return 1 + Buffer.byteLength(name, "utf8") + 1 + 4 + Buffer.byteLength(value, "utf8") + 1;
    case "number":
      if (
        Math.floor(value) === value &&
        value >= constants.JS_INT_MIN &&
        value <= constants.JS_INT_MAX
      ) {
        if (value >= constants.BSON_INT32_MIN && value <= constants.BSON_INT32_MAX) {
          // 32 bit
          return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (4 + 1);
        } 
        return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
        
      } 
      // 64 bit
      return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
      
    case "undefined":
      if (isArray || !ignoreUndefined) {
        return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + 1; 
      }
      return 0;
    case "boolean":
      return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (1 + 1);
    case "object":
      if (ateos.isNil(value) || value._bsontype === "MinKey" || value._bsontype === "MaxKey") {
        return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + 1;
      } else if (value._bsontype === "ObjectId" || value._bsontype === "ObjectID") {
        return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (12 + 1);
      } else if (value instanceof Date || isDate(value)) {
        return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
      } else if (!ateos.isUndefined(Buffer) && ateos.isBuffer(value)) {
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (1 + 4 + 1) + value.length
        );
      } else if (
        value._bsontype === "Long" ||
        value._bsontype === "Double" ||
        value._bsontype === "Timestamp"
      ) {
        return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (8 + 1);
      } else if (value._bsontype === "Decimal128") {
        return (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (16 + 1);
      } else if (value._bsontype === "Code") {
        // Calculate size depending on the availability of a scope
        if (!ateos.isNil(value.scope) && Object.keys(value.scope).length > 0) {
          return (
            (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
            1 +
            4 +
            4 +
            Buffer.byteLength(value.code.toString(), "utf8") +
            1 +
            calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined)
          );
        } 
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
            1 +
            4 +
            Buffer.byteLength(value.code.toString(), "utf8") +
            1
        );
        
      } else if (value._bsontype === "Binary") {
        // Check what kind of subtype we have
        if (value.sub_type === Binary.SUBTYPE_BYTE_ARRAY) {
          return (
            (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
            (value.position + 1 + 4 + 1 + 4)
          );
        } 
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) + (value.position + 1 + 4 + 1)
        );
        
      } else if (value._bsontype === "Symbol") {
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
          Buffer.byteLength(value.value, "utf8") +
          4 +
          1 +
          1
        );
      } else if (value._bsontype === "DBRef") {
        // Set up correct object for serialization
        const ordered_values = Object.assign(
          {
            $ref: value.collection,
            $id: value.oid
          },
          value.fields
        );

        // Add db reference if it exists
        if (!ateos.isNil(value.db)) {
          ordered_values.$db = value.db;
        }

        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
          1 +
          calculateObjectSize(ordered_values, serializeFunctions, ignoreUndefined)
        );
      } else if (
        value instanceof RegExp ||
        Object.prototype.toString.call(value) === "[object RegExp]"
      ) {
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
          1 +
          Buffer.byteLength(value.source, "utf8") +
          1 +
          (value.global ? 1 : 0) +
          (value.ignoreCase ? 1 : 0) +
          (value.multiline ? 1 : 0) +
          1
        );
      } else if (value._bsontype === "BSONRegExp") {
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
          1 +
          Buffer.byteLength(value.pattern, "utf8") +
          1 +
          Buffer.byteLength(value.options, "utf8") +
          1
        );
      } 
      return (
        (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
          calculateObjectSize(value, serializeFunctions, ignoreUndefined) +
          1
      );
      
    case "function":
      // WTF for 0.4.X where typeof /someregexp/ === 'function'
      if (
        value instanceof RegExp ||
        Object.prototype.toString.call(value) === "[object RegExp]" ||
        String.call(value) === "[object RegExp]"
      ) {
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
          1 +
          Buffer.byteLength(value.source, "utf8") +
          1 +
          (value.global ? 1 : 0) +
          (value.ignoreCase ? 1 : 0) +
          (value.multiline ? 1 : 0) +
          1
        );
      } 
      if (serializeFunctions && !ateos.isNil(value.scope) && Object.keys(value.scope).length > 0) {
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
            1 +
            4 +
            4 +
            Buffer.byteLength(normalizedFunctionString(value), "utf8") +
            1 +
            calculateObjectSize(value.scope, serializeFunctions, ignoreUndefined)
        );
      } else if (serializeFunctions) {
        return (
          (!ateos.isNil(name) ? Buffer.byteLength(name, "utf8") + 1 : 0) +
            1 +
            4 +
            Buffer.byteLength(normalizedFunctionString(value), "utf8") +
            1
        );
      }
      
  }

  return 0;
}

module.exports = calculateObjectSize;
