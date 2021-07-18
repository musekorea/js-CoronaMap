export const rootController = async (req, res) => {
  console.log(req.path);
  res.render('index');
};
export const uploadController = (req, res) => {
  console.log(req.path);
  res.render('upload');
};
