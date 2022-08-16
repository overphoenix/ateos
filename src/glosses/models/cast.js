import { isRef, create as createRef } from "./ref";

const {
  assert,
  is
} = ateos;

export const schema = function (Joi, config) {
  if (!ateos.isNil(config) && typeof config === "object") {

    if (config.isJoi) {
      return config;
    }

    if (ateos.isArray(config)) {
      return Joi.alternatives().try(config);
    }

    if (config instanceof RegExp) {
      return Joi.string().regex(config);
    }

    if (config instanceof Date) {
      return Joi.date().valid(config);
    }

    return Joi.object().keys(config);
  }

  if (ateos.isString(config)) {
    return Joi.string().valid(config);
  }

  if (ateos.isNumber(config)) {
    return Joi.number().valid(config);
  }

  if (ateos.isBoolean(config)) {
    return Joi.boolean().valid(config);
  }

  if (isRef(config)) {
    return Joi.valid(config);
  }

  assert(ateos.isNull(config), config ? `Invalid schema content: ${config}` : "Invalid schema content: ");

  return Joi.valid(null);
};

export const ref = (id) => isRef(id) ? id : createRef(id);
