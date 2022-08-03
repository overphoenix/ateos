export const urlRegex = /^(https?|webpack(-[^:]+)?):\/\//;

/*
 * So reusing the same ref for a regex (with global (g)) is from a poor decision in js.
 * See http://stackoverflow.com/questions/10229144/bug-with-regexp-in-javascript-when-do-global-search
 * So we either need to use a new instance of a regex everywhere.
 */
export const sourceMapUrlRegEx = () => /\/\/\# sourceMappingURL\=.*/g;

export const getCommentFormatter = (file) => {
  const extension = file.relative.split(".").pop();
  const fileContents = file.contents.toString();
  const newline = ateos.text.detectNewline(fileContents || "") || "\n";

  if (file.sourceMap.preExistingComment) {
    return (url) => `//# sourceMappingURL=${url}${newline}`;
  }

  if (extension === "js") {
    return (url) => `${newline}//# sourceMappingURL=${url}${newline}`;
  }

  if (extension === "css") {
    return (url) => `${newline}/*# sourceMappingURL=${url} */${newline}`;
  }

  return () => "";
};

export const getInlinePreExisting = (fileContent) => {
  if (sourceMapUrlRegEx().test(fileContent)) {
    return fileContent.match(sourceMapUrlRegEx())[0];
  }
};
