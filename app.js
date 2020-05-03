const path = require('path');

const rootDir = require('./utils/path');
const express = require('express');
const bodyParser = require('body-parser');
const { router } = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', router);
app.use(shopRoutes);

app.use((req, res, next) => {
	// res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
	res.status(404).render('404.ejs', { pageTitle: 'Page not found!', path: '' });
});
app.listen(3000);
