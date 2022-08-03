ateos.lazify({
  checkPort: "./check_port",
  getPort: ["./get_port", "getPort"],
  portNumbers: ["./get_port", "portNumbers"],
  ip: "./ip",
  ssh: "./ssh"
}, ateos.asNamespace(exports), require);
