$(function () {
    var user_email = '';
    var database = firebase.database();
    var checkout = document.getElementById('checkout');
    var Today = new Date();
    firebase.auth().onAuthStateChanged(function () {
        var menu = document.getElementById('dynamic-menu');
        // Check user login

            firebase.database().ref('users/' + firebase.auth().currentUser.uid).on('value', function (snapshot) {
                console.log('intofunction');
                var User_Name = snapshot.val().user_name;
                var Product1_Q = snapshot.val().user_score;
                var shoppinghistory1 = document.getElementById('Product1History');
                var year = snapshot.val().Year;
                var month = snapshot.val().Month;
                var day = snapshot.val().Day;
                var hours = snapshot.val().Hours;
                var minutes = snapshot.val().Minutes;
                var seconds = snapshot.val().Seconds;
                var month1 = month+1;
                if (hours < 10)
                  hours = '0' + hours;
                if (minutes < 10)
                  minutes = '0' + minutes;
                if (seconds < 10)
                  seconds = '0' + seconds;
                if (Product1_Q != 0) {
                  shoppinghistory1.innerHTML = 'your score is' + Product1_Q;
                console.log('finish');
                }
              });
              checkout.addEventListener('click', function () {
                if (Product1_Quantity !== 0) {
                  console.log('buy sth');
                  writeUserData();
                }
                else{
                  console.log('buy nothing');
                }
              });
    });
    function writeUserData() {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid).set({
            user_name: 'anonymity',
            user_score: Product1_Quantity,
            Year: Today.getFullYear(),
            Month: Today.getMonth()+1,
            Day: Today.getDate(),
            Hours: Today.getHours(),
            Minutes: Today.getMinutes(),
            Seconds: Today.getSeconds()
        });
    }
    });