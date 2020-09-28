import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async(_, args) => {
      const { email, secret } = args;
      let user;
      if (email.includes("@")) {
        user = await prisma.user({ email });
      } else {
        user = await prisma.user({ username: email });
      }

      if (email === "demo@gmail.com" || email === "demoUser") {
        // await prisma.updateUser({ 
        //   where: { id: user.id }, 
        //   data: { loginSecret: "" }
        // });
        return generateToken(user.id);
      }
      if (!user && email.includes("@")) {
        throw Error("The email you entered doesn't belong to an account. Please check your email and try again.");
      } else if (!user) {
        throw Error("The username you entered doesn't belong to an account. Please check your username and try again.");
      } else if (user.loginSecret === secret) {
        // await prisma.updateUser({ 
        //   where: { id: user.id }, 
        //   data: { loginSecret: "" }
        // });
        return generateToken(user.id);
      } else {
        throw Error("Sorry, your password was incorrect. Please double-check your password.");
      }
    }
  }
};