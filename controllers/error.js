exports.error = (req, res, next) => {
	res.status(404).render('404.ejs', { pageTitle: 'Page not found!', path: '' });
};
