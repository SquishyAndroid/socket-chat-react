import axios from 'axios';
import copy from 'clipboard-copy';

exports.getLinkToShare = () => {
	let pathName = window.location.pathname;
	let pathArray = pathName.substring(1).split("/");
	let [referrer, room] = pathArray;
	axios.get("/v1/utils/shortener", {
		params: { referrer, room }
	})
		.then((res) => {
			copy(res.data);
		})
		.catch((err) => {
			console.log(err);
		})
}

exports.bookmarkChat = () => {
	let fullPath = window.location.pathname;
	let roomName = fullPath.split('/').pop();
	localStorage.setItem("BookmarkedRoom", roomName);
}

exports.removeBookmark = () => {
	localStorage.removeItem("BookmarkedRoom");
}