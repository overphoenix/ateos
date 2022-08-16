const {
  task: { task }
} = ateos;

@task("ownA")
export class OwnTaskA extends task.AdvancedTask {
  main() {
    return "own aaa";
  }
}

@task("ownB")
export class OwnTaskB extends task.AdvancedTask {
  main() {
    return "own bbb";
  }
}
