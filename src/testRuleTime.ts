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

const emplacementReglementation = readCsv('EmplacementReglementation.csv');
const reglementations = readCsv('Reglementations.csv');
const reglementationPeriode = readCsv('ReglementationPeriode.csv');
const periodes = readCsv('Periodes.csv');

const spotId = 'A024';

const links = emplacementReglementation.filter((item: any) => item.sNoEmplacement === spotId);
const codes = links.map((item: any) => item.sCodeAutocollant);
const rules = reglementations.filter((item: any) => codes.includes(item.Name));
const rulePeriods = reglementationPeriode.filter((item: any) => codes.includes(item.sCode));
const periodIds = rulePeriods.map((item: any) => String(item.noPeriode));
const periods = periodes.filter((item: any) => periodIds.includes(String(item.nID)));

const fakeNow = new Date('2026-04-27T14:00:00');

const evaluation = evaluateRules(rules, rulePeriods, periods, fakeNow);

console.log(JSON.stringify({
  fakeNow,
  codes,
  evaluation,
}, null, 2));