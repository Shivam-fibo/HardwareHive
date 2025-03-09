import { SendMailClient } from "zeptomail";

const url = "https://api.zeptomail.in/";
const token = "Zoho-enczapikey wSsVR60n+UaiDKh6zzX4duk7zV4HAl/1F0Ur2wCguiOqSvDG9MczxEHHV1egHvAbFGZvRTsXo7wtzhxS0jcHjIgtzAkGDCiF9mqRe1U4J3x17qnvhDzKW2VclBaNLIMMwgpimmNjFMAr+g==";

const client = new SendMailClient({ url, token });

export const sendEmail = () => {
  client
    .sendMail({
      from: {
        address: "noreply@sspowertool.com",
        name: "noreply",
      },
      to: [
        {
          email_address: {
            address: "sg641818@gmail.com", // Change to the recipient email
            name: "User",
          },
        },
      ],
      subject: "Hello User",
      htmlbody: `<div><b>Hello User</b></div>`,
    })
    .then(() => console.log("✅ Email sent successfully!"))
    .catch((error) => {
      console.error("❌ Email sending failed:", error.message);

      if (error.response) {
        console.error("Response Error:", {
          status: error.response.status,
          data: error.response.data,
        });
      }
    });
};
