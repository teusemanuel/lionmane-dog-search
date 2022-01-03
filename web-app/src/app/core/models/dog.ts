import { autoserialize } from 'cerialize';

export class WorkSchedule {
  @autoserialize
  monStartTime1?: string;

  @autoserialize
  monEndTime1?: string;

  @autoserialize
  monStartTime2?: string;

  @autoserialize
  monEndTime2?: string;

  @autoserialize
  monEnabled?: boolean;

  @autoserialize
  tueStartTime1?: string;

  @autoserialize
  tueEndTime1?: string;

  @autoserialize
  tueStartTime2?: string;

  @autoserialize
  tueEndTime2?: string;

  @autoserialize
  tueEnabled?: boolean;

  @autoserialize
  wedStartTime1?: string;

  @autoserialize
  wedEndTime1?: string;

  @autoserialize
  wedStartTime2?: string;

  @autoserialize
  wedEndTime2?: string;

  @autoserialize
  wedEnabled?: boolean;

  @autoserialize
  thuStartTime1?: string;

  @autoserialize
  thuEndTime1?: string;

  @autoserialize
  thuStartTime2?: string;

  @autoserialize
  thuEndTime2?: string;

  @autoserialize
  thuEnabled?: boolean;

  @autoserialize
  friStartTime1?: string;

  @autoserialize
  friEndTime1?: string;

  @autoserialize
  friStartTime2?: string;

  @autoserialize
  friEndTime2?: string;

  @autoserialize
  friEnabled?: boolean;

  @autoserialize
  satStartTime1?: string;

  @autoserialize
  satEndTime1?: string;

  @autoserialize
  satStartTime2?: string;

  @autoserialize
  satEndTime2?: string;

  @autoserialize
  satEnabled?: boolean;

  @autoserialize
  sunStartTime1?: string;

  @autoserialize
  sunEndTime1?: string;

  @autoserialize
  sunStartTime2?: string;

  @autoserialize
  sunEndTime2?: string;

  @autoserialize
  sunEnabled?: boolean;
}
