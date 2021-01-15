import axios from 'axios';


class Currency {
    static async createProxy(req, res) {
        try {
        const {base, currency } = req.query;
        console.log("req",req.query);
        const BaseUrl = `https://api.exchangeratesapi.io/latest?base=${base}`;
        const resp = await axios.get(BaseUrl);
            const result = resp.data.rates;
            console.log("result",result)
        if(result){
        const currencyParams = currency.split(',');
        const allowed = currencyParams;

        const filtered = Object.keys(result)
        .filter(key => allowed.includes(key))
        .reduce((obj, key) => {
            obj[key] = result[key];
            return obj;
        }, {});

        console.log("filt",filtered);

        return res.status(200).send({
            "results": {
                "base": `${base}`,
                "date": new Date(),
                "rates": filtered
            }
        })
        } else{
            return res.status(503).send({
                "message": "Something went wrong"
            })
        }
    } catch(e){
        console.log("err", e)
        return res.status(500).send({
            "error": e
        })
    }

    }
}

export default Currency
