import { EPeriod } from "./enums/e-period.enum";
import { ERateType } from "./enums/e-rate-type.enum";


export class Rate {
  rateId: number = 0;
  value: number = 0;
  type: ERateType = ERateType.NOMINAL;
  period: EPeriod = EPeriod.ANUAL;
}
