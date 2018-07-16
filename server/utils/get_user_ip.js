const axios = require('axios');

async function getUserIP(socket) {
	let ip_array = ["23.21.95.148", "199.83.221.235", "199.83.221.235"];
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        if (ip_array.indexOf(response.data.ip) < 0)
			socket.disconnect();
    } catch (error) {
        console.error(error);
    }
}

module.exports = getUserIP;