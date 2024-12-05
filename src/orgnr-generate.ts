import { Clipboard, showHUD } from "@raycast/api";
import { validateOrgnr } from "./orgnr-validate";

export default async function Command() {
  const orgnr = generateOrgnr();
  await Clipboard.copy(orgnr);
  await showHUD(`Kopierte ${orgnr} til utklippstavle 👋`);
}

function generateOrgnr(): string {
  // Generer første siffer (1-9)
  const base = (Math.floor(Math.random() * 10) + 1) % 9;
  // Generer de neste 7 sifrene (0-9) og legg til i base
  let orgnr = base.toString();
  for (let i = 1; i < 8; i++) {
    const nextDigit = Math.floor(Math.random() * 10);
    orgnr += nextDigit.toString();
  }

  // Beregn kontrollsiffer (modulus 11)
  let control = validateOrgnr(orgnr);
  // Håndter spesialtilfeller for kontrollsiffer
  if (control === 11) {
    control = 0;
  } else if (control === 10) {
    // Hvis kontrollsiffer er 10, generer på nytt
    return generateOrgnr();
  }

  // Returner hele organisasjonsnummeret
  return orgnr + control.toString();
}
