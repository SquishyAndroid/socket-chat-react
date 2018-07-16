const moment = require('moment');

exports.generateMessage = (from, text, imageData, sessionId) => {
	return {
		from,
		text,
		imageData,
		createdAt: moment().valueOf(),
		sessionId: sessionId
	};
};