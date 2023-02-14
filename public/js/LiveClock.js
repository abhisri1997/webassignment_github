/**
 * Genaerate live clock for the passed time and sets the time to the passed element
 *
 */
function LiveClock() {
  this.clearLiveClockId;

  /**
   * Starts the live clock from the given time.
   *
   * @param {string} startTime
   * @param {Object} element
   *
   */
  this.liveClock = (startTime, element) => {
    let currentTime = new Date();
    const [hours, minutes, seconds] = startTime.split(":");

    currentTime.setHours(hours);
    currentTime.setMinutes(minutes);
    currentTime.setSeconds(seconds);

    let liveClockID = setInterval(() => {
      currentTime.setSeconds(currentTime.getSeconds() + 1);

      let hh = currentTime.getHours();
      let mm = currentTime.getMinutes();
      let ss = currentTime.getSeconds();

      this.setLiveClock(hh, mm, ss, element);
    }, 1000);
    this.setLiveClockId(liveClockID);
  };

  /**
   * Sets the live clock time to the provided DOM element
   * @param {number} hh
   * @param {number} mm
   * @param {number} ss
   * @param {Object} element - DOM element where live clock will be visible
   */
  this.setLiveClock = (hh, mm, ss, element) => {
    if (hh == 0) {
      hh = 12;
    }
    if (hh > 12) {
      hh = hh - 12;
    }

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;

    switch (element.id.split("-")[0]) {
      case "top":
        element.querySelector(".city-time").innerHTML = hh + ":" + mm;
        element.querySelector(".city-second").innerHTML = ":" + ss;
        break;
      case "mid":
        element.innerHTML =
          hh + ":" + mm + " " + element.innerHTML.split(" ")[1];
        break;
      case "bottom":
        element.innerHTML =
          hh + ":" + mm + " " + element.innerHTML.split(" ")[1];
        break;
      default:
        console.error("Invalid element id: " + element.id);
    }
  };

  this.setLiveClockId = (id) => {
    this.clearLiveClockId = id;
  };

  this.getLiveClockId = () => {
    return this.getLiveClockId();
  };

  /**
   * Clears previously generated live clock
   */
  this.clearLiveClock = () => {
    clearInterval(this.clearLiveClockId);
  };
}

export default LiveClock;
