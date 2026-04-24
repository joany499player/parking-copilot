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

const spotId = 'A024';

const place = places.find((item: any) => item.sNoPlace === spotId);
const links = emplacementReglementation.filter((item: any) => item.sNoEmplacement === spotId);
const codes = links.map((item: any) => item.sCodeAutocollant);
const rules = reglementations.filter((item: any) => codes.includes(item.Name));
const rulePeriods = reglementationPeriode.filter((item: any) => codes.includes(item.sCode));
const periodIds = rulePeriods.map((item: any) => String(item.noPeriode));
const periods = periodes.filter((item: any) => periodIds.includes(String(item.nID)));

const evaluation = evaluateRules(rules, rulePeriods, periods, new Date());

console.log(JSON.stringify({
  place,
  codes,
  rules,
  rulePeriods,
  periods,
  evaluation,
}, null, 2));
