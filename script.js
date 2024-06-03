class CountdownTimer {
    constructor({ selector, backgroundColor = null, foregroundColor = null, id }) {
        this.selector = selector;
        this.backgroundColor = backgroundColor;
        this.foregroundColor = foregroundColor;
        this.id = id

        let clock = document.createElement('div');
        clock.id = `clock${this.id}`
        clock.classList.add('clock');
        document.body.appendChild(clock);
        // make divs for frontend
        this.refs = {
            days: document.createElement('p'),
            hours: document.createElement('p'),
            mins: document.createElement('p'),
            secs: document.createElement('p'),
        };
        this.refs.days.id = `day${this.id}`
        this.refs.hours.id = `hour${this.id}`
        this.refs.mins.id = `min${this.id}`
        this.refs.secs.id = `sec${this.id}`

        this.refs.days.classList.add('time');
        this.refs.hours.classList.add('time');
        this.refs.mins.classList.add('time');
        this.refs.secs.classList.add('time');

        document.getElementById(`clock${this.id}`).appendChild(this.refs.days);
        document.getElementById(`clock${this.id}`).appendChild(this.refs.hours);
        document.getElementById(`clock${this.id}`).appendChild(this.refs.mins);
        document.getElementById(`clock${this.id}`).appendChild(this.refs.secs);
    }


    getTimeInput () {
        let days = document.getElementById("myDays").value;
        let hours = document.getElementById("myHours").value;
        let mins = document.getElementById("myMinutes").value;
        let secs = document.getElementById("mySeconds").value;
        if ((hours <= 24) & (hours >= 0) & (mins >= 0) & (secs >= 0) & (mins <= 60) & (secs <= 60)){
            return {
                days,
                hours,
                mins,
                secs,
            };
        }
        else {
            return 0;
        }
    }

    updateTimer({ days, hours, mins, secs }) {
        let x = this.id
        document.getElementById(`day${x}`).innerHTML = days;
        document.getElementById(`hour${x}`).innerHTML = hours;
        document.getElementById(`min${x}`).innerHTML = mins;
        document.getElementById(`sec${x}`).innerHTML = secs;
    }

    changeTime({days, hours, mins, secs}) {
        days *= 24 * 60 * 60
        hours *= 60 * 60
        mins *= 60
        secs *= 1
        let totalSecs = days + hours + mins + secs;
        totalSecs -= 1;
        days = Math.floor(totalSecs / (60 * 60 * 24));
		hours = Math.floor((totalSecs / (60 * 60)) % 24);
		mins = Math.floor((totalSecs / 60) % 60);
		secs = Math.floor(totalSecs % 60);

        return {
            totalSecs,
			days,
			hours,
			mins,
			secs,
		};
    }

    startTimer() {
		let timer = this.getTimeInput();
        if (timer === 0) {
            alert("Invalid input");
            return;
        }
		this.updateTimer(timer);
		this.interval = setInterval(() => {
			timer = this.changeTime(timer);
			this.updateTimer(timer);
            if (!timer.totalSecs) {
                clearInterval(this.interval);
                document.getElementById(`clock${this.id}`).style.backgroundColor = 'Grey';
                alert(`Timer ${this.id} is over`);
            }
            console.log(timer)
		}, 1000);
	}
}