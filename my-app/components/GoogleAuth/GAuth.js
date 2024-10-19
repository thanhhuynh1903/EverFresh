import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { loginGoogle } from "../../api/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ({ handleCheckToken }) {
  GoogleSignin.configure({
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    webClientId:
      "863903622013-rpu0k9b234i480rgcma15dbqh325rkco.apps.googleusercontent.com",
  });
  const handleLoginGoogle = async (userInfo) => {
    const { data } = JSON.parse(userInfo);
    const { idToken } = data;

    const response = await loginGoogle({ token: idToken });
    console.log(response.status);

    if (response.status === 200) {
      await AsyncStorage.setItem("accessToken", response?.data?.accessToken);
      await handleCheckToken();
    }
  };

  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          await handleLoginGoogle(JSON.stringify(userInfo, null, 2));
        } catch (error) {
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
            console.log("SIGN_IN_CANCELLED");
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
            console.log("IN_PROGRESS");
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
            console.log("PLAY_SERVICES_NOT_AVAILABLE");
          } else {
            // some other error happened
            console.log(error);
          }
        }
      }}
    />
  );
}
