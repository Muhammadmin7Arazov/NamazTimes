$(document).ready(function () {

    $('#getMonthTime').on('click', function (e) {
        e.preventDefault();
        $("tbody").html("");
        monthInput = $("#months").val().slice(5, 8);
        let month = monthInput.startsWith("0") ? monthInput.slice(1, 2) : monthInput;
        if (monthInput=="") {
            Swal.fire({
                icon: 'error',
                text: 'Please enter a valid date!'
            })
            return;
        }

        $.ajax({
            url: `https://api.aladhan.com/v1/calendar/2023?latitude=40.37767&longitude=49.89201&method=2`,
            method: "get",
            success: function (datas) {
                let months = datas.data[month];
                console.log(months);
                months.forEach((month, index) => {
                    let monthlyPrayerTimes = `
                    <tr>
                        <td class="tg-times">${index + 1}</td>
                        <td class="tg-times">${month.timings.Fajr.slice(0, 6)}</td>
                        <td class="tg-times">${month.timings.Sunrise.slice(0, 6)}</td>
                        <td class="tg-times">${month.timings.Dhuhr.slice(0, 6)}</td>
                        <td class="tg-times">${month.timings.Asr.slice(0, 6)}</td>
                        <td class="tg-times">${month.timings.Maghrib.slice(0, 6)}</td>
                        <td class="tg-times">${month.timings.Isha.slice(0, 6)}</td>
                    </tr>
                    `
                    $("tbody").append(monthlyPrayerTimes);
                    $("table").css("display", "block");
                    $(".container").css({
                        "display": "flex",
                        "flex-direction": "row",
                        "justify-content": "center"
                    });
                });
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    $('#getDailyTime').on('click', function (e) {
        e.preventDefault();
        let date = new Date($('#datePicker').val());
        if (!Date.parse(date)) {
            Swal.fire({
                icon: 'error',
                text: 'Please enter a valid date!'
            })
            return;
        }
        let dateString = date.toLocaleString('en-us', { day: 'numeric', month: 'short', year: 'numeric' });
        let arr = dateString.split(" ");
        let day = arr[1].slice(0, arr[1].length - 1);
        let month = arr[0];
        let year = arr[2];
        let dateResult = [day.length == 1 ? day = 0 + day : day, month, year].join(" ");

        $.ajax({
            url: `https://api.aladhan.com/v1/calendar/2023?latitude=40.37767&longitude=49.89201&method=2`,
            method: "get",
            success: function (datas) {
                let dates = datas.data;
                dates[date.getMonth() + 1].forEach(element => {
                    if (dateResult == element.date.readable) {
                        let prayerTime = `
                                <div class="top">
                                    <div class="top-left">
                                        <h3>Prayer Times in Baku</h3>
                                    </div>
                                    <div class="top-right">
                                        <p>${dateResult}</p>
                                    </div>
                                </div>
                                <div class="center">
                                    <div class="time">Fajr: ${element.timings.Fajr.slice(0, 6)}</div>
                                    <div class="time">Sunrise: ${element.timings.Sunrise.slice(0, 6)}</div>
                                    <div class="time">Dhuhr: ${element.timings.Dhuhr.slice(0, 6)}</div>
                                    <div class="time">Asr: ${element.timings.Asr.slice(0, 6)}</div>
                                    <div class="time">Maghrib: ${element.timings.Maghrib.slice(0, 6)}</div>
                                    <div class="time">Isha: ${element.timings.Isha.slice(0, 6)}</div>
                                </div>
                                <div class="bottom">
                                    <p>Fajr 18.0 degrees, Isha 17.0 degrees, Hanbali, Maliki, Shafi</p>
                                </div>
                        `
                        $(".container").css("display", "flex").html(prayerTime);
                    }
                });
            },
            error: function (data) {
                console.log(data);
            }
        });
    });

    $("#daily").on('click', function () {
        $(".dateForm").css("display", "flex");
        $(".dailyOrMonthly").css("display", "none");
        $(".container").css("display", "none");
    });
    $("#monthly").on('click', function () {
        $(".monthForm").css("display", "flex");
        $(".dailyOrMonthly").css("display", "none");
        $(".container").css("display", "none");
    });
    $(".mainPage").on('click', function () {
        location.reload();
    });
});