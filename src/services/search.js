import request from '../utils/request';

const URL_SEARCH_SOLR =
  'http://www.mapjs.com.cn/map/search/solr?q=%E5%8D%97%E4%BA%AC%E5%B8%82%E6%94%BF%E5%BA%9C&start=0&rows=5&wt=json';

export function searchsolr(key, start) {
  const param = new URLSearchParams();
  param.append('q', encodeURIComponent(key));
  param.append('start', start);
  param.append('rows', 5);
  param.append('wt', 'json');

  return request(URL_SEARCH_SOLR, {
    method: 'GET',
    params: param,
  });
}
