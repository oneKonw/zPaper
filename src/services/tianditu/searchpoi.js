import request from '../../utils/request';

const URL_QUERY = 'http://www.tianditu.com/query.shtml';

export function queryBusStation(key, start) {
  const p = new URLSearchParams();
  p.append('type', 'query');
  p.append(
    'postStr',
    JSON.stringify({
      keyWord: encodeURIComponent(key),
      mapBound: '-180,90,180,90',
      queryType: '6',
      level: '11',
      count: '5',
      start: `${start}`,
    }),
  );

  return request(`${URL_QUERY}?${p.toString()}`, {
    method: 'GET',
  });
}
