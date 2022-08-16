const {
  is
} = ateos;

export default class GetContextDefsTask extends ateos.task.Task {
  main({ netron, peer }) {
    const isOwnPeer = peer === netron.peer;
    const allowedContexts = null;

    // const gateName = peer.options.gateName;
    // if (ateos.isString(gateName)) {
    //     const gate = this.gates.get(gateName);
    //     if (ateos.isArray(gate.contexts) && gate.contexts.length > 0) {
    //         allowedContexts = gate.contexts;
    //     }
    // }

    const defs = {};
    for (const [name, stub] of netron.contexts.entries()) {
      if (ateos.isNull(allowedContexts) || allowedContexts.includes(name)) {
        defs[name] = stub.definition;
      }
    }

    return defs;
  }
}
