'use strict';

const app = require('./functions/server');

app.listen(3000, () =>
  console.log('Local app listening on http://localhost:3000!')
);
