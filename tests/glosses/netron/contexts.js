const {
    is,
    netron: { meta: { Context, Public } }
} = ateos;

@Context()
export class Simple {
    @Public()
    simple() {
        return 888;
    }
}

@Context()
export class A {
    @Public()
    methodA() {
        return this.propA;
    }

    @Public()
    propA = "aaa";
}

@Context({
    description: "class b extends a"
})
export class B extends A {
    constructor() {
        super();
        this.val = "bbb";
    }
    @Public()
    methodB() {
        return this.val;
    }

    @Public()
    echoB(...args) {
        return args;
    }

    @Public()
    syncErrorB() {
        throw new ateos.error.InvalidArgumentException("Invalid argument");
    }

    @Public()
    asyncErrorB() {
        return new Promise(async (resolve, reject) => {
            await ateos.promise.delay(1);
            reject(new ateos.error.InvalidArgumentException("Invalid argument"));
        });
    }

    @Public()
    asyncB() {
        return new Promise(async (resolve) => {
            await ateos.promise.delay(1);
            resolve("ok");
        });
    }

    @Public()
    propB = 2;

    @Public({
        readonly: true
    })
    rpropB = 777;
}


@Context()
export class C extends B {
    @Public()
    methodC() {
        return "ccc";
    }

    @Public()
    propC = 3;
}

const set1 = new Set();
set1.add("ateos");
set1.add(6);
set1.add(true);

const set2 = new Set();
set2.add(new Date());
set2.add(54.55);
set2.add([1, 2, 3]);
set2.add({ ok: false });

const map1 = new Map();
map1.set("string", "ateos");
map1.set("number", 79879);
map1.set("boolean", false);

const map2 = new Map();
map2.set("string", "_099_");
map2.set("number", 65.33);
map2.set("boolean", true);
map2.set("date", new Date());

export const commonTypes = [
    {
        name: "string",
        value: "ateos",
        otherValue: "peer"
    },
    {
        name: "integer",
        value: 7887,
        otherValue: 8998
    },
    {
        name: "double",
        value: 78.87,
        otherValue: 982.242
    },
    {
        name: "date",
        value: new Date(),
        otherValue: new Date()
    },
    {
        name: "boolean",
        value: true,
        otherValue: false
    },
    {
        name: "null",
        value: null,
        otherValue: undefined
    },
    {
        name: "undefined",
        value: undefined,
        otherValue: null
    },
    // {
    //     name: "regexp",
    //     value: /ateos/
    // },
    {
        name: "array1",
        value: [1, 2, 3],
        otherValue: [33, 22, 11, 44]
    },
    {
        name: "array2",
        value: ["3", "2", "1"],
        otherValue: ["one", "two", "three"]
    },
    {
        name: "array3",
        value: [true, 1, "ateos", new Date()],
        otherValue: [false, "ateos", new Date(), 213.123]
    },
    {
        name: "object1",
        value: {
            a: 1
        },
        otherValue: {
            1: "A"
        }
    },
    {
        name: "object2",
        value: {
            a: "ateos",
            b: {
                c: [1, {
                    // e: /ateos/,
                    d: 98.99
                }, new Date()]
            }
        },
        otherValue: {
            b: "ateos",
            c: {
                a: [1, {
                    pi: 3.14159
                }, new Date(), new Date()]
            }
        }
    },
    {
        name: "long",
        value: ateos.math.Long.ONE,
        otherValue: ateos.math.Long.NEG_ONE
    },
    {
        name: "Set",
        value: set1,
        otherValue: set2
    },
    {
        name: "Map",
        value: map1,
        otherValue: map2
    }
];

@Context()
export class CommonTypes { }

