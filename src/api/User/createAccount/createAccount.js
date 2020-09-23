import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async(_, args) => {
      const { username, email, loginSecret, name = '', bio = '', phone, gender = ''} = args;
      const emailExists = await prisma.$exists.user({ email });
      const usernameExists = await prisma.$exists.user({ username });
      if (emailExists) {
        throw Error(`Another account is already using ${email}. Please use a different email.`);
      }
      if (usernameExists) {
        throw Error(
          "This username is already taken. Please try another."
        );
      }

      await prisma.createUser({ 
        username, 
        email, 
        loginSecret,
        name, 
        bio, 
        phone, 
        gender 
      });
      return true;
    }
  }
};