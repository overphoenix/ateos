const {
  is,
  fast,
  task: { AdvancedTask }
} = ateos;

export default class TransformTask extends AdvancedTask {
  constructor() {
    super();
    this.stream = null;
  }

  /**
     * Override this method to define options for fast stream.
     */
  streamOptions() {
    return {
      cwd: this.manager.cwd
    };
  }

  initialize(params) {
    if (ateos.isNull(this.stream)) {
      this.stream = fast.src(params.src, this.streamOptions());
    }

    this.stream = this.transform(this.stream, params);
        
    this.notify(this.stream, params);
    this.notifyError(this.stream, params);
  }

  main(params) {
    if (is.fastLocalStream(this.stream)) {
      return this.stream.dest(params.dst);
    }
  }

  transform(stream) {
    return stream;
  }

  notify(stream, params) {
    // if (is.fastLocalStream(stream)) {
    //     stream.notify({
    //         gui: false,
    //         onLast: true,
    //         title: params.task,
    //         filter: null,
    //         message: `${this.manager.package.name}.${params.id}`
    //     });
    // }
  }

  notifyError(stream, params) {
    if (is.fastLocalStream(stream)) {
      const notify = fast.extension.notify.onError({
        title: `${this.manager.package.name}.${params.id}`,
        message: (error) => error.message
      });
      stream.on("error", (err) => {
        try {
          notify(err);
        } catch (notifyErr) {
          console.warn(`Could not notify about an error due to: ${notifyErr.message}`);
          console.error(err.stack || err.message);
        }
      });
    }
  }
}
