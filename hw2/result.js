const {Student} = require('./classStudent.js')

global.student = () => {
const St = new Student('vasya', 'pupkin', 1982);

St.once('setAge', (age) => {
    console.log('Age', age)
});
St.emit('getAge');

St.on('setPresence', (presence) => {
    console.log(presence)
});
St.emit('check');
St.emit('present');
St.emit('present');
St.emit('present');
St.emit('present');
St.emit('present');
St.emit('check');
St.on('setAttendance', (att) => {
    console.log(att)
});

St.emit('setMark', 10);
St.emit('setMark', 10);
St.emit('setMark', 10);

St.on('showAverage',(mark)=>{
    console.log('average',mark)
});
St.emit('averageMark');

St.on('check',()=>{
    console.log('timeout')
});

};