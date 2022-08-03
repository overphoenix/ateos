ateos.lazify({
  level: "./level",
  mysql: "mysql2",
  orm: "typeorm",
  postgresql: "pg",
  sqlite3: "sqlite3"
}, ateos.asNamespace(exports), require);
