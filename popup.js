//function to convert unixTime to human readable
function unixToHumanReadableTime(unixTime) {
    const milliseconds = unixTime * 1000 // 1575909015000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15
    return humanDateFormat;
}

//converts millisecond to HH:MM:SS
function convertHMS(value) {
    const sec = parseInt(value, 10); // convert value to number if it's string
    let hours = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
    return hours + ':' + minutes + ':' + seconds; // Return is HH : MM : SS
}

document.addEventListener('DOMContentLoaded', async () => {


    //Personal details


    const list = document.getElementById('list');
    const fullName = document.getElementById('fullName');
    const CF_id = document.getElementById('CF-id');
    fetch('https://codeforces.com/api/user.info?handles=picnic_1209')
        .then(res => {
            return res.json();
        })
        .then(users => {
            //console.log(users);
            const firstName = users.result[0].firstName;
            const lastName = users.result[0].lastName;
            const CFHandle = users.result[0].handle;
            const rating = users.result[0].rating;
            const maxRating = users.result[0].maxRating;
            const maxRank = users.result[0].maxRank;

            //add the user info to the html container
            const nameStr = `<div class = "name"> ${firstName + " " + lastName}  </div>`
            fullName.innerHTML = nameStr;
            const handleStr = `<div class = "name"> ${CFHandle} </div>`
            CF_id.innerHTML = handleStr;

            const ratingStr = `<div class = "listItem"> Current Rating: ${rating} </div>`;
            const maxRatingStr = `<div class = "listItem">Maximum Rating: ${maxRating} </div>`;
            const rankStr = `<div class = "listItem">Maximum Rank: ${maxRank} </div>`;
            const fstr = ratingStr + " " + maxRatingStr + " " + rankStr;
            //console.log(fstr);
            list.innerHTML = fstr;

        })
        .catch(er => console.log(er));


    /*--------------------------------------------------------------------------------*/


    //upcoming contests


    fetch('https://codeforces.com/api/contest.list?gym=false')
        .then(res => {
            return res.json();
        })
        .then(contests => {
            const contestList = document.getElementById('contestList');
            let futureContests = [];
            //console.log(contests);
            contests.result.forEach(contest => {
                if (contest.phase === "BEFORE") {
                    futureContests.push([contest.durationSeconds, contest.name, contest.startTimeSeconds]);
                }
            });
            //console.log(futureContests);
            futureContests.sort(function (x, y) {
                const xtime = unixToHumanReadableTime(x[2]);
                const ytime = unixToHumanReadableTime(y[2]);
                if (xtime < ytime) {
                    return -1;
                }
                if (xtime > ytime) {
                    return 1;
                }
                return 0;
            });
            const newTable = futureContests.map(contest => {
                const startTimeReadable = unixToHumanReadableTime(contest[2]);
                const timeReadable = convertHMS(contest[0])

                return `<tr>
                <th>${contest[1]}</th>
                <th>${startTimeReadable} </th>
                <th>${timeReadable}</th>
              </tr> `
            }).join('');
            let tableCode = `
            <tr>
            <th>Name</th>
            <th>Start Time</th>
            <th>Duration</th>
          </tr> `;
            tableCode += newTable;
            contestList.innerHTML = tableCode;
        })
        .catch(er => console.log(er));

    /*--------------------------------------------------------------------------------*/
    //Questions suggestions

    const questionButton = document.getElementById('questionButton');

    questionButton.addEventListener('click', function(){
        console.log("inside Button");
        const tag = document.getElementById('questionKeyword').value.toLowerCase();
        fetch(`https://codeforces.com/api/problemset.problems?tags=${tag}`)
        .then(res => {
            return res.json();
        })
        .then(questions => {
            console.log(questions);
            //rating range
            let questionList = [];
            questions.result.problems.forEach(problem => {
                if (problem.rating <= 1800 &&  problem.rating >= 1600) {
                    questionList.push([problem.contestId, problem.index, problem.name, problem.rating]);
                }
            });

            if(questionList.length>3){
                questionList = questionList.slice(0, 3);
            }
            //console.log(questionList);

            const questionListHTML = document.getElementById('questionList');
            //add it to the div
            const newQuesTable = questionList.map(question => {

                return `<tr>
                <th>${question[2]}</th>
                <th><a target="_blank" href="https://codeforces.com/problemset/problem/${question[0]}/${question[1]}">Solve It!!</a> </th>
                <th>${question[3]}</th>
              </tr> `
            }).join('');
            let tableCode = `
            <table class="table table-striped" id="questionsListTable">
            <tr>
            <th>Name</th>
            <th>Link</th>
            <th>Rating</th>
          </tr> `;
            tableCode += newQuesTable;
            tableCode+=`</table>`;
            questionListHTML.innerHTML = tableCode;

        })
        .catch(er => console.log(er));

    });


})


