// initialising variables
var time = 30
var liflines = 10
var ans
var operations = ["+", "-", "*"]
// showing the content to the screen
function show() {
    setInterval(() => {
        time -= 1
        document.getElementById('time').innerHTML = time
    }, 1000)
    liflines = localStorage.getItem("lifelines") || 10
    localStorage.setItem("lifelines", liflines)
    document.getElementById("lifeline").innerHTML = localStorage.getItem("lifelines") || 10
    var first = Math.ceil(Math.random() * 50) + 1
    var sec = Math.ceil(Math.random() * 50) + 1
    var op = Math.floor(Math.random() * 3)
    document.getElementById("firstNum").innerHTML = first
    document.getElementById("secondNum").innerHTML = sec
    document.getElementById("operation").innerHTML = operations[op]
    ans = `${first} ${operations[op]} ${sec}`
    console.log(eval(ans));
}
show()
// checkinng the submitted answer
function check(ans) {
    if (liflines > 0) {
        if (time > 0) {

            if (document.getElementById("answer").value.length > 0) {
                if (document.getElementById("answer").value == ans) {
                    alert("Correct")
                    liflines = Number(liflines) + 1
                    localStorage.setItem("lifelines", liflines)
                    location.reload()
                }
                else {
                    alert("Wrong")
                    liflines -= 1
                    localStorage.setItem("lifelines", liflines)
                    location.reload()
                }
            }
            else {
                alert("Type something")
            }
        }
        else {
            alert("Time Over")
        }
    }
    else {
        alert("No More lifelines Get some by watching ad")
    }
}
// adding skip functionality
function skip() {
    if (liflines > 0) {
        liflines -= 1
        localStorage.setItem("lifelines", liflines)
        location.reload()
    }
    else {
        alert("No More lifelines Get some by watching ad")
    }
}
// upgrading lifeline by shoing ad
function upd() {
    let timerInterval
    Swal.fire({
        title: 'Dont Close',
        html: 'You will be rewarded in <b></b> seconds.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft() / 1000
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            localStorage.setItem("lifelines", 10)
            console.log('I was closed by the timer')
            location.reload()
        }
    })
}
// checking over time
function checkTime() {
    if (time <= 0) {
        time = 30
        alert("Time Over")
        location.reload()
    }
}
setInterval(checkTime, 1000)