import axios from "axios";

export default function shoes() {
  async function shoes_page(req, res) {
    try {
      const response = await axios.get(process.env.API_ENDPOINT || "https://lelly-99-shoe-api.onrender.com/api/shoes");
      const all_shoes_data = response.data;
      res.render("shoes", { shoes: all_shoes_data });
    } catch (err) {
      console.error("Error", err);
    }
  }

  async function get_brand(req, res) {
    const brandname = req.params.brandname;
    try {
      const response = await axios.get(`${process.env.API_ENDPOINT || "https://lelly-99-shoe-api.onrender.com/api/shoes/brand/" + brandname}`);
      const brand_shoes_data = response.data;
      res.json(brand_shoes_data);
    } catch (err) {
      console.error("Error", err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async function get_size(req, res) {
    const size = req.params.size;
    try {
      const response = await axios.get(`${process.env.API_ENDPOINT || "https://lelly-99-shoe-api.onrender.com/api/shoes/size/" + size}`);
      const size_shoes_data = response.data;
      res.json(size_shoes_data);
    } catch (err) {
      console.error("Error", err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async function get_size_and_brand(req, res) {
    const brandname = req.query.brandname;
    const size = req.query.size;
    try {
      const response = await axios.get(`${process.env.API_ENDPOINT || "https://lelly-99-shoe-api.onrender.com/api/shoes"}/api/shoes/brand/${brandname}/size/${size}`);
      const size_and_brand_shoes_data = response.data;
      res.render("shoes", { shoes: size_and_brand_shoes_data });
    } catch (err) {
      console.error("Error", err);
    }
  }

  async function filterShoes(req, res) {
    const brandname = req.query.brandname;
    const size = req.query.size;

    let apiUrl = process.env.API_ENDPOINT || "https://lelly-99-shoe-api.onrender.com/api/shoes";

    if (brandname) {
      apiUrl += `/brand/${brandname}`;
    }

    if (size) {
      apiUrl += `/size/${size}`;
    }

    try {
      const response = await axios.get(apiUrl);
      const filteredShoesData = response.data;
      res.render("shoes", { shoes: filteredShoesData });
    } catch (err) {
      console.error("Error", err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return {
    shoes_page,
    get_brand,
    get_size,
    get_size_and_brand,
    filterShoes,
  };
}
