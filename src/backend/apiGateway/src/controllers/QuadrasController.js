import https from 'https';
import fetch from 'node-fetch';

class QuadrasController {
    async createQuadras(req, res) {
        const agent = new https.Agent({
            rejectUnauthorized: false,
        });

        const token = req.headers.authorization;
        try{
            const response = await fetch("https://localhost:7071/api/Quadras/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify(req.body),
                agent,
            });
            
            if(!response){
                const errorText = await response.text();
                console.error('Erro na API externa:', response.status, errorText);
                return res.status(response.status).send(errorText);
            }
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Erro na API externa:', response.status, errorText);
                return res.status(response.status).send(errorText);
            }
    
            const data = await response.json();
            return res.status(response.status).json(data);

        } catch (error){
            console.error('Erro ao coenctar com a API .NET:', error.message);
            return res.status(500).json({message: "Erro na conexão com a API externa .NET", detalhes: error.message})
        }
    }
}

export default new QuadrasController();
