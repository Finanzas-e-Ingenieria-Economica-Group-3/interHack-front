import { EPeriod } from "./EPeriod";
import { ERateType } from "./ERateType";

// src/app/models/rate-response.ts (asegúrate de la ruta correcta)
export class RateResponse {
    value: number = 0;
    type: ERateType = ERateType.NOMINAL; // Tipo de tasa
    period: EPeriod = EPeriod.ANUAL;     // Periodo de tasa
  }
  