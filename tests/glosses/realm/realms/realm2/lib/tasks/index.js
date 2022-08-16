const {
  task: { Task }
} = ateos;

@Task("task1")
export class Task1 extends ateos.task.AdvancedTask {
  main() {
    return "ok";
  }
}

@Task("task2")
export class Task2 extends ateos.task.AdvancedTask {
  main() {
    return ateos.package.version;
  }
}
