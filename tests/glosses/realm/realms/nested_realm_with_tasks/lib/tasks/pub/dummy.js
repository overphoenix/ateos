const {
  task: { Task }
} = ateos;

@Task("dummy")
export default class DummyTask extends ateos.task.AdvancedTask {
  main() {
    return "root dummy";
  }
}
