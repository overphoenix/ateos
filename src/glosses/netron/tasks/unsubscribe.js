export default class UnsubscribeTask extends ateos.task.Task {
  main({ netron, peer, args }) {
    const [eventName] = args;
    const fn = peer._remoteSubscriptions.get(eventName);
    if (!ateos.is.undefined(fn)) {
      netron.removeListener(eventName, fn);
      peer._remoteSubscriptions.delete(eventName);
    }
  }
}
