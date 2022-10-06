import nodeoutlook from 'nodejs-nodemailer-outlook'


export default function sendEmail(email,message) {
  nodeoutlook.sendEmail({
    auth: {
      user: "sarahaserver@outlook.com",
      pass: "rvyG_Nea8kXuH_G",
    },
    from: "sarahaserver@outlook.com",
    to: email,
    subject: "Hey you, awesome!",
    html: message,
    text: "This is saraha server",
    onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i),
  });
}
