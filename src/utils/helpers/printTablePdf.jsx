export default function printTablePdf() {
  const divToPrint = document.querySelector('.printPdf');
  const newWin = window.open('');
  newWin.document.write(`
    <html lang="">
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          }
          table, th, td {
            border: 1px solid;
            border-collapse: collapse;
          }
          td {
            font-size: large;
            padding: 5px;
          }
          h4 {
            margin-bottom: 33px;
          }
        </style>
        <title>Weekly expenses</title>
      </head>
        <body>
          ${divToPrint.outerHTML}
        </body>
    </html>
    `);
  newWin.print();
  newWin.close();
}
