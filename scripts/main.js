const users = [
    { username: "hermes", usermail: "olihomatabishihermes@gmail.com", password: "1234" },
    { username: "George", usermail: "byonageorge@gmail.com", password: "abcd" },
    { username: "Jean-baptiste", usermail: "jeanbaptisteyvesmulumeoderhwa@gmail.com", password: "1234" },
];

document.querySelector("#login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.querySelector("#username").value;
    const usermail = document.querySelector("#usermail").value;
    const password = document.querySelector("#password").value;

    const user = users.find(e => e.username.toLowerCase() === username && e.usermail === usermail && e.password === password);

    if (user) {
        window.location.href = "dashboard.html";
    } else {
        document.querySelector("#error").style.display = "block";
    }
});




