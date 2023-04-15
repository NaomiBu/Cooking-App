export function getCookingTime(timeInMins: number): {
    dateTime: string;
    readable: string;
  } {
    const hours = Math.floor(timeInMins / 60);
    const minutes = timeInMins - hours * 60;
  
    return {
      dateTime: `PT${hours}H${minutes}M`,
      readable: `${hours > 0 ? `${hours} hour${hours > 1 ? "s" : ""}` : ""}${
        minutes > 0 ? ` ${minutes} minute${minutes > 1 ? "s" : ""}` : ""
      }`,
    };
  }