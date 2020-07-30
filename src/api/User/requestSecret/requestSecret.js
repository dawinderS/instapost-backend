import { generateSecret, sendSecretMail } from '../../../utils';
import { prisma } from '../../../../generated/prisma-client';

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      let user;
      if (email.includes("@")) {
        user = await prisma.user({ email });
      } else {
        user = await prisma.user({ username: email });
      }
      if (user === null) {
        return false;
      }
      const userEmail = user.email;
      try {
        await sendSecretMail(userEmail, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email: userEmail } });
        return true;
      } catch(e) {
        return false;
      }
    }
  }
};