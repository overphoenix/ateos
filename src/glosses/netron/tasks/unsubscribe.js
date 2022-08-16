export default class UnsubscribeTask extends ateos.task.Task {
  main({ netron, peer, args }) {
    const [eventName] = args;
    const fn = peer._remoteSubscriptions.get(eventName);
    if (!ateos.ateos.isUndefined(fn)) {
      netron.removeListener(eventName, fn);
      peer._remoteSubscriptions.delete(eventName);
    }
  }
}
