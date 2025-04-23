import https from 'https';
import fetch from 'node-fetch';

class UsersController {
    async createUsers(req, res) {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const response = await fetch("https://localhost:7071/api/Usuarios", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req.body),
            agent,
        });

        const data = await response.json();
        return res.status(response.status).json(data);
    }
}

export default new UsersController();
