import ACCESS_ENUM from "@/enums/accessEnum";

/**
 * 检查权限 （判断当前登录用户是否具有某个权限）
 * @param loginUser 当前登录用户
 * @param needAccess 需要有的权限
 * @return boolean 有无权限
 */
const checkAccess = (loginUser: any, needAccess = ACCESS_ENUM.NOT_LOGIN) => {
  const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM.NOT_LOGIN;
  // 判断当前用户是否有权限
  if (needAccess === ACCESS_ENUM.NOT_LOGIN) return true;
  // 用户登录才能访问
  if (needAccess === ACCESS_ENUM.USER)
    if (loginUserAccess === ACCESS_ENUM.NOT_LOGIN) {
      return false;
    }

  if (needAccess === ACCESS_ENUM.ADMIN)
    if (loginUserAccess !== ACCESS_ENUM.ADMIN)
      // 如果不为管理员，表示无权限
      return false;
  return true;
};

export default checkAccess;
