let app;

app = new Vue({
    el: '#app',
    data: {
        msg: "Hello Hackathon",
        posts: []
    },
    methods: {
        getPosts() {
            console.log("Getting posts...");
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(json => {
                    this.posts = json;
                    console.log(json[0]);
                });
        }
    }
})