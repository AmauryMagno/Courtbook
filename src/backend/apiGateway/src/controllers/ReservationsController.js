import https from "https";
import axios from "axios";

const agent = new https.Agent({
  rejectUnauthorized: false,
});
class ReservationsController {
  async create(req, res) {
    const token = req.headers["authorization"] || req.headers["Authorization"];
    const response = await fetch("http://localhost:3001/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
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
          Authorization: token,
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
        Authorization: token,
      },
    });

    const data = await response.json();

    await Promise.all(
      data.map(async (reservation, index) => {
        const responseUser = await axios.get(
          `https://localhost:7071/api/Usuarios/${reservation.userId}`,
          {
            httpsAgent: agent,
            headers: {
              Authorization: token,
            },
          }
        );

        const user = await responseUser.data;

        const responseCourt = await axios.get(
          `https://localhost:7071/api/Quadras/${reservation.courtId}`,
          {
            httpsAgent: agent,
            headers: {
              Authorization: token,
            },
          }
        );

        const court = await responseCourt.data;

        data[index] = {
          ...reservation,
          court,
          user,
        };
      })
    );

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
          Authorization: token,
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
          Authorization: token,
        },
      }
    );

    const data = await response.json();
    return res.status(response.status).json(data);
  }
}

export default new ReservationsController();
