const checkTime = (arrayTime, day) => {
	let hour = day.getHours();
	if (hour < 10) hour = '0' + hour;
	let minutes = day.getMinutes();
	if (minutes < 10) minutes = '0' + minutes;
	const _time = parseInt(hour + '' + minutes);
	if (Array.isArray(arrayTime)) {
		if (arrayTime.length > 0) {
			for (let i = 0; i < arrayTime.length; i++) {
				if (i % 2 !== 0) {
					if (_time < parseInt(arrayTime[i]) && _time > parseInt(arrayTime[i - 1])) return true;
				}
			}
		} else{
			return 'no-register'
		}
	}
	return false;
};

export default function placeOpen(time) {
	if (time) {
		const d = new Date();
		if(!time[d.getDay()].open) return false;
		const chk = checkTime(time[d.getDay()].time, d);
		if(chk === 'no-register') return 'no-register'
		if (time[d.getDay()].open && chk) return true;
	}
	return false;
}
