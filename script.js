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
                    liflines = Number(liflines) + 1
                    localStorage.setItem("lifelines", liflines)
                    Swal.fire('Correct Answer', '', 'success').then(()=>{
                        location.reload()
                    })
                }
                else {
                    liflines -= 1
                    localStorage.setItem("lifelines", liflines)
                    Swal.fire('Wrong', `The Correct answer was ${eval(ans)}`, 'error').then(()=>{
                        location.reload()
                    })
                }
            }
            else {
                Swal.fire('Type Something', '', 'info')
            }
        }
        else {
            Swal.fire('Time is Over', '', 'info')
        }
    }
    else {
        Swal.fire('Life Lines Finished', 'Got no more Life line Get some by watching ad', 'info')
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
        Swal.fire('Life Lines Finished', 'Got no more Life line Get some by watching ad', 'info')

    }
}
// upgrading lifeline by shoing ad
function upd() {
    if (liflines < 6) {
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
                Swal.fire('+10', 'Life line increased successfully', 'success').then(() => {
                    location.reload()
                })
            }
        })
    }
}
// checking over time
function checkTime() {
    if (time <= 0) {
        time = 30
        Swal.fire('Time is Over', '', 'info').then(() => {
            location.reload()
        })
    }
}
setInterval(checkTime, 1000)