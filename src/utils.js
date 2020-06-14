import { adjectives, nouns } from "./words"

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const sendMail= (email) => null;

export const sendSecretMail = (address, secret) => {
  const email = { 
    from: "admin@instaplus.com",
    to: address,
    subject: "Login passcode for Instaplus",
    html: `Hello user, your login passcode is ${secret}.<br>Copy paste it on the app to log in`
  }
}