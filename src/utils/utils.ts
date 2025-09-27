export function getWeek(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
}

export function isThisWeek(date: Date): boolean {
  const now = new Date()
  const weekStart = new Date(now)
  weekStart.setDate(now.getDate() - now.getDay() + 1) // Monday
  weekStart.setHours(0, 0, 0, 0)
  
  const weekEnd = new Date(weekStart)
  weekEnd.setDate(weekStart.getDate() + 6) // Sunday
  weekEnd.setHours(23, 59, 59, 999)
  
  return date >= weekStart && date <= weekEnd
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatEventTime(start: string | Date, end: string | Date) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Same-day event
  if (startDate.toDateString() === endDate.toDateString()) {
    return `${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
  }

  // Multi-day event
  return `${startDate.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} - ${endDate.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`;
};