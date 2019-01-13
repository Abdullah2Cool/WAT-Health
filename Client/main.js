let app;
app = new Vue({
    el: '#app',
    created: () => {
        var config = {
            apiKey: "AIzaSyCqCxRtzKWLsmaZ0uhDNEHk4ngMhbaYQPE",
            authDomain: "wat-help.firebaseapp.com",
            databaseURL: "https://wat-help.firebaseio.com",
            projectId: "wat-help",
            storageBucket: "wat-help.appspot.com",
            messagingSenderId: "1025794252290"
        };
        firebase.initializeApp(config);
    },
    mounted: () => {
        firebase.auth().onAuthStateChanged((user) => {
            console.log("HERE");
            if (user) {
                console.log(user);
            } else {
                // redirect to sign in page
            }
        })
    },
    data: {
        email: "",
        password: "",
        message: "Hello World!"
    },
    methods: {
        signIn: () => {
            // console.log(firebase);
            if (this.email && this.email !== "" && this.email.contains("@") && this.password !== "") {
                contole.log(`Trying to sign in.`);
                firebase.auth().signInWithEmailAndPassword(this.email, this.password).catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    if (errorCode === "auth/wrong-password") {
                        alert("Wrong Password.");
                    } else {
                        alert(errorMessage);
                    }
                    console.log(error);
                    console.log("Finished Signing In");
                    // ...
                });
            } else {
                console.log("Invalid input");
            }
            return false;
        }
    }
});
