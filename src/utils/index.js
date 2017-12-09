import { JSDOM } from 'jsdom';

export const getDocument = () => {
	const jsdom = new JSDOM(`<!doctype html>
	  <html>
	    <body>
	      <div id="challenge-node"></div>
	    </body>
	  </html>
	`);
	const { window } = jsdom;
	const document = window.document;
	return { document, window };
}
