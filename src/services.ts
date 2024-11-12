import { CarInterface } from "./redux/carRentalSlice/carRentalSliceTypes";

export function calculateRentalCost(
  startDate: string,
  endDate: string,
  price: { hour: number; day: number }
): number {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const totalHours = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60)
  );

  const fullDays = Math.floor(totalHours / 24);
  const remainingHours = totalHours % 24;

  const cost = fullDays * price.day + remainingHours * price.hour;

  return cost;
}

export const isSameDay = (date1: Date, date2: Date) =>
  date1.getFullYear() === date2.getFullYear() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getDate() === date2.getDate();

export function isPeriodAvailable(
  car: CarInterface,
  userStartDate: string,
  userEndDate: string
): boolean {
  return !car.availability?.some((period) => {
    const periodStart = new Date(period.startDate);
    const periodEnd = new Date(period.endDate);

    return (
      new Date(userStartDate) < periodEnd && new Date(userEndDate) > periodStart
    );
  });
}

export function monthNameToNumber(monthName: string) {
  const monthNames = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const monthIndex = monthNames.indexOf(monthName.toLowerCase());

  return monthIndex !== -1 ? monthIndex : null;
}
