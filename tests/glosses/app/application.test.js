const {
  std,
  app: { Application }
} = ateos;

const fixture = std.path.join.bind(std.path, __dirname, "fixtures");

describe("Application", () => {
  it("by default should use script name as application name", async () => {
    const result = await forkProcess(fixture("test_name.js"));
    assert.equal(result.stdout, "test_name");
  });

  it("should exit with correct code", async () => {
    const err = await assert.throws(async () => forkProcess(fixture("exit_code.js")));
    assert.equal(err.code, 7);
  });

  it("correct sequential method call at startup", async () => {
    const result = await forkProcess(fixture("correct_bootstrap.js"));
    assert.equal(result.stdout, "configured\ninitialized\nrun\nuninitialized");
  });

  it("parent subsystem should be 'undefined' for main application", () => {
    class TestApp extends Application {
    }
    const testApp = new TestApp();
    assert.isUndefined(testApp.parent);
  });

  it("compact application with properties", async () => {
    const result = await forkProcess(fixture("compact.js"));
    assert.equal(result.stdout, "non configured\nconfigured\ninitialized\nrun\nateos compact application\nuninitialized");
  });

  it("should not run invalid application", async () => {
    const err = await assert.throws(async () => forkProcess(fixture("invalid.js")));
    assert.equal(err.code, 1);
    assert.equal(ateos.text.stripAnsi(err.stderr), "Invalid application class\n");
  });

  it("no public properties instead of application's reserved", async () => {
    const result = await forkProcess(fixture("no_public_props_and_getters.js"));
    assert.equal(result.stdout, "true");
  });

  it("correct application error handling during uninitialization", async () => {
    const err = await assert.throws(async () => forkProcess(fixture("exception_on_uninitialization")));
    assert.equal(err.code, 1);
    assert.match(err.stderr, /Something bad happend during uninitialization/);
  });

  describe("user-defined application options", () => {
    for (const t of ["configure", "initialize"]) {
      it(`user-defined options in ${t}-stage (useArgs=true)`, async () => {
        const result = await forkProcess(fixture("app_options_configure.js"), [], {
          env: {
            WITH_ARGS: "yes"
          }
        });
        assert.equal(result.stdout, "true");
      });

      it(`user-defined options in ${t}-stage (useArgs=false)`, async () => {
        const result = await forkProcess(fixture("app_options_initialize.js"));
        assert.equal(result.stdout, "true");
      });
    }
  });

  describe("Subsystems", () => {
    describe("add", () => {
      it("valid subsystem", async () => {
        const result = await forkProcess(fixture("add_valid_subsystem.js"));
        assert.equal(result.stdout, "configure\ninitialize\nuninitialize");
      });

      it("valid subsystem from path", async () => {
        const result = await forkProcess(fixture("add_valid_subsystem_from_path.js"));
        assert.equal(result.stdout, "configure\ninitialize\nuninitialize");
      });

      it("valid subsystems from path", async () => {
        const result = await forkProcess(fixture("add_valid_subsystems_from_path.js"));
        assert.equal(result.stdout, "sub0 configure\nsub1 configure\nsub2 configure\nsub3 configure\nsub0 init\nsub1 init\nsub2 init\nsub3 init\nsub3 uninit\nsub2 uninit\nsub1 uninit\nsub0 uninit");
      });

      it("not valid subsystem", async () => {
        const result = await forkProcess(fixture("add_not_valid_subsystem.js"));
        assert.equal(result.stdout, "incorrect subsystem");
      });

      it("not valid subsystem from", async () => {
        const result = await forkProcess(fixture("add_not_valid_subsystem_from_path.js"));
        assert.equal(result.stdout, "incorrect subsystem");
      });

      describe("subsystem name and name collisions", () => {
        it("it's impossible to set name", () => {
          class SubSys extends ateos.app.Subsystem {
            constructor() {
              super();
              this.name = "ownname";
            }
          }

          const err = assert.throws(() => new SubSys());
          assert.instanceOf(err, ateos.error.ImmutableException);
        });

        it("should throw if a subsystem with the same name already exists", async () => {
          await assert.throws(async () => {
            await forkProcess(fixture("add_existing_name.js"));
          }, "Subsystem with name 'hello' already exists");
        });

        it("should throw if a subsystem with the same name already exists when the subsytem name is set implicitly", async () => {
          await assert.throws(async () => {
            await forkProcess(fixture("add_existing_implicit_name.js"));
          }, "Subsystem with name 'Hello' already exists");
        });
      });

      it("add subsystem and bind it", async () => {
        const result = await forkProcess(fixture("add_and_bind.js"));
        assert.equal(result.stdout, "true\nsome_data\nfalse");
      });

      it("add subsystem and bind it with unallowed name", async () => {
        await assert.throws(async () => forkProcess(fixture("add_and_bind_notallowed_name.js")), "Property with name 'removeListener' is already exist");
      });
    });

    it("initialization and deinitialization of subsystems in accordance with the order of their addition", async () => {
      const result = await forkProcess(fixture("subsystems_order.js"));
      assert.equal(result.stdout, "app_configure\nconfigure1\nconfigure2\napp_initialize\ninitialize1\ninitialize2\napp_uninitialize\nuninitialize2\nuninitialize1");
    });

    for (let i = 1; i <= 2; i++) {
      // eslint-disable-next-line
      it(`get subsystem by name (${i})`, async () => {
        const result = await forkProcess(fixture(`get_subsystem${i}.js`));
        assert.equal(result.stdout, "test subsystem");
      });
    }

    it("get unknown subsystem", async () => {
      const err = await assert.throws(async () => forkProcess(fixture("get_unknown_subsystem.js")));
      assert.equal(err.code, 1);
      assert.match(err.stderr, /Unknown subsystem/);
    });

    it("subsystem custom initialization", async () => {
      const result = await forkProcess(fixture("subsystem_custom_initialize.js"));
      assert.equal(result.stdout, "c\nc1\nc2\ni2\ni\ni1\nu\nu2\nu1");
    });

    it("subsystem custom deinitialization", async () => {
      const result = await forkProcess(fixture("subsystem_custom_uninitialize.js"));
      assert.equal(result.stdout, "c\nc1\nc2\ni\ni1\ni2\nu1\nu\nu2");
    });

    it("simple reinitialization", async () => {
      const result = await forkProcess(fixture("simple_reinitialization.js"));
      assert.equal(result.stdout, "non configured\nconfigured\ninitialized\nmain\nuninitialized\ninitialized\nuninitialized");
    });

    it("complex reinitialization", async () => {
      const result = await forkProcess(fixture("complex_reinitialization.js"));
      assert.equal(result.stdout, "nc\nc\nc1\nc11\nc111\nc112\nc2\ni\ni1\ni11\ni111\ni112\ni2\nm\nr\nu\nu2\nu1\nu11\nu112\nu111\ni\ni1\ni11\ni111\ni112\ni2\nu\nu2\nu1\nu11\nu112\nu111");
    });

    it("complex custom reinitialization", async () => {
      const result = await forkProcess(fixture("complex_custom_reinitialization.js"));
      assert.equal(result.stdout, "nc\nc\nc1\nc11\nc111\nc112\nc2\ni2\ni\ni1\ni11\ni111\ni112\nm\nr\nu\nu2\nu1\nu111\nu11\nu112\ni2\ni\ni1\ni11\ni111\ni112\nu\nu2\nu1\nu111\nu11\nu112");
    });

    it("root subsystem", async () => {
      const result = await forkProcess(fixture("root_subsystem.js"));
      assert.equal(result.stdout, "true\ntrue\ntrue\ntrue");
    });


    describe("deleteSubsystem", () => {
      it("delete an uninitialized subsystem", async () => {
        const result = await forkProcess(fixture("delete_uninitialized_subsystem.js"));
        assert.equal(result.stdout, "configure\ninitialize\nmain\nuninitialize\nfalse");
      });

      it("should throw on delete of initialized subsystem", async () => {
        const result = await forkProcess(fixture("delete_initialized_subsystem.js"));
        assert.equal(result.stdout, "configure\ninitialize\nmain\nThe subsystem is used (state: initialized) and can not be deleted\ntrue\nuninitialize");
      });
    });

    describe("unloadSubsystem", () => {
      it("should unload and delete subsystem", async () => {
        const result = await forkProcess(fixture("unload_initialized_subsystem.js"));
        assert.equal(result.stdout, [
          "hello configure",
          "hello init",
          "main",
          "hello uninit",
          "has false"
        ].join("\n"));
      });

      it("should wait for uninitialized if the subsystem is unitializing", async () => {
        const result = await forkProcess(fixture("unload_slow_uninitialize.js"));
        assert.equal(result.stdout, [
          "hello configure",
          "hello init",
          "main",
          "hello uninit",
          "has false"
        ].join("\n"));
      });

      it("should wait for initialized and then uninit and delete the subsystem if it is initializing", async () => {
        const result = await forkProcess(fixture("unload_slow_initialize.js"));
        assert.equal(result.stdout, [
          "main",
          "hello configure",
          "hello init",
          "hello uninit",
          "has false"
        ].join("\n"));
      });

      it("should wait for initialized and then uninit and delete the subsystem if it is configuring", async () => {
        const result = await forkProcess(fixture("unload_slow_configure.js"));
        assert.equal(result.stdout, [
          "main",
          "hello configure",
          "hello init",
          "hello uninit",
          "has false"
        ].join("\n"));
      });

      it("should throw if the subsystem is unknown", async () => {
        await assert.throws(async () => {
          await forkProcess(fixture("unload_unknown_subsystem.js"));
        }, /Unknown subsystem: hello/);
      });

      it("should clear the require cache and then load the new code", async () => {
        const result = await forkProcess(fixture("unload_and_load.js"));
        assert.equal(result.stdout, [
          "hello1 configure",
          "hello1 init",
          "main",
          "hello1 uninit",
          "has false",
          "cached false",
          "hello2 configure",
          "hello2 init",
          "hello2 uninit",
          "hello3 configure",
          "hello3 init",
          "hello3 uninit"
        ].join("\n"));
      });
    });

    describe("loadSubsystem", () => {
      it("should add, configure and initialize a new subsystem using an absolute path", async () => {
        const result = await forkProcess(fixture("load_external_subsystem.js"), [
          fixture("subsystems", "sub1.js")
        ]);
        assert.equal(result.stdout, [
          "main",
          "sub1 configure",
          "sub1 init",
          "sub1 uninit"
        ].join("\n"));
      });

      it("should add and initialize a new subsystem using a Subsystem instance", async () => {
        const result = await forkProcess(fixture("load_local_subsystem.js"));
        assert.strictEqual(result.stdout, [
          "main",
          "hello configure",
          "hello init",
          "hello uninit"
        ].join("\n"));
      });

      it.todo("should not transpile by default", async () => {
        const err = await assert.throws(async () => {
          await forkProcess(fixture("load_external_subsystem.js"), [
            fixture("subsystems", "sub3.js")
          ]);
        });
        assert.match(err.stderr, /Unexpected token/);
      });

      it("should transpile if transpile = true", async () => {
        const result = await forkProcess(fixture("load_external_subsystem.js"), [
          fixture("subsystems", "sub3.js"),
          "--transpile"
        ]);
        assert.equal(result.stdout, [
          "main",
          "sub3 configure",
          "sub3 init",
          "sub3 uninit"
        ].join("\n"));
      });

      it("should set name to the subsystem class name by default", async () => {
        const result = await forkProcess(fixture("load_external_subsystem.js"), [
          fixture("subsystems", "sub1.js"),
          "--print-meta"
        ]);
        assert.equal(result.stdout, [
          "main",
          "sub1 configure",
          "sub1 init",
          "name Sub1",
          "description ",
          "sub1 uninit"
        ].join("\n"));
      });

      it("should set a custom name if defined", async () => {
        const result = await forkProcess(fixture("load_external_subsystem.js"), [
          fixture("subsystems", "sub1.js"),
          "--name", "hellosubsystem",
          "--print-meta"
        ]);
        assert.equal(result.stdout, [
          "main",
          "sub1 configure",
          "sub1 init",
          "name hellosubsystem",
          "description ",
          "sub1 uninit"
        ].join("\n"));
      });

      it("should set a custom description if defined", async () => {
        const result = await forkProcess(fixture("load_external_subsystem.js"), [
          fixture("subsystems", "sub1.js"),
          "--description", "Description",
          "--print-meta"
        ]);
        assert.equal(result.stdout, [
          "main",
          "sub1 configure",
          "sub1 init",
          "name Sub1",
          "description Description",
          "sub1 uninit"
        ].join("\n"));
      });

      it("should throw if not an absolute path is provided", async () => {
        await assert.throws(async () => {
          await forkProcess(fixture("load_not_abs_argument.js"));
        }, /must be absolute/);
      });

      it("should throw if neither a subsystem nor an absolute path is provided", async () => {
        await assert.throws(async () => {
          await forkProcess(fixture("load_invalid_argument.js"));
        }, "'subsystem' should be path or instance of ateos.app.Subsystem");
      });
    });

    describe("owning", () => {
      class Sys extends ateos.app.Subsystem {
      }

      class SubSys extends ateos.app.Subsystem {
      }

      it("by default subsystem should not be owned", () => {
        const sys = new Sys();
        assert.isFalse(sys.owned);
      });

      it("subsystem should be owned after addSubsystem() and should be freed after deleteSubsystem() ", () => {
        const sys = new Sys();

        const subSys = new SubSys();
        assert.isFalse(sys.owned);

        sys.addSubsystem({
          name: "s",
          subsystem: subSys
        });

        assert.isFalse(sys.owned);
        assert.isTrue(subSys.owned);

        sys.deleteSubsystem("s");

        assert.isFalse(sys.owned);
        assert.isFalse(subSys.owned);
      });

      it("subsystem can be owned once", () => {
        const sys = new Sys();

        const subSys = new SubSys();

        sys.addSubsystem({
          name: "s",
          subsystem: subSys
        });

        const err = assert.throws(() => sys.addSubsystem({
          name: "s1",
          subsystem: subSys
        }));
        assert.instanceOf(err, ateos.error.NotAllowedException);
      });
    });
  });

  describe("args processing", () => {
    let prevRoot = null;

    before(() => {
      // define env var to require correct ateos inside fixture apps
      prevRoot = process.env.ATEOS_ROOT_PATH; // ?
      process.env.ATEOS_ROOT_PATH = ateos.HOME;
    });

    after(() => {
      process.env.ATEOS_ROOT_PATH = prevRoot;
    });

    it("no public properties instead of application's reserved", async () => {
      const result = await forkProcess(fixture("no_public_props_and_getters_with_args.js"));
      assert.equal(result.stdout, "true");
    });

    describe("before run event", () => {
      it("main command", async () => {
        const result = await forkProcess(fixture("before_run_event.js"));
        assert.equal(result.stdout, "before run before_run_event\nmain");
      });

      it("regular command", async () => {
        const result = await forkProcess(fixture("before_run_event.js"), ["regular"]);
        assert.equal(result.stdout, "before run regular,r\nregular");
      });

      it("failed command", async () => {
        const err = await assert.throws(async () => forkProcess(fixture("before_run_event.js"), ["failed"]));
        assert.match(err.stderr, /something bad happened/);
      });
    });
  });

  describe("decorators", () => {
    const {
      app: { AppSubsystem, getSubsystemMeta }
    } = ateos;

    it("decorate application class", () => {
      const meta = {
        name: "app",
        data: {
          a: 1,
          b: true
        }
      };
      @AppSubsystem(meta)
      class TestApp extends Application {

      }
      assert.deepEqual(getSubsystemMeta(TestApp), getSubsystemMeta(new TestApp().constructor));
      assert.deepEqual(getSubsystemMeta(TestApp), meta);
    });
  });
});
