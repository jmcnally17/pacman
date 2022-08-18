import pauseTimers from "../timers/pauseTimers";
import resumeTimers from "../timers/resumeTimers";

export default function addVisibilityDetection(
  variables,
  cycleTimer,
  scaredTimer,
  retreatingTimers,
  ghostAudioObjects,
  callbackOne = pauseTimers,
  callbackTwo = resumeTimers
) {
  document.addEventListener(
    "visibilitychange",
    (variables.visibilityEventListener = () => {
      if (variables.windowIsVisible) {
        variables.windowIsVisible = false;
        ghostAudioObjects[0].pause();
        ghostAudioObjects[1].pause();
        ghostAudioObjects[2].pause();
        callbackOne(cycleTimer, scaredTimer, retreatingTimers);
      } else {
        variables.windowIsVisible = true;
        callbackTwo(cycleTimer, scaredTimer, retreatingTimers);
      }
    })
  );
}
