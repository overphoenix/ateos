const {
  task: { Task }
} = ateos;

@Task("task1")
export class Task1 extends ateos.task.AdvancedTask {
  main() {
    return "ok";
  }
}
