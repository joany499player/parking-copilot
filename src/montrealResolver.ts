import { parse } from 'csv-parse/sync';
import fs from 'fs';
import path from 'path';
import { evaluateRules } from './ruleEngine';

const dataDir = path.join(process.cwd(), 'montreal-data');

function readCsv(filename: string) {
  const filePath = path.join(dataDir, filename);
  const content = fs.readFileSync(filePath, 'utf-8');

  return parse(content, {
    columns: true,
        skip_empty_lines: true,
  });
}

const places = readCsv('Places.csv');
const emplacementReglementation = readCsv('EmplacementReglementation.csv');
const reglementations = readCsv('Reglementations.csv');
const reglementationPeriode = readCsv('ReglementationPeriode.csv');
const periodes = readCsv('Periodes.csv');

export function resolveSpot(spotId: string) {
  const place = places.find((item: any) => item.sNoPlace === spotId);

  if (!place) {
    return null;
      }

  const links = emplacementReglementation.filter((item: any) => item.sNoEmplacement === spotId);
  const codes = links.map((item: any) => item.sCodeAutocollant);
  const rules = reglementations.filter((item: any) => codes.includes(item.Name));
  const rulePeriods = reglementationPeriode.filter((item: any) => codes.includes(item.sCode));
  const periodIds = rulePeriods.map((item: any) => String(item.noPeriode));
  const periods = periodes.filter((item: any) => periodIds.includes(String(item.nID)));
  const evaluation = evaluateRules(rules, rulePeriods, periods, new Date());

  const hasActiveRule = evaluation.activeRules.length > 0;

  return {
    id: place.sNoPlace,
    name: place.sNomRue,
        lat: Number(place.nLatitude),
    lng: Number(place.nLongitude),
    price: place.nTarifHoraire,
    status: hasActiveRule ? 'Check Rules' : 'Allowed',
    until: hasActiveRule ? 'Active now' : 'No active restriction now',
    activeRuleCodes: evaluation.activeRules.map((rule: any) => rule.Name),
    activeRules: evaluation.activeRules,
    activeRulePeriods: evaluation.activeRulePeriods,
    activePeriods: evaluation.activePeriods,
  };
}