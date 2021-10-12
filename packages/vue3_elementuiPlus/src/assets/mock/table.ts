import Mock from "./index";
// 登录
let Table: any[] = [
  {
    id: 'table1',
    title: 'table1',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
  {
    id: 'table2',
    title: 'table2',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
  {
    id: 'table3',
    title: 'table3',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
  {
    id: 'table4',
    title: 'table4',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
  {
    id: 'table5',
    title: 'table5',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
  {
    id: 'table6',
    title: 'table6',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
  {
    id: 'table7',
    title: 'table7',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
  {
    id: 'table8',
    title: 'table8',
    attr1: '属性1',
    attr2: '属性2',
    attr3: '属性3',
  },
];

export default {
  "get|/table": (option: any) => {
    return Mock.successResp(Table);
  },
};
