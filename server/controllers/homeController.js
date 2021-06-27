const index = (req, res) => {
  res.render('home/index', { title: 'Proyecto Geminis' });
};

const greeting = (req, res) => {
  res.status(200).json({ message: ' Hola Desarrollador Web' });
};

const about = (req, res) => {
  res.render('home/about', { AppVersion: '0.0.1' });
};
export default {
  index,
  greeting,
  about,
};
