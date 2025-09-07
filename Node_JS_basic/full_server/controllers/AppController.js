class AppController {
  static getHomepage(_req, res) {
    res.status(200).type('text/plain').send('Hello Holberton School!');
  }
}
export default AppController;
