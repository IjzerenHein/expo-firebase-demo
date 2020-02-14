"use strict";

import { UnavailabilityError } from "@unimodules/core";

// List of all modules for tests. Each file path must be statically present for
// the packager to pick them all up.
export function getTestModules() {
  const modules = [
    //require("./Basic")
    require("./FirebaseAnalytics"),
    require("./FirebaseAuth"),
    require("./FirebaseDatabase"),
    require("./FirebaseFirestore"),
    require("./FirebaseFunctions"),
    require("./FirebaseInstallations"),
    require("./FirebaseMessaging"),
    require("./FirebasePerformance"),
    require("./FirebaseRemoteConfig"),
    require("./FirebaseStorage")
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
