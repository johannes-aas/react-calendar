import type { EventCategoryKey } from "../config/eventCategories"

export interface Event {
  id: string
  title: string
  start: Date
  end: Date
  locationName?: string
  type?: EventCategoryKey
  link?: string
}

export interface EventDisplayProps {
  startCol: number
  span: number
  leftEdge: boolean
  rightEdge: boolean
  active: boolean
}

export interface Week {
  dates: Date[]
  eventDetails: (Event & { eventDisplayProps: EventDisplayProps })[][]
}

export interface CalendarData {
  weeks: Week[]
  year: number
  month: number
}
