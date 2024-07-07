import { JSDOM } from 'jsdom';
import env from './environment';

export default async (): Promise<Record<string, string>[]> => {
  const html = await getHtmlFromUrl(env.PUBLISHED_SHEET_URL);
  return transformTable(getTableFromHtml(html));
}

async function getHtmlFromUrl(url: string): Promise<HTMLHtmlElement> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch the page');
  }

  const dom = new JSDOM(await response.text());
  const html = dom.window.document.querySelector('html');
  if (!html) {
    throw new Error('Failed to parse the page');
  }
  return html;
}

const getTableFromHtml = (html: HTMLElement): Array<string[]> => {
  const table = html.querySelector('table');
  if (!table) {
    throw new Error('Failed to find the table');
  }

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
      rowData.push(column.textContent ?? '');
    }
    data.push(rowData);
  }

  return data;
}

const transformTable = (table: Array<string[]>): Record<string, string>[] => {
  const filteredTable = table.filter(row => row.some(element => env.QUERY.some((q) => element.includes(q))));
  const transformedTable = filteredTable.map(row => {
    const obj: Record<string, string> = {};
    for (let i = 0; i < row.length; i += 1) {
      if (!env.COLUMN_NAMES[i].startsWith('_')) {
        obj[env.COLUMN_NAMES[i]] = row[i];
      }
    }
    return obj;
  });
  return transformedTable;
}
