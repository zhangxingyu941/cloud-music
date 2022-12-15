import request from "../http/index";

/**
 * 获取搜索关键词
 * @returns
 */
export async function getSearchKeyWords() {
  return await request("/search/default");
}

/**
 * 获取热门搜索内容
 * @returns
 */
export async function getHotSearch() {
  return await request("/search/hot/detail");
}

/**
 * 获取搜索建议
 * @param keywords 关键词
 * @returns
 */
export async function getSearchsuggest(keywords: string) {
  return await request("/search/suggest?keywords=" + keywords);
}

/**
 *
 * @param keywords 关键词
 * @param type 搜索类型  1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合
 * @param limit 返回数量
 * @returns
 */
export async function search(keywords: string, type = 1, limit = 30) {
  return await request("/search", { keywords, type, limit });
}
