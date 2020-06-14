import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async(_, args) => {
      const { username, email, name = '', bio = '', phone, gender = ''} = args;
      const user = await prisma.createUser({ 
        username, 
        email, 
        name, 
        bio, 
        phone, 
        gender 
      });
      return user;
    }
  }
};