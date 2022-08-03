//! locale : Spanish(United State) [es-us]
//! author : bustta : https://github.com/bustta

import ExDate from "..";

const monthsShortDot = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_");
const monthsShort = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_");

export default ExDate.defineLocale("es-us", {
  months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
  monthsShort(m, format) {
    if (!m) {
      return monthsShortDot;
    } else if (/-MMM-/.test(format)) {
      return monthsShort[m.month()];
    }
    return monthsShortDot[m.month()];

  },
  monthsParseExact: true,
  weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
  weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
  weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
  weekdaysParseExact: true,
  longDateFormat: {
    LT: "h:mm A",
    LTS: "h:mm:ss A",
    L: "MM/DD/YYYY",
    LL: "MMMM [de] D [de] YYYY",
    LLL: "MMMM [de] D [de] YYYY h:mm A",
    LLLL: "dddd, MMMM [de] D [de] YYYY h:mm A"
  },
  calendar: {
    sameDay() {
      return `[hoy a la${this.hours() !== 1 ? "s" : ""}] LT`;
    },
    nextDay() {
      return `[mañana a la${this.hours() !== 1 ? "s" : ""}] LT`;
    },
    nextWeek() {
      return `dddd [a la${this.hours() !== 1 ? "s" : ""}] LT`;
    },
    lastDay() {
      return `[ayer a la${this.hours() !== 1 ? "s" : ""}] LT`;
    },
    lastWeek() {
      return `[el] dddd [pasado a la${this.hours() !== 1 ? "s" : ""}] LT`;
    },
    sameElse: "L"
  },
  relativeTime: {
    future: "en %s",
    past: "hace %s",
    s: "unos segundos",
    ss: "%d segundos",
    m: "un minuto",
    mm: "%d minutos",
    h: "una hora",
    hh: "%d horas",
    d: "un día",
    dd: "%d días",
    M: "un mes",
    MM: "%d meses",
    y: "un año",
    yy: "%d años"
  },
  dayOfMonthOrdinalParse: /\d{1,2}º/,
  ordinal: "%dº",
  week: {
    dow: 0, // Sunday is the first day of the week.
    doy: 6 // The week that contains Jan 1st is the first week of the year.
  }
});
