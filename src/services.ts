export function calculateRentalCost(
    startDate: string,
    endDate: string,
    price: { hour: number; day: number }
  ): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    const totalHours = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60));
  
    const fullDays = Math.floor(totalHours / 24);
    const remainingHours = totalHours % 24;
  
    const cost = fullDays * price.day + remainingHours * price.hour;
  
    return cost;
  }