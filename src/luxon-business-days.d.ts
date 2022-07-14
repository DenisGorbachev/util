import type { DateTime as DateTimeOriginal } from 'luxon'
import { DurationInput } from 'luxon/src/duration'

declare module 'luxon-business-days' {
  export class DateTime extends DateTimeOriginal {
    plusBusiness(duration: DurationInput): DateTime;
  }
}
