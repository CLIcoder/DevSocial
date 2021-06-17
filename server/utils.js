import nodemailer from "nodemailer";

export const likeFunc = (arr, id) => {
  // like and dislike function
  for (let elem in arr) {
    // update user like
    if (arr[elem].id === id) {
      arr[elem].status = !arr[elem].status;
      return arr;
    }
  }
  // merge new user like
  arr.push({ id, status: true });
  return arr;
};

export const countLikes = (arr) => {
  let counter = 0;
  for (let elem in arr) {
    if (arr[elem].status) counter++;
  }
  return counter;
};

//mail sender function
export const sendMail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_PROVIDER,
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };
  transporter.sendMail(mailOptions, (error, res) => {
    if (error) console.log(error);
    console.log(res);
  });
};
