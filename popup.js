document.addEventListener('DOMContentLoaded', function() {
 // console.log('Listening');

 // Tracking entire page
 var parent = document.querySelector('#globalContainer');

 // Checking when making a new post
 parent.addEventListener('click', function(element) {
   if (element.target && element.target.innerText === 'Share') {
     var text = document.querySelector('span[data-text="true"]').innerHTML;
     console.log(element);
     // console.log('Button clicked');
     var xhr = new XMLHttpRequest();
     xhr.open('POST', 'https://api.aylien.com/api/v1/sentiment');
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.setRequestHeader('X-AYLIEN-TextAPI-Application-Key', '5e43d2e7d1bcd986d3e6e0cdea9290a4');
     xhr.setRequestHeader('X-AYLIEN-TextAPI-Application-ID', 'e3a4214c');
     xhr.send(`text=${encodeURIComponent(text)}`);
     xhr.onreadystatechange = function() {
       var DONE = this.DONE || 4;
       if (this.readyState === DONE){
         var parsedResponse = JSON.parse(this.response);
         alert('in our '+ parsedResponse.subjectivity +' opinion, \n we are '
         + parsedResponse.polarity_confidence.toFixed(2)*100 +
         '% confident that your post, \n "' + parsedResponse.text + '" is '
          + parsedResponse.polarity);
       }
     };
     var r = confirm('Make sure you are posting something wholesome!');
     if (!r) {
       element.stopPropagation();
     };
   }
 }, false);

 // Checking when commenting on a post
 parent.addEventListener('keydown', function(key) {
   // console.log(key);
   if (key.keyCode === 13) {
     var text = document.querySelector('span[data-text="true"]').innerHTML;
     // console.log('Button clicked');
     var xhr = new XMLHttpRequest();
     xhr.open('POST', 'https://api.aylien.com/api/v1/sentiment');
     xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
     xhr.setRequestHeader('X-AYLIEN-TextAPI-Application-Key', '5e43d2e7d1bcd986d3e6e0cdea9290a4');
     xhr.setRequestHeader('X-AYLIEN-TextAPI-Application-ID', 'e3a4214c');
     xhr.send(`text=${encodeURIComponent(text)}`);
     xhr.onreadystatechange = function() {
       var DONE = this.DONE || 4;
       if (this.readyState === DONE){
         var parsedResponse = JSON.parse(this.response);
         alert('in our '+ parsedResponse.subjectivity +' opinion, \n we are '
         + parsedResponse.polarity_confidence.toFixed(2)*100 +
         '% confident that your post, \n "' + parsedResponse.text + '" is '
          + parsedResponse.polarity);
       }
     };
     // key.preventDefault();
     // console.log('enter key');
     var r = confirm('Make sure you are posting something wholesome!');
     if (!r) key.stopPropagation();
   }
 }, false);

}, false);
