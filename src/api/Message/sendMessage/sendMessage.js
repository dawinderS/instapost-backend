import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    sendMessage: async(_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      
      const existingRoom = await prisma.rooms({
        where: {
          AND: [
            { participants_some: { id: user.id } },
            { participants_some: { id: toId } },
          ],
        },
      });

      if (existingRoom.length < 1) {
        if (user.id !== toId) {
          room = await prisma.createRoom({
            participants: {
              connect: [ { id: toId }, { id: user.id } ]
            }
          });
        }
      } else {
        room = existingRoom[0];
        if (!room) {
          throw Error("Chat with this user not found");
        }
      }

      return prisma.createMessage({
        text: message,
        from: {
          connect: { id: user.id }
        },
        to: {
          connect: { id: toId }
        },
        room: {
          connect: { id: room.id }
        }
      });
    }
  }
};