//import "expo-firebase-polyfill";

/*const MAX_TIMEOUT = 60000;
const timers = {};
const oldSetTimeout = global.setTimeout;
const oldClearTimeout = global.clearTimeout;
global.setTimeout = function(callback, timeout) {
  let timerId;
  timerId = oldSetTimeout(
    () => {
      const timeout = timers[`${timerId}`];
      if (timeout !== undefined) {
        delete timers[`${timerId}`];
      } else {
        console.log("UNKNOWN timerId in to setTimeout callback: ", timerId);
      }
      callback();
    },
    timeout > MAX_TIMEOUT ? 20000 : timeout
  );
  timers[`${timerId}`] = timeout;
  if (timeout > MAX_TIMEOUT) {
    console.log(
      `SET LONG TIMEOUT(${timerId}): ${timeout}, pending: ${
        Object.keys(timers).length
      }`
    );
  } else {
    console.log(
      `normal timeout(${timerId}): ${timeout}, pending: ${
        Object.keys(timers).length
      }`
    );
  }
  return timerId;
};
global.clearTimeout = function(timerId) {
  if (timerId !== undefined) {
    const timeout = timers[`${timerId}`];
    if (timeout !== undefined) {
      delete timers[`${timerId}`];
      if (timeout > MAX_TIMEOUT) {
        console.log(
          `CLEAR LONG TIMEOUT(${timerId}): ${timeout}, pending: ${
            Object.keys(timers).length
          }`
        );
      } else {
        console.log(
          `clear normal timeout(${timerId}): ${timeout}, pending: ${
            Object.keys(timers).length
          }`
        );
      }
    } else {
      console.log("UNKNOWN timerId provided to clearTimeout: ", timerId);
    }
  } else {
    //console.log("Invalid timerId provided to clearTimeout: ", timerId);
  }
  return oldClearTimeout(timerId);
};
*/
import AppRouter from "./src/AppRouter";

export default AppRouter;
