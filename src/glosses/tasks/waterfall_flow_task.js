/**
 * This flow runs the tasks in series, but result of each task passing to the next task in the array.
 * If any task in the series throw, no more tasks are run.
 * If all tasks has finished, result of the last task will be returned.
 */
export default class WaterfallFlow extends ateos.task.FlowTask {
  async main(...args) {
    let result = args;

    for (const t of this.tasks) {
            const observer = await this._runTask(t.task, ateos.util.arrify(result)); // eslint-disable-line
            result = await observer.result; // eslint-disable-line
    }

    return result;
  }
}