for (const ct of commonTypes) {
    CommonTypes.prototype[`_${ct.name}`] = ct.value;
    Reflect.defineMetadata(ateos.netron.meta.PUBLIC_ANNOTATION, {}, CommonTypes.prototype, `_${ct.name}`);

    CommonTypes.prototype[ct.name] = function () {
        return this[`_${ct.name}`];
    };
    Reflect.defineMetadata(ateos.netron.meta.PUBLIC_ANNOTATION, {}, CommonTypes.prototype, ct.name);

    CommonTypes.prototype[`set_${ct.name}`] = function (val) {
        this[`_${ct.name}`] = val;
        return val;
    };
    Reflect.defineMetadata(ateos.netron.meta.PUBLIC_ANNOTATION, {}, CommonTypes.prototype, `set_${ct.name}`);
}

export const DocumentTypes = {
    number: 1,
    string: 2,
    boolean: 3,
    object: 4,
    array: 5,
    map: 6,
    set: 7,
    date: 8
};

@Context({
    description: "Object document"
})
export class Document {
    @Public({
        readonly: true
    })
    data = undefined;

    @Public({
        readonly: true
    })
    type = undefined;

    constructor(data, type) {
        this.data = data;
        this.type = type;
    }

    @Public({
        description: "Returns string representation of document",
        type: String,
        args: [Object]
    })
    inspect(options) {
        return ateos.std.util.inspect(this.data, options);
    }
}

@Context({
    description: "Simple object storage"
})
export class ObjectStorage {
    @Public({
        decsription: "Name of the storage"
    })
    name = undefined;

    _totalSize = undefined;

    constructor(name, size) {
        this.name = name;
        this._totalSize = size;
    }

    @Public({
        description: "Returns total size of storage",
        type: Number
    })
    getCapacity() {
        return this._totalSize;
    }

    @Public({
        description: "Sets new size of storage",
        type: Number,
        args: [Number]
    })
    setCapacity(size) {
        this._totalSize = size;
    }

    @Public({
        description: "Returns supported document types",
        type: Object
    })
    supportedDocTypes() {
        return DocumentTypes;
    }

    @Public({
        type: Number
    })
    getSize() {
        return this._docs.size;
    }

    @Public({
        description: "Adds document. Returns 'true' if document added to storage, otherwise 'false'",
        type: Boolean,
        args: [String, Document]
    })
    addDocument(name, doc) {
        if (this._docs.size >= this._totalSize || this._docs.has(name)) {
            return false;
        }
        this._docs.set(name, doc);

        return true;
    }

    @Public({
        description: "Returns document by name",
        type: Document,
        args: [String]
    })
    getDocument(name) {
        return this._docs.get(name) || null;
    }

    @Public()
    createDocument(data, type) {
        return new Document(data, type);
    }

    _docs = new Map();
}

export const BodyStatuses = {
    Dead: 0,
    Alive: 1
};

@Context()
export class Soul {
    constructor(name) {
        this.name = name;
    }

    @Public()
    eatVitality(percentage) {
        this.vitality -= percentage;
        if (this.vitality <= 0) {
            this.bodyStatus = BodyStatuses.Dead;
        }
    }

    @Public()
    doEvil(otherSoul, percentage) {
        return otherSoul.eatVitality(percentage);
    }

    @Public()
    vitality = 100;

    @Public()
    bodyStatus = BodyStatuses.Alive;
}

@Context()
export class Devil {
    @Public()
    sellSoul(manName, iSoul) {
        if (this.souls.has(manName)) {
            return false;
        }
        this.souls.set(manName, iSoul);
        return true;
    }

    @Public()
    possess(manName) {
        const iSoul = this.souls.get(manName);
        if (!is.undefined(iSoul)) {
            this.possessedSoul = iSoul;
        }
    }

    @Public()
    takeVitality(percentage) {
        if (!is.undefined(this.possessedSoul)) {
            return this.possessedSoul.eatVitality(percentage);
        }
    }

    @Public()
    doEvil(manName, percentage) {
        if (!is.undefined(this.possessedSoul)) {
            return this.possessedSoul.doEvil(this.souls.get(manName), percentage);
        }
    }

