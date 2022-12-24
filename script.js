const button=document.querySelector("button");
const texts = document.querySelector(".b");

const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");

const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new speechRecognition();

recognition.interimResults=false;
// recognition.continuous=true;
recognition.lang="en-US";

function change(){
    recognition.lang="hi-IN";
}

let p = document.createElement("p");

const speech=new SpeechSynthesisUtterance();
speech.lang="en-US";

function hindi(){
    speech.lang="hi-IN";
}

recognition.onstart = function (){
    console.log("speech recognition started");
};

// console.log(recognition);
var opr=1;

recognition.onresult = function(event){
    console.log(event);
    const spokenwords=event.results[0][0].transcript;
    console.log(spokenwords);
    console.log(opr);

    
    switch(opr){
        case 1: computerspeech(spokenwords);
            break;
        case 2: Speech_to_text(spokenwords);
            break;
        case 3: Search_google(spokenwords);
            break;
        case 4: english_to_hindi(spokenwords);
            break;
        default:
            recognition.stop();
            break;
    }

    // computerspeech(spokenwords);
};


function computerspeech(words){
    // const speech=new SpeechSynthesisUtterance();
    //  speech.lang="en-US";
    speech.pitch=0.9;
    speech.volume=1;
    speech.rate=1;
    // speech.text="how are you";
    if(opr==1){
        if(words.includes("what can you do for me")||words.includes("Uni mate"))
        {
        speech.text="welcome to unimate, dear.... i can do anything";
        }else
        if(words.includes("what is your name")){
            speech.text="my name is unimate,what's your name";
        }else if(words.includes("start speech to text")|| words.includes("start speech to test")){
            speech.text="speech to text started";
            opr=2;
            // recognition.continuous=true;
            recognition.interimResults=true;
            // conti();
        }else if(words.includes("start Google search")){
            speech.text="google search started";
            opr=3;
            // change();
            // hindi();
        }else{
            speech.text=words;
            // searchFormInput.value=words;
        }
    }else if(opr==3){
        speech.text="here some results for you";
        }
        window.speechSynthesis.speak(speech);
}



//voice to text...it gives text as  result on google crome....!!!
function Speech_to_text(spokenwords){
    texts.appendChild(p);
    p.innerText = spokenwords;
}

//voice to search on google and gives result.!!!
function Search_google(spokenwords){
    searchFormInput.value = spokenwords;
    // setTimeout(()=>{
        searchForm.submit();
        computerspeech(spokenwords)
    // },3000)
}


// english to hindi converter
function english_to_hindi(spokenwords){

}


//on speech end what are the operation should start or done... !
speech.onend=()=>{
    if(opr==2){
       
    }else{
    recognition.start();
    }
    document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
};

// recognition on end what are the operation should done.....!!!
recognition.onend=()=>{
    if(opr==0){
        recognition.start();
    }
    if(opr==2)
    { 
        setTimeout(()=>{
            recognition.start()
        },1000)
        document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
        
    }else if(opr==3)
    {
        // setTimeout(()=>{
        //     searchForm.submit() 
        // },3000)
    }
    document.querySelector(".outer").style.background = "#111";
    
}
//on click a button  unimate will start recognising....!!!
button.addEventListener("click",()=>{
    document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
    recognition.start();
});