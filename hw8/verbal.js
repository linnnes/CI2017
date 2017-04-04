/* verbal part */
var state = "initial"
var slowBreathInc = 0.1
var fastBreathInc = 0.6
var slowTimeBetweenBlinks = 4000
var fastTimeBetweenBlinks = 500

function startDictation() {

  if (window.hasOwnProperty('webkitSpeechRecognition')) {

    var recognition = new webkitSpeechRecognition();

    /* Nonverbal actions at the start of listening */
    setTimeBetweenBlinks(fastTimeBetweenBlinks);
    setBreathInc(slowBreathInc);
    setEyeColor("red");

    speak("hello hello hello my name is Lego")

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
  var play_re = /play\s(.+)/i;  // creating a regular expression
  var play_parse_array = user_said.match(play_re) // parsing the input string with the regular expression
  
  console.log(play_parse_array) // let's print the array content to the console log so we understand 
                                // what's inside the array.

  if (play_parse_array && state === "initial") {
    response = "ok, playing " + play_parse_array[1];
  } else if (user_said.toLowerCase().includes("play") && state === "initial") {
    response = "Play who?";
    state = "play_song"
  } else if (user_said.toLowerCase().includes("bye")) {
    response = "good bye to you!";
    state = "initial"
  } else if (state === "play_song") {
    response = "ok, playing " + user_said;
    state = "initial"
  } else {
    response = "i don't get it";
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
  
  u.pitch = 0.9 //between 0.0 and 2.0
  // This should be a float value between 0 and 2, with a value of 1 being the default.

  u.rate = 0.7 //between 0.1 and 5-ish
  // This should be a float value between 0 and 10, the default being 1.

  u.voice = speechSynthesis.getVoices().filter(function(voice) { return voice.name == "Kathy"; })[0]; //pick a voice
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
