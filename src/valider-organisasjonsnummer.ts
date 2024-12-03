import { showToast, Toast, LaunchProps } from "@raycast/api";

export default async function Command(props: LaunchProps<{ arguments: Arguments.ValiderOrganisasjonsnummer }>) {
  const control = validateOrgnr(props.arguments.orgnr);
  if (control === 10 || Number.isNaN(control)) {
    await showToast({
      title: `Orgnr. er ikke gyldig`,
      message: `Kontrollsifferet er ${control}`,
      style: Toast.Style.Failure,
    });
  } else {
    await showToast({
      title: "Orgnr. er gyldig",
      style: Toast.Style.Success,
    });
  }
}

export function validateOrgnr(orgnr: string) {
  // Vekter for kontrollsifferberegning
  const weights = [3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;

  // Beregn sum av siffer * vekt
  for (let i = 1; i <= 8; i++) {
    const digit = parseInt(orgnr[i - 1], 10);
    sum += digit * weights[i - 1];
  }
  const control = 11 - (sum % 11);
  return control;
}
