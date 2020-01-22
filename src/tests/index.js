"use strict";

import { UnavailabilityError } from "@unimodules/core";

// List of all modules for tests. Each file path must be statically present for
// the packager to pick them all up.
export function getTestModules() {
  const modules = [
    //require("./Basic")
    require("./FirebaseStorage"),
    require("./FirebaseFunctions"),
    require("./FirebaseFirestore"),
    require("./FirebaseRemoteConfig"),
    require("./FirebasePerformance"),
    require("./FirebaseMessaging"),
    require("./FirebaseAuth")
    //require("./FirebaseAnalytics")
  ];

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
