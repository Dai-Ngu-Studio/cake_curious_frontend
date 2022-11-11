export const firebaseAuthError = (message) => {
  switch (message) {
    case "auth/user-not-found":
      return "User not found";
    case "auth/wrong-password":
      return "Incorrect password";
  }
};
