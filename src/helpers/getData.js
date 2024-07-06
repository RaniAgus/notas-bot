const { JSDOM } = require('jsdom');
const { QUERY, COLUMN_NAMES } = require('./environment');
const env = require('./environment');

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
      // Si la celda tiene rowspan la primera fila va a tener más columnas que las demás
      if (column.hasAttribute('rowspan')) {
        continue;
      }
      rowData.push(column.textContent);
    }
    data.push(rowData);
  }
  return data;
}

const getHtmlFromUrl = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch the page');
  }

  const dom = new JSDOM(await response.text());
  const html = dom.window.document.querySelector('html');
  return html;
}

const filterTableData = (table) => {
  const filteredTable = table.filter(row => row.some(element => QUERY.some((q) => element.includes(q))));
  const transformedTable = filteredTable.map(row => {
    const obj = {};
    for (let i = 0; i < row.length; i += 1) {
      obj[COLUMN_NAMES[i]] = row[i];
    }
    return obj;
  });
  return transformedTable;
}

const getData = async () => {
  const html = await getHtmlFromUrl(env.PUBLISHED_SHEET_URL);
  const table = filterTableData(getTableFromHtml(html));
  return table;
};

module.exports = getData;
