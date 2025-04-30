class ReservationsController {
  async create(req, res) {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    const response = await fetch("http://localhost:3001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log(data);

    return res.status(response.status).json(data);
  }

  async findOne(req, res) {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    const response = await fetch(
      `http://localhost:3001/reservations/${req.params.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  }

  async findAll(req, res) {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    const response = await fetch("http://localhost:3001/reservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  }

  async update(req, res) {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    const response = await fetch(
      `http://localhost:3001/reservations/${req.params.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
        body: JSON.stringify(req.body),
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  }

  async delete(req, res) {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    const response = await fetch(
      `http://localhost:3001/reservations/${req.params.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token,
        },
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  }
}

export default new ReservationsController();
