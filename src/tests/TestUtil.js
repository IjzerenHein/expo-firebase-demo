"use strict";

import { UnavailabilityError } from "@unimodules/core";

// List of all modules for tests. Each file path must be statically present for
// the packager to pick them all up.
export function getTestModules() {
  const modules = [
    // Sanity
    require("./tests/Basic")
  ];

  //modules.push(require("./tests/FirebaseAnalytics"));

  /*if (global.DETOX) {
    modules.push(
      require('./tests/Contacts'),
    );
    return modules;
  }*/

  return modules.filter(Boolean);
}

export async function expectMethodToBeUnavailableAsync(expect, method) {
  const error = await expectMethodToThrowAsync(method);
  expect(error instanceof UnavailabilityError).toBeTruthy();
}

export async function expectMethodToThrowAsync(method) {
  try {
    await method();
  } catch (error) {
    return error;
  }
}
