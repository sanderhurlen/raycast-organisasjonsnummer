import { LaunchProps, showToast, Toast } from "@raycast/api";
import get from "cross-fetch";

export default async function Command(props: LaunchProps<{ arguments: Arguments.OrgnrIBruk }>) {
  const orgnr = props.arguments.orgnr;

  const response = await get(`https://data.brreg.no/enhetsregisteret/api/underenheter/${orgnr}`);

  if (response.ok) {
    await showToast({
      title: "I bruk",
      message: "Tilhører en enhet",
      style: Toast.Style.Failure,
    });
  } else {
    await showToast({
      title: "Tilgjengelig",
      message: "Ingen enhet er registrert med orgnr.",
      style: Toast.Style.Success,
    });
  }
}
