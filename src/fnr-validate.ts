import { LaunchProps, showToast, Toast } from "@raycast/api";

export default async function Command(props: LaunchProps<{ arguments: Arguments.FnrValidate }>) {
  try {
    validateFnr(props.arguments.fnr);
    await showToast({
      title: "Fødselsnummer er gyldig",
      style: Toast.Style.Success,
    });
  } catch (e) {
    await showToast({
      title: `Fødselsnummer er ikke gyldig`,
      message: (e as unknown as { message: string }).message,
      style: Toast.Style.Failure,
    });
  }
}

const calculateControlDigit = (weights: number[], base: string): number => {
  const sum = base
    .split("")
    .map((digit, index) => parseInt(digit, 10) * weights[index])
    .reduce((acc, curr) => acc + curr, 0);
  const remainder = sum % 11;
  return remainder === 0 ? 0 : 11 - remainder;
};

export function generateControlDigits(base: string) {
  // Kontroller-sifferberegning
  const weights1 = [3, 7, 6, 1, 8, 9, 4, 5, 2];
  const weights2 = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];

  const k1 = calculateControlDigit(weights1, base);
  if (k1 === 10) {
    throw new Error("Ugyldig individnummer. Prøv på nytt.");
  }

  const k2 = calculateControlDigit(weights2, `${base}${k1}`);
  if (k2 === 10) {
    throw new Error("Ugyldig individnummer. Prøv på nytt.");
  }
  return base + k1 + k2;
}

function validateFnr(fnr: string) {
  const k1 = Number.parseInt(fnr[9]);
  const k2 = Number.parseInt(fnr[10]);

  if (Number.isNaN(k1) || Number.isNaN(k2)) {
    throw new Error("k1 eller k2 er ikke tall");
  }

  if (k1 === 10) {
    throw new Error("Ugyldig individnummer. Prøv på nytt.");
  }

  if (k2 === 10) {
    throw new Error("Ugyldig individnummer. Prøv på nytt.");
  }
}
