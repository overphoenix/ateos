ateos.lazify({
  fastify: "fastify",
  plugin: () => ateos.lazify({
    cookie: "fastify-cookie",
    static: "fastify-static",
    jwt: "fastify-jwt",
    session: "@fastify/session"
  })
}, exports, require);
