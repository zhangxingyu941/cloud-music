export default async function request(url: string, data = {} as any, type = "GET") {
  const baseUrl = "https://www.wyy.zhang-xiaowa.cn";
  url = baseUrl + url; // 请求地址的拼接
  let requestConfig = {
    method: type,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  data.cookie = localStorage.getItem("cookie") || "";
  if (type == "GET") {
    let dataStr = ""; //数据拼接字符串
    Object.keys(data).forEach((key) => {
      dataStr += key + "=" + data[key] + "&";
    });
    if (dataStr !== "") {
      dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
      url = url + "?" + dataStr;
    }
  }

  if (type == "POST") {
    Object.defineProperty(requestConfig, "body", {
      value: JSON.stringify(data),
    });
  }
  try {
    const res = await fetch(url, requestConfig);
    return res.json();
  } catch (error: any) {
    throw new Error(error);
  }
}
