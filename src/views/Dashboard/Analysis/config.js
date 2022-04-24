/*
 * @Author: shuoshubao
 * @Date:   2022-04-24 15:32:51
 * @Last Modified by:   shuoshubao
 * @Last Modified time: 2022-04-24 17:42:15
 */
export const getColumns = () => {
  return [
    { label: '文件总数', name: 'fileCount', span: 3 },
    { label: 'js文件数', name: 'jsFileCount' },
    { label: 'js代码行数', name: 'jsLineCount' },
    { label: 'js代码体积', name: 'jsFileSize' },
    { label: 'style文件数', name: 'styleFileCount' },
    { label: 'style代码行数', name: 'styleLineCount' },
    { label: 'style代码体积', name: 'styleFileSize' },
    { label: 'image文件数', name: 'imageFileCount' },
    { label: 'image代码行数', name: 'imageLineCount' },
    { label: 'image代码体积', name: 'imageFileSize' }
  ]
}
