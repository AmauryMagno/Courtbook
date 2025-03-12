
class ReservationsController {
    async create(req,res){
        const response = await fetch("http://localhost:3001/reservations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body),
          });

          const data = await response.json()
          return res.status(201).json(data);
    }
}

export default new ReservationsController()