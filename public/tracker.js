
function workoutlevel(level){
    if(level=="Beginner"){
        return `<h3>Push-ups (knee or wall): 3 sets of 5 reps</h3>
        <h3>Bodyweight Squats: 3 sets of 8 reps</h3>
        <h3>Plank: Hold for 20 seconds</h3>
        <h3>Bicycle Crunches: 3 sets of 10 reps per side</h3>`
    }
    else if(level=="Intermediate"){
        return `<h3>Push-ups (standard): 3 sets of 10 reps</h3>
        <h3>Bodyweight Squats: 3 sets of 12 reps</h3>
        <h3>Plank: Hold for 30 seconds</h3>
        <h3>Bicycle Crunches: 3 sets of 15 reps per side</h3>`
    }
    else{
        return `<h3>Push-ups (weighted or decline): 4 sets of 12 reps</h3>
        <h3>Bodyweight Squats (with explosive jump): 4 sets of 15 reps</h3>
        <h3>Plank: Hold for 1 minute</h3>
        <h3>Bicycle Crunches: 4 sets of 20 reps per side</h3>`
    }
}

fetch('/getjson')
   .then(response => response.json())
   .then(function(json){
        document.querySelector(".user").innerHTML=`Hi, ${json.username} ! <a href="/" style="text-decoration:none;font-size:1rem;color:black">(Sign Out?)</a>`;
        document.querySelector(".step").innerHTML=`Steps<br>${json.steps[6]}/6000`;
        let stepfloat=(json.steps[6]/60).toFixed(1);
        document.querySelector(".stepper").innerHTML=`${stepfloat}%`;
        $(".stepper").css("--p",`${stepfloat}`);
        //
        document.querySelector(".sleep").innerHTML=`Sleep<br>${json.sleep[6]}/8 HRS`;
        let sleepfloat=(json.sleep[6]/8*100).toFixed(1);
        document.querySelector(".sleepper").innerHTML=`${sleepfloat}%`;
        $(".sleepper").css("--p",`${sleepfloat}`);
        //
        document.querySelector(".calorie").innerHTML=`Calorie Intake<br>${json.calorie[6]}/2500 CAL`;
        let caloriefloat=(json.calorie[6]/2500*100).toFixed(1);
        document.querySelector(".calorieper").innerHTML=`${caloriefloat}%`;
        $(".calorieper").css("--p",`${caloriefloat}`);
        console.log(json);
        //
        document.querySelector("strong").textContent=json.workout;
        document.querySelector(".plancon").innerHTML=workoutlevel(json.workout);
        for(let i=0;i<7;i++){
            $("span").eq(i).css("--data-set",`${((json.steps[i]/60)+(json.sleep[i]/8*100)+(json.calorie[i]/2500*100))/3}/100`);
        }
        let stepsum=0,sleepsum=0,caloriesum=0;
        for(let i=0;i<7;i++){
            stepsum+=json.steps[i];
            sleepsum+=json.sleep[i];
            caloriesum+=json.calorie[i];
        }
        let weekper=(((stepsum/420)+(sleepsum/56*100)+(caloriesum/175))/3).toFixed(1);
        $(".weekpro").css("--p",`${weekper}`);
        $(".weekpro").text(`${weekper}%`);

});

$(".btn").click(function(){
    window.location.href="addinfo.html";
})


