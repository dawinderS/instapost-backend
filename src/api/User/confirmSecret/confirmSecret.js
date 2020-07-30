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
        await prisma.updateUser({ 
          where: { id: user.id }, 
          data: { loginSecret: "" }
        });
        return generateToken(user.id);
      }
      if (user.loginSecret === secret) {
        await prisma.updateUser({ 
          where: { id: user.id }, 
          data: { loginSecret: "" }
        });
        return generateToken(user.id);
      } else {
        throw Error("Wrong email/passcode combination");
      }
    }
  }
};