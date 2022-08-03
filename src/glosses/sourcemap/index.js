import { ateos } from "../../index";

ateos.lazify({
  SourceMapGenerator: ["source-map", "SourceMapGenerator"],
  SourceMapConsumer: ["source-map", "SourceMapConsumer"],
  SourceNode: ["source-map", "SourceNode"],
  generator: "inline-source-map",
  codec: "sourcemap-codec",
  convert: "convert-source-map",
  support: "source-map-support"
}, ateos.asNamespace(exports), require);
