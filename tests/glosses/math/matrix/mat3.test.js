import assertEquality from "./assert_equality";
const { mat3, mat4, vec3 } = ateos.math.matrix;

describe("math", "matrix", "mat3", () => {
    let out;
    let matA;
    let matB;
    let identity;
    let result;

    beforeEach(() => {
        matA = Float32Array.from([1, 0, 0, 0, 1, 0, 1, 2, 1]);

        matB = [1, 0, 0, 0, 1, 0, 3, 4, 1];

        out = Float32Array.from([0, 0, 0, 0, 0, 0, 0, 0, 0]);

        identity = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    });

    describe("normalFromMat4", () => {
        beforeEach(() => {
            matA = Float32Array.from([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
            result = mat3.normalFromMat4(out, matA);
        });

        it("should return out", () => {
            assert.equal(result, out);
        });

        describe("with translation and rotation", () => {
            beforeEach(() => {
                mat4.translate(matA, matA, [2, 4, 6]);
                mat4.rotateX(matA, matA, Math.PI / 2);

                result = mat3.normalFromMat4(out, matA);
            });

            it("should give rotated matrix", () => {
                assertEquality(result, Float32Array.from([1, 0, 0, 0, 0, 1, 0, -1, 0]));
            });

            describe("and scale", () => {
                beforeEach(() => {
                    mat4.scale(matA, matA, [2, 3, 4]);

                    result = mat3.normalFromMat4(out, matA);
                });

                it("should give rotated matrix", () => {
                    assertEquality(result, Float32Array.from([0.5, 0, 0, 0, 0, 0.333333, 0, -0.25, 0]));
                });
            });
        });
    });

    describe("fromQuat", () => {
        let q;

        beforeEach(() => {
            q = [0, -0.7071067811865475, 0, 0.7071067811865475];
            result = mat3.fromQuat(out, q);
        });

        it("should return out", () => {
            assert.equal(result, out);
        });

        it("should rotate a vector the same as the original quat", () => {
            assertEquality(vec3.transformMat3([], [0, 0, -1], out), vec3.transformQuat([], [0, 0, -1], q));
        });

        it("should rotate a vector by PI/2 radians", () => {
            assertEquality(vec3.transformMat3([], [0, 0, -1], out), [1, 0, 0]);
        });
    });

    describe("fromMat4", () => {
        beforeEach(() => {
            result = mat3.fromMat4(out, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);
        });

        it("should return out", () => {
            assert.equal(result, out);
        });

        it("should calculate proper mat3", () => {
            assertEquality(out, [1, 2, 3, 5, 6, 7, 9, 10, 11]);
        });
    });

    describe("scale", () => {
        beforeEach(() => {
            result = mat3.scale(out, matA, [2, 2]);
        });
        it("should return out", () => {
            assert.equal(result, out);
        });
        it("should place proper values in out", () => {
            assertEquality(out, [2, 0, 0, 0, 2, 0, 1, 2, 1]);
        });
    });

    describe("create", () => {
        beforeEach(() => {
            result = mat3.create();
        });
        it("should return a 9 element array initialized to a 3x3 identity matrix", () => {
            assertEquality(result, identity);
        });
    });

    describe("clone", () => {
        beforeEach(() => {
            result = mat3.clone(matA);
        });
        it("should return a 9 element array initialized to the values in matA", () => {
            assertEquality(result, matA);
        });
    });

    describe("copy", () => {
        beforeEach(() => {
            result = mat3.copy(out, matA);
        });
        it("should place values into out", () => {
            assertEquality(out, matA);
        });
        it("should return out", () => {
            assert.equal(result, out);
        });
    });

    describe("identity", () => {
        beforeEach(() => {
            result = mat3.identity(out);
        });
        it("should place values into out", () => {
            assertEquality(result, identity);
        });
        it("should return out", () => {
            assert.equal(result, out);
        });
    });

    describe("transpose", () => {
        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.transpose(out, matA);
            });

            it("should place values into out", () => {
                assertEquality(out, [1, 0, 1, 0, 1, 2, 0, 0, 1]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, 1, 2, 1]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.transpose(matA, matA);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [1, 0, 1, 0, 1, 2, 0, 0, 1]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
        });
    });

    describe("invert", () => {
        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.invert(out, matA);
            });

            it("should place values into out", () => {
                assertEquality(out, [1, 0, 0, 0, 1, 0, -1, -2, 1]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, 1, 2, 1]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.invert(matA, matA);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, -1, -2, 1]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
        });
    });

    describe("adjoint", () => {
        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.adjoint(out, matA);
            });

            it("should place values into out", () => {
                assertEquality(out, [1, 0, 0, 0, 1, 0, -1, -2, 1]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, 1, 2, 1]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.adjoint(matA, matA);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, -1, -2, 1]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
        });
    });

    describe("determinant", () => {
        beforeEach(() => {
            result = mat3.determinant(matA);
        });

        it("should return the determinant", () => {
            assert.equal(result, 1);
        });
    });

    describe("multiply", () => {
        it("should have an alias called 'mul'", () => {
            assert.equal(mat3.mul, mat3.multiply);
        });

        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.multiply(out, matA, matB);
            });

            it("should place values into out", () => {
                assertEquality(out, [1, 0, 0, 0, 1, 0, 4, 6, 1]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, 1, 2, 1]);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [1, 0, 0, 0, 1, 0, 3, 4, 1]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.multiply(matA, matA, matB);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, 4, 6, 1]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [1, 0, 0, 0, 1, 0, 3, 4, 1]);
            });
        });

        describe("when matB is the output matrix", () => {
            beforeEach(() => {
                result = mat3.multiply(matB, matA, matB);
            });

            it("should place values into matB", () => {
                assertEquality(matB, [1, 0, 0, 0, 1, 0, 4, 6, 1]);
            });
            it("should return matB", () => {
                assert.equal(result, matB);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 0, 0, 0, 1, 0, 1, 2, 1]);
            });
        });
    });

    describe("str", () => {
        beforeEach(() => {
            result = mat3.str(matA);
        });

        it("should return a string representation of the matrix", () => {
            expect(result, "mat3(1, 0, 0, 0, 1, 0, 1, 2, 1)");
        });
    });

    describe("frob", () => {
        beforeEach(() => {
            result = mat3.frob(matA);
        });
        it("should return the Frobenius Norm of the matrix", () => {
            expect(result, Math.sqrt(Math.pow(1, 2) + Math.pow(0, 2) + Math.pow(0, 2) + Math.pow(0, 2) + Math.pow(1, 2) + Math.pow(0, 2) + Math.pow(1, 2) + Math.pow(2, 2) + Math.pow(1, 2)));
        });
    });

    describe("add", () => {
        beforeEach(() => {
            matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            matB = [10, 11, 12, 13, 14, 15, 16, 17, 18];
        });
        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.add(out, matA, matB);
            });

            it("should place values into out", () => {
                assertEquality(out, [11, 13, 15, 17, 19, 21, 23, 25, 27]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.add(matA, matA, matB);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [11, 13, 15, 17, 19, 21, 23, 25, 27]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);
            });
        });

        describe("when matB is the output matrix", () => {
            beforeEach(() => {
                result = mat3.add(matB, matA, matB);
            });

            it("should place values into matB", () => {
                assertEquality(matB, [11, 13, 15, 17, 19, 21, 23, 25, 27]);
            });
            it("should return matB", () => {
                assert.equal(result, matB);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });
    });

    describe("subtract", () => {
        beforeEach(() => {
            matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            matB = [10, 11, 12, 13, 14, 15, 16, 17, 18];
        });
        it("should have an alias called 'sub'", () => {
            expect(mat3.sub, mat3.subtract);
        });

        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.subtract(out, matA, matB);
            });

            it("should place values into out", () => {
                assertEquality(out, [-9, -9, -9, -9, -9, -9, -9, -9, -9]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.subtract(matA, matA, matB);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [-9, -9, -9, -9, -9, -9, -9, -9, -9]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);
            });
        });

        describe("when matB is the output matrix", () => {
            beforeEach(() => {
                result = mat3.subtract(matB, matA, matB);
            });

            it("should place values into matB", () => {
                assertEquality(matB, [-9, -9, -9, -9, -9, -9, -9, -9, -9]);
            });
            it("should return matB", () => {
                assert.equal(result, matB);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });
    });

    describe("fromValues", () => {
        beforeEach(() => {
            result = mat3.fromValues(1, 2, 3, 4, 5, 6, 7, 8, 9);
        });
        it("should return a 9 element array initialized to the values passed", () => {
            assertEquality(result, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
    });

    describe("set", () => {
        beforeEach(() => {
            result = mat3.set(out, 1, 2, 3, 4, 5, 6, 7, 8, 9);
        });
        it("should place values into out", () => {
            assertEquality(out, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });
        it("should return out", () => {
            assert.equal(result, out);
        });
    });

    describe("multiplyScalar", () => {
        beforeEach(() => {
            matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        });
        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.multiplyScalar(out, matA, 2);
            });

            it("should place values into out", () => {
                assertEquality(out, [2, 4, 6, 8, 10, 12, 14, 16, 18]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.multiplyScalar(matA, matA, 2);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [2, 4, 6, 8, 10, 12, 14, 16, 18]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
        });
    });

    describe("multiplyScalarAndAdd", () => {
        beforeEach(() => {
            matA = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            matB = [10, 11, 12, 13, 14, 15, 16, 17, 18];
        });
        describe("with a separate output matrix", () => {
            beforeEach(() => {
                result = mat3.multiplyScalarAndAdd(out, matA, matB, 0.5);
            });

            it("should place values into out", () => {
                assertEquality(out, [6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18]);
            });
            it("should return out", () => {
                assert.equal(result, out);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);
            });
        });

        describe("when matA is the output matrix", () => {
            beforeEach(() => {
                result = mat3.multiplyScalarAndAdd(matA, matA, matB, 0.5);
            });

            it("should place values into matA", () => {
                assertEquality(matA, [6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18]);
            });
            it("should return matA", () => {
                assert.equal(result, matA);
            });
            it("should not modify matB", () => {
                assertEquality(matB, [10, 11, 12, 13, 14, 15, 16, 17, 18]);
            });
        });

        describe("when matB is the output matrix", () => {
            beforeEach(() => {
                result = mat3.multiplyScalarAndAdd(matB, matA, matB, 0.5);
            });

            it("should place values into matB", () => {
                assertEquality(matB, [6, 7.5, 9, 10.5, 12, 13.5, 15, 16.5, 18]);
            });
            it("should return matB", () => {
                assert.equal(result, matB);
            });
            it("should not modify matA", () => {
                assertEquality(matA, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
            });
        });
    });

    describe("projection", () => {
        beforeEach(() => {
            result = mat3.projection(out, 100.0, 200.0);
        });

        it("should return out", () => {
            expect(result).to.be.equal(out);
        });

        it("should give projection matrix", () => {
            assertEquality(result, [
                0.02, 0, 0,
                0, -0.01, 0,
                -1, 1, 1
            ]);
        });
    });

    describe("exactEquals", () => {
        let matC, r0, r1;
        beforeEach(() => {
            matA = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            matB = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            matC = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            r0 = mat3.exactEquals(matA, matB);
            r1 = mat3.exactEquals(matA, matC);
        });

        it("should return true for identical matrices", () => {
            assert.equal(r0, true);
        });
        it("should return false for different matrices", () => {
            assert.equal(r1, false);
        });
        it("should not modify matA", () => {
            assertEquality(matA, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it("should not modify matB", () => {
            assertEquality(matB, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
    });

    describe("equals", () => {
        let matC;
        let matD;
        let r0;
        let r1;
        let r2;

        beforeEach(() => {
            matA = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            matB = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            matC = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            matD = [1e-16, 1, 2, 3, 4, 5, 6, 7, 8];
            r0 = mat3.equals(matA, matB);
            r1 = mat3.equals(matA, matC);
            r2 = mat3.equals(matA, matD);
        });
        it("should return true for identical matrices", () => {
            assert.equal(r0, true);
        });
        it("should return false for different matrices", () => {
            assert.equal(r1, false);
        });
        it("should return true for close but not identical matrices", () => {
            assert.equal(r2, true);
        });
        it("should not modify matA", () => {
            assertEquality(matA, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
        it("should not modify matB", () => {
            assertEquality(matB, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
        });
    });
});
