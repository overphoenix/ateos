const {
  task: { Task }
} = ateos;

@Task("pubA")
export default class PubTaskA extends ateos.task.AdvancedTask {
  main() {
    return "pub aaa";
  }
}
