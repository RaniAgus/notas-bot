import { JSDOM } from 'jsdom';
import env from './environment';

export default async (): Promise<string[][]> => {
  return getTableFromDOM(await getDOMFromUrl(env.PUBLISHED_SHEET_URL))
    .filter(row => row.some(cell => env.QUERY.some(q => cell.includes(q))));
}

async function getDOMFromUrl(url: string): Promise<JSDOM> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch the page');
  }

  return new JSDOM(await response.text());
}

const getTableFromDOM = (dom: JSDOM): string[][] => {
  return Array.from(dom.window.document.querySelectorAll('html'))
    .flatMap(html => Array.from(html.querySelectorAll('table')))
    .flatMap(table => Array.from(table.querySelectorAll('tr')))
    .map(tr => Array.from(tr.querySelectorAll('td'))
      .filter(td => !td.hasAttribute('rowspan'))
      .map(td => td.textContent ?? '')
    );
}
