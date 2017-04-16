/* verbal part */

  var trendingThisWeek = [ 
    "Almanac Tap Room, is a Beer Bar, in Mission District.",
    "Joe & the Juice, is a Juice Bar, in Financial District.",
    "Bon Nene, is a Japanese Restaurant, in Mission District.",
    "Jane the Bakery, is a Bakery, in Fillmore District.",
    "Nightbird, is a Restaurant, in Civic Center"
    ];


var state = "initial"
var slowBreathInc = 0.1
var fastBreathInc = 0.6
var slowTimeBetweenBlinks = 4000
var fastTimeBetweenBlinks = 500

// audio
var audio = new Audio('close.mp3');
function playSound() {
    audio.play();
}


function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    /* Shift + reload = reload without using cache */
    /* Nonverbal actions at the start of listening */
    setTimeBetweenBlinks(fastTimeBetweenBlinks);
    setBreathInc(slowBreathInc);
    setEyeColor("gold");
    speak("hi!!!")

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.lang = "en-US";
    recognition.start();


    recognition.onresult = function(e) {
      document.getElementById('transcript').value
                               = e.results[0][0].transcript;
      var user_said = e.results[0][0].transcript;
      recognition.stop();

      /* Nonverbal actions at the end of listening */
      setTimeBetweenBlinks(slowTimeBetweenBlinks);
      jump(); //perform a nonverbal action from nonverbal.js
      setEyeColor("black");

      var bot_response = decide_response(user_said)
      speak(bot_response)

      // // Play sound effect, and delay 2.5s
      // setTimeout(playSound, 2500)

      //`document.getElementById('labnol').submit();
    };

    recognition.onerror = function(e) {
      recognition.stop();
    }

  }
}

/* decide what to say.
 * input: transcription of what user said
 * output: what bot should say
 */
  function decide_response(user_said) {
    var response;

    var search_re = /search\s(.+)/i;  
    // creating a regular expression
    
    var search_parse_array = user_said.match(search_re) 
    // parsing the input string with the regular expression
    
    console.log(search_parse_array) 
    // let's print the array content to the console log so we understand 
    // what's inside the array.


    if (search_parse_array && state === "initial") {
      response = "ok, searching " + search_parse_array[1] + "Hmm, let's see...... I found!" + trendingThisWeek[Math.floor(Math.random() * trendingThisWeek.length)];
      State = "initial"
    } else if (user_said.toLowerCase().includes("your name")
      || user_said.toLowerCase().includes("what are you")
      || user_said.toLowerCase().includes("who are you")  
      || user_said.toLowerCase().includes("hi")
      || user_said.toLowerCase().includes("how are you")
      || user_said.toLowerCase().includes("hello")) {
      response = "Hi hi hi. I am a just regular cactus living in San Francisco. And I am a tour guide.";
      state = "initial"
    } else if (user_said.toLowerCase().includes("search") && state === "initial") {
      response = "Search which city?";
      state = "selfRepair"
    } else if (user_said.toLowerCase().includes("san francisco") && state === "initial"
      || user_said.toLowerCase().includes("san fran") && state === "initial" 
      || user_said.toLowerCase().includes("san fran") && state === "selfRepair"  
      || user_said.toLowerCase().includes("yes") && state === "ABByes" 
      || user_said.toLowerCase().includes("san francisco") && state === "ABByes" 
      || user_said.toLowerCase().includes("san francisco") && state === "selfRepair") {
      response = "Okay! Searching: San Francisco......aha...... I found!" + trendingThisWeek[Math.floor(Math.random() * trendingThisWeek.length)];
      state = "initial"
    } else if (user_said.toLowerCase().includes("here") 
      || user_said.toLowerCase().includes("city")
      || user_said.toLowerCase().includes("no") && state === "selfRepair"
      || user_said.toLowerCase().includes("no") && state === "ABByes" ) {
      response = "What's the name of city?";
      state = "selfRepair"
    } else if (user_said.toLowerCase().includes("sf") && state === "initial" 
      || user_said.toLowerCase().includes("sf") && state === "selfRepair" ) {
      response = "Do you mean San Francisco?";
      state = "ABByes"
    } else if (user_said.toLowerCase().includes("thanks")
      || user_said.toLowerCase().includes("thank")) {
      response = "Anytime!";
      state = "initial"
    } else if (user_said.toLowerCase().includes("bye")) {
      response = "bye bye!";
      state = "initial"
    } else {
      response = "ummmmmmmmmmmmmm....sorry, try something else?";
    }
    return response;
  }


/* Load and print voices */
function printVoices() {
  // Fetch the available voices.
  var voices = speechSynthesis.getVoices();
  
  // Loop through each of the voices.
  voices.forEach(function(voice, i) {
        console.log(voice.name)
  });
}

printVoices();


/* 
 *speak out some text 
 */
function speak(text, callback) {

  /* Nonverbal actions at the start of robot's speaking */
  setBreathInc(fastBreathInc); 

  console.log("Voices: ")
  printVoices();

  var u = new SpeechSynthesisUtterance();
  u.text = text;
  u.lang = 'en-US';

  u.volume = 1 //between 0.1
  // A float value between 0 and 1 should be specified here. The default is 1.
  
  u.pitch = 0.5 //between 0.0 and 2.0
  // This should be a float value between 0 and 2, with a value of 1 being the default.

  u.rate = 1 //between 0.1 and 5-ish
  // This should be a float value between 0 and 10, the default being 1.

  u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Karen"; })[0]; //pick a voice
  // Voice that sounds like Lego: Ellen, Fred (a little bit retarded), Kathy, Maged, Princess, Trinoids, Whisper, Zarvox, 


  u.onend = function () {
      
      /* Nonverbal actions at the end of robot's speaking */
      setBreathInc(slowBreathInc); 

      if (callback) {
          callback();
      }
  };

  u.onerror = function (e) {
      if (callback) {
          callback(e);
      }
  };

  speechSynthesis.speak(u);
}
