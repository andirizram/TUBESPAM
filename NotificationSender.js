import axios from "axios";

export async function sendPushNotification(expoPushToken) {
  const message = {
    to: exppoPushToken,
    sound: "default",
    title: "Your notification title",
    body: "Your notification message",
    data: { data: "goes here" },
  };

  const response = await axios.post(
    "https://exp.host/--/api/v2/push/send",
    message,
    {
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response.data);
}
