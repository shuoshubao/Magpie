/*
 * @Author: fangt11
 * @Date:   2022-04-20 11:15:54
 * @Last Modified by:   fangt11
 * @Last Modified time: 2022-04-27 16:48:48
 */

export const ChromeExtensions = [
  {
    title: 'Octotree - GitHub code tree',
    name: 'octotree-github-code-tree',
    id: 'bkhaagjahfmjljalopjnoealnfndnagc',
    description: 'GitHub项目阅读器',
    icon: 'wafm5uFaPRSo1RHMbhcdEghFzTPUfYo5GosPmBhkdNuYlGz8WigoAQM-8lulzuhWQBGTbbUyRvfoyIMDypJzuAVZ'
  },
  {
    title: 'React Developer Tools',
    name: 'react-developer-tools',
    id: 'fmkadmapgofadopljbjfkapdkoienihi',
    description: '将 React 调试工具添加到 Chrome 开发者工具',
    icon: 'TNijZW_Gp9MZ3eqXkve0YWDEiHV-a2IpSpD6IJzrV3Y76GJcLEyzX2regTLemXzBHbHVqkKuxnnWDT34Cp4sNh-Y'
  },
  {
    title: 'Vue.js devtools',
    name: 'vuejs-devtools',
    id: 'ljjemllljcmogpfapbkkighbhhppjdbg',
    description: 'Vue调试工具',
    icon: 'frsBSB812N3lty03SJsVY6zR1Y6uqYKb4vISAjRJ8LR2pNpYYmY5iHLBUpctVd29tjEEGPcU0_-RhQSUI3Ru2sGb8Q'
  },
  {
    title: 'Google 翻译',
    name: 'google-translate',
    id: 'aapbdbdomjkkjkaonfhkkikfgjllcleb',
    description: '浏览网页时可轻松查看翻译版本',
    icon: '3ZU5aHnsnQUl9ySPrGBqe5LXz_z9DK05DEfk10tpKHv5cvG19elbOr0BdW_k8GjLMFDexT2QHlDwAmW62iLVdek--Q'
  },
  {
    title: '稀土掘金',
    name: '稀土掘金',
    id: 'lecdifefmmfjnjjinhaennhdlmcaeeeb',
    description: '为程序员、设计师、产品经理每日发现优质内容',
    icon: 'jxz8amlMWnjak1SmGLN_8byjMUuGdDvAczOxQ9BdtCScwNLqnHK3dR2wBfKaZQEMqNDu-RTu-pvO6-cyc5SuMX6R-48'
  }
].map(v => {
  const { name, id, icon } = v
  const homepage = ['https://chrome.google.com/webstore/detail', name, id].join('/')
  return {
    ...v,
    icon: ['https://lh3.googleusercontent.com/', icon, '=w128-h128-e365-rj-sc0x00ffffff'].join(''),
    homepage,
    installed: null
  }
})
