const {
  task: { Task }
} = ateos;

@Task("nestedA")
export class NestedTaskA extends ateos.task.AdvancedTask {
  main() {
    return "aaa";
  }
}

@Task("nestedB")
export class NestedTaskB extends ateos.task.AdvancedTask {
  main() {
    return "bbb";
  }
}

@Task("dummy")
export class DummyTask extends ateos.task.AdvancedTask {
  main() {
    return "nested dummy";
  }
}

