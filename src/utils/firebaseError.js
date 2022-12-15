export const firebaseAuthError = (message) => {
  switch (message) {
    case "auth/user-not-found":
      return "Không tìm thấy người dùng";
    case "auth/wrong-password":
      return "Sai mật khẩu";
    case "auth/user-disabled":
      return "Tài khoản người dùng đã bị vô hiệu hóa";
  }
};