    @Public({
        type: Map
    })
    souls = new Map();

    @Public()
    possessedSoul = null;
}

@Context()
export class Weak {
    @Public()
    doSomething() {
        return 888;
    }
}

@Context()
export class Strong {
    constructor(netron) {
        this.netron = netron;
        this.weak = new Weak();
    }

    @Public()
    getWeak() {
        return this.weak;
    }

    @Public()
    releaseWeak() {
        this.netron.releaseContext(this.weak);
        this.weak = null;
    }
}

let depthCounter;

@Context()
export class CounterKeeper {
    constructor(keeper = null) {
        this.keeper = keeper;
    }

    @Public()
    async getCounter() {
        if (this.keeper) {
            depthCounter++;
            return (await this.keeper.getCounter()) + 1;
        }
        return 1;

    }

    @Public()
    async getNextKeeper(keeper) {
        return new CounterKeeper(keeper);
    }

    static getValue() {
        return depthCounter;
    }

    static setValue(val) {
        depthCounter = val;
    }
}

@Context()
export class NumField {
    constructor(val) {
        this._val = val;
    }

    @Public()
    getValue() {
        return this._val;
    }
}

@Context()
export class NumSet {
    @Public()
    getFields(start, end) {
        const defs = new ateos.netron.Definitions();
        for (let i = start; i < end; i++) {
            defs.push(new NumField(i));
        }
        return defs;
    }

    @Public()
    setFields(fields) {
        this._fields = fields;
    }
}

@Context()
export class StdErrs {
    @Public()
    throwError() {
        throw new Error("description");
    }

    @Public()
    throwEvalError() {
        throw new EvalError("description");
    }

    @Public()
    throwRangeError() {
        throw new RangeError("description");
    }

    @Public()
    throwReferenceError() {
        throw new ReferenceError("description");
    }

    @Public()
    throwSyntaxError() {
        throw new SyntaxError("description");
    }

    @Public()
    throwTypeError() {
        throw new TypeError("description");
    }

    @Public()
    throwURIError() {
        throw new URIError("description");
    }
}


@Context()
export class AteosErrs { }

export const ateosErrors = ateos.error.ateosExceptions;
export const netronErrors = [];
for (const AteosError of ateosErrors) {
    if (ateos.error.exceptionIdMap[AteosError] < 1000) {
        const fnName = `throw${AteosError.name}`;
        if (AteosError.name.startsWith("Netron")) {
            netronErrors.push(AteosError.name);
        } else {
            if (AteosError.name === "AggregateException") {
                AteosErrs.prototype[fnName] = function () {
                    throw new AteosError([new ateos.error.Exception("a"), new ateos.error.RuntimeException("b")]);
                };
            } else {
                AteosErrs.prototype[fnName] = function () {
                    throw new AteosError("description");
                };
            }
            Reflect.defineMetadata(ateos.netron.meta.PUBLIC_ANNOTATION, {}, AteosErrs.prototype, fnName);
        }
    }
}


class MyError extends Error { }

@Context()
export class NonStdErr {
    @Public()
    throw() {
        throw new MyError("Hello World!");
    }
}

// process.binding("natives").native_module = "";
// const nm = nodeRequire("native_module");
// export const nodeErrors = ateos.util.omit(nm.require("internal/errors"), ["message", "E"]);

// @Context()
// export class NodeErrs {
// }

// for (const [name, Exc] of Object.entries(nodeErrors)) {
//     const fnName = `throw${name}`;
//     NodeErrs.prototype[fnName] = function () {
//         if (Exc.name === "AssertionError") {
//             throw new Exc({
//                 message: "Hello World!"
//             });
//         }
//         throw new Exc("Hello World!");
//     };
//     Reflect.defineMetadata(ateos.netron.meta.PUBLIC_ANNOTATION, {}, NodeErrs.prototype, fnName);

// }
