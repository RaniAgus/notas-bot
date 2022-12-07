const axios = require('axios').default;
const jsdom = require('jsdom');

const getTableFromHtml = (html) => {
  const table = html.querySelector('table');
  const rows = table.querySelectorAll('tr');
  const data = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    const columns = row.querySelectorAll('td');
    const rowData = [];
    for (let j = 0; j < columns.length; j += 1) {
      const column = columns[j];
      rowData.push(column.textContent);
    }
    data.push(rowData);
  }
  return data;
}

const getHtmlFromUrl = async (url) => {
  const response = await axios.get(url);
  const dom = new jsdom.JSDOM(response.data);
  const html = dom.window.document.querySelector('html');
  return html;
}

const filterTableData = (table) => {
  const query = process.env.QUERY.split(',');
  const filteredTable = table.filter(row => row.some(element => query.includes(element)));
  return filteredTable;
}

const getData = async () => {
  const html = await getHtmlFromUrl(process.env.URL);
  const table = filterTableData(getTableFromHtml(html));
  return JSON.stringify(table, null, 2);
};

module.exports = getData;
