function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  const status = err.status || 500;
  const message = status === 500 ? 'Something went wrong.' : err.message;

  if (req.accepts('html')) {
    req.session = req.session || {};
    req.session.flash = { type: 'error', message };
    const referer = req.get('Referrer') || '/';
    return res.redirect(referer);
  }

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
