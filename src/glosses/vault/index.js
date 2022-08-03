// Store semantics:
// vids - Array of valuable identifiers
// v:{id} - Metadata of valuable with id 
// tids - Array of tag identifiers
// t:{id} - Metadata of tag with id
// v:{id}:{kid} - Metadata of valuable item with id
// nextValuableId - Identifier for new valuable
// nextTagId - Identifier for new tag

ateos.lazify({
  Vault: "./vault",
  Valuable: "./valuable"
}, ateos.asNamespace(exports), require);

const __ = ateos.lazifyp({
  SlicedValuable: "./sliced_valuable"
}, exports, require);

ateos.definep({
  VALUABLE_VAULT: Symbol("vault"),
  VALUABLE_ID: Symbol("id"),
  VALUABLE_META: Symbol("meta"),
  VALUABLE_TAGS: Symbol("tags"),
  VALUABLE_KEYS: Symbol("keys"),
  valuableId: (id) => `v:${id}`,
  tagId: (id) => `t:${id}`,
  vkey: (vid, kid) => `v:${vid}:${kid}`,
  vvalue: (vid, kid) => `v:${vid}:${kid}:`,
  hasTag(tags, tag) {
    const tagName = (ateos.is.string(tag) ? tag : tag.name);
    return tags.findIndex((t) => t.name === tagName) !== -1;
  },
  normalizeTags: (tags) => {
    const result = [];

    for (const tag of tags) {
      if (ateos.is.string(tag)) {
        result.push({
          name: tag
        });
      } else if (ateos.is.plainObject(tag)) {
        result.push(tag);
      } else {
        result.push({});
      }
    }

    return result;
  },
  normalizeTag: (tag) => {
    if (ateos.is.string(tag)) {
      return {
        name: tag
      };
    } else if (ateos.is.plainObject(tag)) {
      return tag;
    }
    return undefined;
  }
}, exports);

export const open = async (options) => {
  const vault = new ateos.vault.Vault(options);
  await vault.open();
  return vault;
};

export const slice = (valuable, prefix, separator) => new (__.SlicedValuable)(valuable, prefix, separator);
