const {
  fast,
  std,
  realm: { BaseTask, TransformTask }
} = ateos;

class WatchTask extends TransformTask {
  streamOptions() {
    return {
      ...super.streamOptions(),
      awaitWriteFinish: {
        stabilityThreshold: 500,
        pollInterval: 100
      }
    };
  }

  initialize(params) {
    // const watcherOptions = {};

    // uses a lot of processor time...
    // if (!is.glob(params.src)) {
    //     watcherOptions.usePolling = true;
    //     watcherOptions.interval = 250;
    // }
    this.stream = fast.watch(params.src, {
      ...this.streamOptions(),
      // ...watcherOptions
    });

    return super.initialize(params);
  }

  main(params) {
    if (!ateos.isNull(this.stream)) {
      this.stream.dest(params.dst);
    }
  }

  transform(stream, params) {
    const targetTask = this.manager.getTaskInstance(params.task);
    if (targetTask instanceof ateos.realm.TransformTask) {
      return targetTask.transform(stream, params);
    }
    const manager = this.manager;
    return stream.through(async function (file) {
      file.contents = await manager.runAndWait(params.task, {
        src: params.src,
        dst: params.dst,
        save: false
      });
      this.push(file);
    });
  }

  notify(stream, params) {
    if (!ateos.isNull(stream)) {
      stream.notify({
        onLast: false,
        title: `${this.manager.package.name}.${params.id}`,
        filter: (file) => file.extname !== ".map",
        message: (file) => std.path.relative(process.cwd(), file.path),
        debounce: {
          timeout: 500,
          leading: true,
          trailing: true
        }
      });
    }
  }

  cancel(defer) {
    !ateos.isNull(this.stream) && this.stream.destroy();
    defer.resolve();
  }
}

@ateos.task.Task("watch")
export default class extends BaseTask {
  async main({ realm, path } = {}) {
    const devConfig = this.manager.devConfig;
    const nonWatchbaleTasks = ateos.util.arrify(devConfig.get("nonWatchableTasks"));
    const observer = await ateos.task.runParallel(this.manager, devConfig.getUnits(path)
      .filter((unit) => !nonWatchbaleTasks.includes(unit.task) && !ateos.isFunction(unit.task))
      .map((unit) => ({
        task: WatchTask,
        args: {
          ...unit,
          realm

        }
      })));

    observer.taskInfo.cancelable = true; // Big hack!

    return observer.result;
  }
}
