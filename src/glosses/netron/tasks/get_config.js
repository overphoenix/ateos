export default class GetConfigTask extends ateos.task.IsomorphicTask {
  main({ netron }) {
    return netron.options;
  }
}
