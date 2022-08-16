const {
  task: { Task }
} = ateos;

@Task("pubB")
export default class PubTaskB extends ateos.task.AdvancedTask {
  main() {
    return "pub bbb";
  }
}
