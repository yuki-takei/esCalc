/// <reference path="../.tmp/typings/bundle.d.ts" />

import * as assert from 'power-assert'
import {mytest} from '../src/mytest'

describe("Some Class", () => {
    context("someMethod()", () => {

      it("should return object", () => {
        const a = mytest.SomeClass.someMethod()
        const b = {c: 0, d: "abc"}
        assert.deepEqual(a, b)
      });
    });
});
