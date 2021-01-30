const response = (ctx, code, data) => {
  const status = code >= 200 && code <= 399 ? "success" : "error";
  ctx.status = code;
  ctx.body = {
    status,
    data,
  };
};

module.exports = response;
