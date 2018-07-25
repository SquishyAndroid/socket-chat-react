import axios from 'axios';
import copy from 'clipboard-copy';
import { Position, Toaster, Intent } from "@blueprintjs/core";

const AppToaster = Toaster.create({
    position: Position.TOP
});

exports.showToast = (message, intent) => {
	AppToaster.show({
		message: message,
		intent: intent,
		timeout: 3000
	})
}

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
	AppToaster.show({
		message: "Chat bookmarked!",
		intent: Intent.SUCCESS
	})
}

exports.removeBookmark = () => {
	localStorage.removeItem("BookmarkedRoom");
	AppToaster.show({
		message: "Chat bookmark removed!",
		intent: Intent.SUCCESS
	})
}
