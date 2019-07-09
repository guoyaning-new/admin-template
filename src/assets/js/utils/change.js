/**
 * Created by oia on 2018/8/7.
 */
export default function getFormResult(data) {
  data = data || {};
  return getFormStrByObj(data);
}
function getFormStrByObj(data) {
  var key;
  var keyArr = getSortKeyArr(data);
  var formStr = "";
  for (var i = 0; i < keyArr.length; i++) {
    key = keyArr[i];
    formStr = formStr + key + "=" + data[key] + "&";
  }
  formStr = formStr.substring(0, formStr.length - 1);
  return formStr;
}
function getSortKeyArr(data) {
  var keyArr = new Array();
  var key;
  for (key in data) {
    if (data[key] === 0 || data[key]) {
      keyArr.push(key);
    }
  }
  keyArr = keyArr.sort(function(a, b) {
    return a.localeCompare(b);
  });
  return keyArr;
}
