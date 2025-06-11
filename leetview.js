document.addEventListener("DOMContentLoaded",function(){
    let searchbutton=document.getElementById("searchbutton");
    let inputusername=document.getElementById("inputusername");
    let statscontainer=document.querySelector(".statscontainer");
    let easyprogress=document.querySelector(".easyprogress");
    let mediumprogress=document.querySelector(".mediumprogress");
    let hardprogress=document.querySelector(".hardprogress");
    let easylabel=document.getElementById("easylabel");
    let mediumlabel=document.getElementById("mediumlabel");
    let progress=document.querySelector(".progress");
    let hardlabel=document.getElementById("hardlabel");
    let cardcontainer=document.querySelector(".cardcontainer");
    function isvalid(username){
        if(username.trim()==""){
            alert("Invalid username input");
            return false;
        }
        let regex=/^(?![_-])[a-zA-Z0-9_-]{4,15}(?<![_-])$/;
        let ismatching=regex.test(username);
        if(!ismatching){
            alert("Invalid username");
        }
        return ismatching;

    }
    function updateprogress(total,solved,label,circle,s){
        let progress=(solved/total)*100;
        circle.style.setProperty("--progressdegree",`${progress}%`);
        label.innerHTML=`<p>${solved}/${total}</p>`+s;
        circle.addEventListener("mouseover",function(){
            label.innerHTML=`${Math.floor(progress)}%`;
        })
        circle.addEventListener("mouseout",function(){
            label.innerHTML=`<p>${solved}/${total}</p>`+s;
        })
    }
    function displayuserdata(data){
        let totalquestions=data.totalQuestions;
        let totaleasy=data.totalEasy;
        let totalmedium=data.totalMedium;
        let totalhard=data.totalHard;
        let totalsolved=data.totalSolved;
        let easysolved=data.easySolved;
        let mediumsolved=data.mediumSolved;
        let hardsolved=data.hardSolved;
        let totalsubmissions=data.totalSubmissions[0].count;
        let easysubmissions=data.totalSubmissions[1].count;
        let mediumsubmissions=data.totalSubmissions[2].count;
        let hardsubmissions=data.totalSubmissions[3].count;
        updateprogress(totaleasy,easysolved,easylabel,easyprogress,"Easy");
        updateprogress(totalmedium,mediumsolved,mediumlabel,mediumprogress,"Medium");
        updateprogress(totalhard,hardsolved,hardlabel,hardprogress,"Hard");
        cardcontainer.innerHTML=`<p>Total Questions Solved:${totalsolved}/${totalquestions}</p><p>Total Submissions:${totalsubmissions}</p><p>Easy Submissions:${easysubmissions}</p><p>Medium Submissions:${mediumsubmissions}</p><p>Hard Submissions:${hardsubmissions}</p>`;
        
        // cardcontainer.innerHTML=`<p>Total Submissions:${totalsubmissions}</p><p>Hard Submissions:${hardsubmissions}</p>`;
        // cardcontainer.innerHTML=`<p>Easy Submissions:${easysubmissions}</p>`;
        // cardcontainer.innerHTML=`<p>Medium Submissions:${mediumsubmissions}</p>`;
        // cardcontainer.innerHTML=`<p>Hard Submissions:${hardsubmissions}</p>`;
    }
    async function fetchuserdetails(username){
        let url=`https://leetcode-api-faisalshohag.vercel.app/${username}`;
        try{
            searchbutton.textContent="Searching...";
            searchbutton.disabled=true;
            searchbutton.style.setProperty("background-color","#bdbdbd");
            let response=await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the data from the url");
            }
            let data=await response.json();
            console.log("logging data",data);
            
            progress.style.setProperty("display","flex");

            displayuserdata(data);
        }
        catch(error){
            statscontainer.innerHTML="<p>Data not Found</p>";
            cardcontainer.innerHTML="";
        }
        finally{
            searchbutton.textContent="Search";
            searchbutton.disabled=false;
            searchbutton.style.setProperty("background-color","rgb(7, 97, 242)")
        }
    }
    searchbutton.addEventListener("click",function(){
        let username=inputusername.value;
        if(isvalid(username)){
            fetchuserdetails(username);
        }
    })

})