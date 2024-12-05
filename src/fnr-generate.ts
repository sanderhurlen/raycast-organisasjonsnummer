import { Clipboard, showHUD } from "@raycast/api";
import { generateControlDigits } from "./fnr-validate";

export default async function Command() {
  const fnr = generateFnr("150892");
  await Clipboard.copy(fnr);
  await showHUD(`Kopierte ${fnr} til utklippstavle 👋`);
}

function generateFnr(dateOfBirth: string): string {
  // Valider at datoen er i riktig format (DDMMYY)
  if (!/^\d{2}\d{2}\d{2}$/.test(dateOfBirth)) {
    throw new Error("Ugyldig datoformat. Bruk DDMMYY.");
  }

  // Generer tilfeldige verdier for individnummer (100-999)
  const individnummer = Math.floor(Math.random() * 900) + 100;

  // Bygg det 9-sifrede grunnlaget for fødselsnummeret
  return generateControlDigits(`${dateOfBirth}${individnummer}`);
}
