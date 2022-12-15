import request from "../http/index";

/**
 * 获取二维码key
 * @returns
 */
export async function getCodeKey() {
  return await request("/login/qr/key?timerstamp" + Date.now());
}

/**
 * 生成二维码base64图片
 * @param key 二维码key
 * @returns
 */
export async function generatingCode(key: string) {
  return await request("/login/qr/create?timerstamp" + Date.now(), { key, qrimg: "true" }, "POST");
}

/**
 * 检查二维码是否过期
 * @param key 二维码key
 * @returns
 */
export async function checkCodeState(key: string) {
  return await request("/login/qr/check?key=" + key + "&timerstamp=" + Date.now());
}

/**
 * 获取账号信息
 * @returns
 */
export async function getAccountInfo() {
  return await request("/user/account");
}

/**
 * 游客登陆
 *  @returns
 */

export async function anonimousLogin() {
  return await request("/register/anonimous");
}

/**
 * 退出登录
 * @returns
 */
export async function logout() {
  return await request("/logout");
}

/**
 * 手机号登录
 * @param data 账号密码
 * @returns
 */
export async function loginForCellphone(data: any) {
  return await request("/login/cellphone", data, "POST");
}

/**
 * 获取验证码
 * @param phone 手机号
 * @returns
 */
export async function getVerifyCode(phone: string) {
  return await request("/captcha/sent", { phone }, "POST");
}
