
@ateos.task.Task("task2")
export default class Task2 extends ateos.task.AdvancedTask {
  main() {
    return ateos.package.version;
  }
}
