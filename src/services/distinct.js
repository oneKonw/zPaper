import request from '../utils/request';

export default function loadJson() {
  return request('./config/zqLocation-20180521.json', {
    method: 'GET',
    handleAs: 'json',
  });
}
