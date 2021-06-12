const index = (req, res) => {
  res.render('index', { title: 'Proyecto Geminis' });
};

const greeting = (req, res) => {
  res.status(200).json({ message: ' Hola Desarrollador Web' });
};
export default {
  index,
  greeting,
};
