const clock = document.querySelector('.clock-text');
const ulDate = document.querySelector('.ul-date');
const ulStart = document.querySelector('.ul-start');
const ulEnd = document.querySelector('.ul-end');
const ulDuration = document.querySelector('.ul-total-time')
const setStartBtn = document.querySelector('.btn-start-time');
const setEndBtn = document.querySelector('.btn-end-time');
let startTime;
let endTime;

function currentDate(date) {
    return date.toLocaleDateString('en');
}

function currentTime(date) {
    return date.toLocaleTimeString('pt-BR', {
        hour12: false
    });
}

function setTimeOnScreen() {
    const time = setInterval(function() {
        clock.innerText = currentTime(new Date());
    }, 1000);
}

function createLi() {
    const li = document.createElement('li');
    return li;
}

function setDate(date) {
    const li = createLi();
    li.innerText = date;
    ulDate.appendChild(li);
}

function setStartTime(date) {
    const li = createLi();
    li.innerText = date;
    ulStart.appendChild(li);
}

function setEndTime(date) {
    const li = createLi();
    li.innerText = date;
    ulEnd.appendChild(li);
}

function timeCalc(time) {
    const date = new Date(time);
    return date.toLocaleTimeString('pt-BR', {
        hour12: false,
        timeZone: 'GMT'
    });
}

function setTimeDuration(time) {
    const li = createLi();
    li.innerHTML = time;
    ulDuration.appendChild(li);
}

function getDateTime() {
    startTime = Date.parse(new Date());
}

function test() {
    const starts = localStorage.getItem('start times');
    const startList = JSON.parse(starts);
    let lastStart = (startList.slice(-1));

    const dates = localStorage.getItem('dates');
    const dateList = JSON.parse(dates);
    let lastDate = (dateList.slice(-1));

    let time = lastDate[0] + '' + ',' + '' + lastStart[0];

    return Date.parse(time);
}

function getDateTimeEnd() {
    endTime = Date.parse(new Date());
}

setStartBtn.addEventListener('click', function(){
    setDate(currentDate(new Date()));
    setStartTime(currentTime(new Date()));
    getDateTime();
    saveDate();
    saveStartTime();
    console.log(test());
})

setEndBtn.addEventListener('click', function() {
    setEndTime(currentTime(new Date()));
    getDateTimeEnd();
    setTimeDuration(timeCalc(endTime - test()));
    saveEndTime();
    saveDuration();
})

function saveDate() {
    const liDate = ulDate.querySelectorAll('li');
    const dateList = [];

    for (let date of liDate) {
        let liDateText = date.innerText;
        dateList.push(liDateText);
    }

    const datesJSON = JSON.stringify(dateList);
    localStorage.setItem('dates', datesJSON);
}

function saveStartTime() {
    const liStart = ulStart.querySelectorAll('li');
    const startList = [];

    for (let start of liStart) {
        let liStartText = start.innerText;
        startList.push(liStartText);
    }
    const startJSON = JSON.stringify(startList);
    localStorage.setItem('start times', startJSON);
}

function saveEndTime() {
    const liEnd = ulEnd.querySelectorAll('li');
    const endList = [];

    for (let end of liEnd) {
        let liEndText = end.innerText;
        endList.push(liEndText);
    }
    const endJSON = JSON.stringify(endList);
    localStorage.setItem('end list', endJSON);
}

function saveDuration() {
    const liDuration = ulDuration.querySelectorAll('li');
    const durationList = [];

    for (let duration of liDuration) {
        let liDurationText = duration.innerText;
        durationList.push(liDurationText);
    }
    const durationJSON = JSON.stringify(durationList);
    localStorage.setItem('duration', durationJSON);
}


function setSavedDate() {
    const dates = localStorage.getItem('dates');
    const dateList = JSON.parse(dates);

    for (let date of dateList) {
        setDate(date);
    }
}

function setSavedStart() {
    const starts = localStorage.getItem('start times');
    const startList = JSON.parse(starts);

    for (let start of startList) {
        setStartTime(start);
    }
}

function setSavedEnd() {
    const ends = localStorage.getItem('end list');
    const endList = JSON.parse(ends);

    for (let end of endList) {
        setEndTime(end);
    }
}

function setSavedDuration() {
    const durations = localStorage.getItem('duration');
    const durationList = JSON.parse(durations);

    for (let duration of durationList) {
        setTimeDuration(duration);
    }
}

setTimeOnScreen();
setSavedDate();
setSavedStart();
setSavedEnd();
setSavedDuration();

