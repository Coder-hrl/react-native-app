// 将对象转化为指定格式数组
export const transformData = (list, valueTo = '', labelTo = '') => {
  return Array.isArray(list)
    ? list.map(item => {
        const obj = {
          value: item[valueTo],
          label: item[labelTo],
        };

        return obj;
      })
    : [];
};
// 回显数据
export const getLabel = (value, data, valueTo = 'value', labelTo = 'label') => {
  let text = [];
  // 不是数组的自己设计成数组
  const _value = Array.isArray(value) ? value : [value];

  if (Array.isArray(_value)) {
    _value.forEach(item => {
      if (Array.isArray(data)) {
        const target = data.find(
          iten => Number(iten[valueTo]) === Number(item),
        );
        if (target) {
          text.push(target[labelTo]);
        }
      }
    });
  }

  return text.join(',');
};

export const createRandom = () => {
  return Math.floor(Math.random() * 100000);
};
