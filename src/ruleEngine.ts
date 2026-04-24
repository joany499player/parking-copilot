type Rule = {
  Name: string;
  Type: string;
  DateDebut: string;
  DateFin: string;
  maxHeures: string;
};

type RulePeriod = {
  sCode: string;
  noPeriode: string;
  sDescription: string;
};
type Period = {
  nID: string;
  dtHeureDebut: string;
  dtHeureFin: string;
  bLun: string;
  bMar: string;
  bMer: string;
  bJeu: string;
  bVen: string;
  bSam: string;
  bDim: string;
};

function isDayActive(period: Period, day: number) {
     if (day === 0) return period.bDim === '1';
  if (day === 1) return period.bLun === '1';
  if (day === 2) return period.bMar === '1';
  if (day === 3) return period.bMer === '1';
  if (day === 4) return period.bJeu === '1';
  if (day === 5) return period.bVen === '1';
  return period.bSam === '1';
}

function toMinutes(value: string) {
  const [hours, minutes] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function isTimeActive(period: Period, nowMinutes: number) {
    const start = toMinutes(period.dtHeureDebut);
  const end = toMinutes(period.dtHeureFin);
  return nowMinutes >= start && nowMinutes <= end;
}

export function evaluateRules(
  rules: Rule[],
  rulePeriods: RulePeriod[],
  periods: Period[],
  now: Date
) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const day = now.getDay();

  const activePeriods = periods.filter((period) => {
           return isDayActive(period, day) && isTimeActive(period, nowMinutes);
  });

  const activePeriodIds = activePeriods.map((period) => period.nID);

  const activeRulePeriods = rulePeriods.filter((item) =>
    activePeriodIds.includes(item.noPeriode)
  );

  const activeCodes = activeRulePeriods.map((item) => item.sCode);

  const activeRules = rules.filter((rule) => activeCodes.includes(rule.Name));

  return {
    activePeriods,
        activeRulePeriods,
    activeRules,
  };
}