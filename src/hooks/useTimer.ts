import moment from "moment";
import React from "react";

// Use this guys cool logic for the timer and made some twikes! :)
// https://benhur-martins.medium.com/how-to-create-a-countdown-timer-hook-for-your-react-project-f05f2c349637

type TimerData = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const DAYS_IN_MS = 1000 * 60 * 60 * 24;
const HOURS_IN_MS = 1000 * 60 * 60;
const MIN_IN_MS = 1000 * 60;
const SEC_IN_MS = 1000;

const formatNumber = (num: number) => {
  return num < 10 ? `0${num}` : `${num}`;
};

const getTimeDiff = (diffInMSec: number): TimerData => {
  let diff = diffInMSec;
  const days = Math.floor(diff / DAYS_IN_MS); // Give the remaining days
  diff -= days * DAYS_IN_MS; // Subtract passed days
  const hours = Math.floor(diff / HOURS_IN_MS); // Give remaining hours
  diff -= hours * HOURS_IN_MS; // Subtract hours
  const minutes = Math.floor(diff / MIN_IN_MS); // Give remaining minutes
  diff -= minutes * MIN_IN_MS; // Subtract minutes
  const seconds = Math.floor(diff / SEC_IN_MS); // Give remaining seconds

  return {
    days: formatNumber(days), // Format everything into the return type
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  };
};

export function useTimer(targetTime: string) {
  const [timeLeft, setTimeLeft] = React.useState<number>(
    moment(targetTime).diff(moment(new Date()))
  );
  const [hasEnded, setHasEnded] = React.useState<boolean>(true);

  React.useEffect(() => {
    const id = setTimeout(() => {
      // We can set conditions here like timeLeft > 0
      if (timeLeft <= 0) {
        setHasEnded(true);
        return;
      }

      setHasEnded(false);
      setTimeLeft((prev) => prev - 1000);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  });

  return { ...getTimeDiff(timeLeft), hasEnded };
}
