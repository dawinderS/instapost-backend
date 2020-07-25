export const isAuthenticated = request => {
  if (!request.user) {
    console.log(request.user);
    throw Error("You need to be logged in to perform this action");
  }
  return;
};