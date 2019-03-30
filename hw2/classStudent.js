const eventEmiter = require('events');

class Student extends eventEmiter {
    constructor(firstName, lastName, year) {
        super();
        this.firsName = firstName;
        this.lastName = lastName;
        this.year = year;
        this.timer = null;

        this.markAttendance = Array.from(Array(12), () => ({attendance: null, mark: null}));

        this.on('getAge', () => {
            this.emit('setAge', new Date().getFullYear() - this.year);
            this.setTimer();
        });

        this.on('present', () => {
            let record = this.markAttendance.findIndex(el => el.attendance === null);
            this.markAttendance[record].attendance = true;
            this.emit('setPresence', this.markAttendance[record])
            this.setTimer();
        });

        this.on('setMark', (marks) => {
            let record = this.markAttendance.findIndex(el => {
                    return el.mark == null && el.attendance
                }
            );
            record === -1 ? console.log('this student has no attendance, or he is closed for adding marks') :
                this.markAttendance[record].mark = marks;
            this.emit('setAttendance', this.markAttendance[record]);
            this.setTimer();

        });

        this.on('averageMark', () => {
            let averageMark = this.markAttendance.reduce((i, v) => i + v.mark, 0);
            this.emit('showAverage', averageMark / this.markAttendance.length)
        });

        this.emit('created', setTimeout(() => {
            console.log('created')
        }, 0));

    }

    setTimer() {
        if (this.timer) {
            clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
            this.emit('check')
        }, 10000);
    }

}

module.exports ={
    Student
};
