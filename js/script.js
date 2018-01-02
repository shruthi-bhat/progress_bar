var info;

//fetching the value from API and loading to Html
function fetch_and_load() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            info = JSON.parse(this.responseText)

            var dropdown = document.getElementById("prog_bar_dropdown");

            for (var i = 0; i < info.bars.length; i++) {

                if (i >= 5) {
                    alert('more than 5 bars not supported')
                    return;
                }
                var item = info.bars[i]

                var bar_id = "prog_bar_" + i;

                var container_id = 'prog_bar_container_' + i;

                var width = Math.round((item * 100) / info.limit);

                document.getElementById(bar_id).style.width = width + '%';
                document.getElementById(container_id).style.visibility = 'visible';
                document.getElementById(bar_id).innerHTML = item + ' %';


                var option = document.createElement('option');
                option.text = "Progress Bar " + (i + 1);
                dropdown.add(option, i);
            }
            dropdown.selectedIndex = 0;


            for (var i = 0; i < info.buttons.length; i++) {
                if (i >= 6) {
                    alert('more than 6 buttons not supported')
                    return;
                }
                var item = info.buttons[i];
                var btn_id = "btn_" + i;
                document.getElementById(btn_id).innerHTML = item + '%';
                document.getElementById(btn_id).style.visibility = 'visible';
            }
        }

        console.log(info);
    };
    xhttp.open("GET", "http://pb-api.herokuapp.com/bars", true);
    xhttp.send();
}


// calculation for progress bar.
function move(btn_idx) {

    var dropdown = document.getElementById("prog_bar_dropdown");

    var prog_bar_idx = dropdown.selectedIndex;
    var prog_bar_id = "prog_bar_" + prog_bar_idx;


    var temp = info.bars[prog_bar_idx] + info.buttons[btn_idx];
    if (temp < 0)
        temp = 0;
    if (temp > info.limit)
        temp = info.limit;

    var width = Math.round((temp * 100) / info.limit);
    info.bars[prog_bar_idx] = temp;

    if (temp >= 100)
        document.getElementById(prog_bar_id).style.backgroundColor = 'red';
    else
        document.getElementById(prog_bar_id).style.backgroundColor = '#3dcc5b';

    document.getElementById(prog_bar_id).innerHTML = temp + '%';
    document.getElementById(prog_bar_id).style.width = width + '%';

}