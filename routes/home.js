export default function home() {
  async function home_page(req, res) {
    try {
      res.render("index");
    } catch (err) {
      console.error("Error", err);
    }
  }

  return {
    home_page,
  };
}


