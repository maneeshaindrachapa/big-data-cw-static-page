var matchResult;
var matchResult_set = [];
var matchResult_labels = [];

var matchesPlayedInEachCity_table;

var hive01;
var hive02;
var hive03;

var spark01;
var spark02;
var spark03;
function preload() {
  matchResult = loadStrings(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/MatchResults.txt"
  );
  matchesPlayedInEachCity_table = loadTable(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/MatchesPlayedInEachCity.csv",
    "csv"
  );
  hive01 = loadTable(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/hive01.csv",
    "csv"
  );
  hive02 = loadTable(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/hive02.csv",
    "csv"
  );
  hive03 = loadTable(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/hive03.csv",
    "csv"
  );
  spark01 = loadTable(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/spark01.csv",
    "csv"
  );
  spark02 = loadTable(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/spark02.csv",
    "csv"
  );
  spark03 = loadTable(
    "https://raw.githubusercontent.com/maneeshaindrachapa/big-data-cw-static-page/master/assets/text/spark03.csv",
    "csv"
  );
}

function setup() {
  noCanvas();
  _matchResult();
  _matchesPlayedInEachCity();
  _hive01();
  _hive02();
  _hive03();
  _spark01();
  _spark02();
  _spark03();
}

//Question 01 - The total number of matches played, ended with a Result and Drawn
function _matchResult() {
  for (let i = 0; i < matchResult.length; i++) {
    let values = matchResult[i].split("\t");
    matchResult_labels[i] = values[0];
    matchResult_set[i] = parseFloat(values[1]);
  }
  document.getElementById("matchResult_drawn").innerHTML = matchResult_set[0];
  document.getElementById("matchResult_with_result").innerHTML =
    matchResult_set[1];
  document.getElementById("matchResult_total").innerHTML =
    matchResult_set[1] + matchResult_set[0];
}

//Question 02 - Total number of matches played in each city
function _matchesPlayedInEachCity() {
  let table = $("#totalNumberOfMatchesPlayedInEachCity tr:last");
  let textTohtml = "";
  for (let r = 0; r < matchesPlayedInEachCity_table.getRowCount(); r++) {
    textTohtml +=
      "<tr><td>" +
      matchesPlayedInEachCity_table.getRow(r).getString(0) +
      "</td><td>" +
      matchesPlayedInEachCity_table.getRow(r).getString(1) +
      "</td></tr>";
  }
  table.after(textTohtml);

  $("#totalNumberOfMatchesPlayedInEachCity").each(function () {
    var currentPage = 0;
    var numPerPage = 23;
    var $table = $("#totalNumberOfMatchesPlayedInEachCity");
    $table.bind("repaginate", function () {
      $table
        .find("tbody tr")
        .hide()
        .slice(currentPage * numPerPage, (currentPage + 1) * numPerPage)
        .show();
    });
    $table.trigger("repaginate");
    var numRows = $table.find("tbody tr").length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
      $('<span class="page-number"></span>')
        .text(page + 1)
        .bind(
          "click",
          {
            newPage: page,
          },
          function (event) {
            currentPage = event.data["newPage"];
            $table.trigger("repaginate");
            $(this).addClass("active").siblings().removeClass("active");
          }
        )
        .appendTo($pager)
        .addClass("clickable");
    }
    $pager
      .insertBefore($table)
      .find("span.page-number:first")
      .addClass("active");
  });
}

//Question 03 Hive 01- The total number of goals scored and conceded by each team when played home
function _hive01() {
  let teams = [];
  let scoredGoals = [];
  let concededGoals = [];

  for (let i = 0; i < hive01.getRowCount(); i++) {
    teams.push(hive01.getRow(i).getString(0));
    scoredGoals.push(hive01.getRow(i).getString(1));
    concededGoals.push(hive01.getRow(i).getString(2));
  }
  var ctx = document.getElementById("hive01chart").getContext("2d");
  var hive01chart = new Chart(ctx, {
    type: "horizontalBar",
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
    data: {
      labels: [...teams],
      datasets: [
        {
          label: "Scored",
          data: [...scoredGoals],
          backgroundColor: "rgba(81, 203, 206,0.8)",
          borderColor: "rgba(81, 203, 206,0.8)",
          borderWidth: 1,
        },
        {
          label: "Conceded",
          data: [...concededGoals],
          backgroundColor: "rgba(251, 198, 88, 0.5)",
          borderColor: "rgba(251, 198, 88, 0.5)",
          borderWidth: 1,
        },
      ],
    },
  });
}

//Question 04 - Top 10 Teams Based on the Average Goals per Match when Played Away
function _hive02() {
  let table = $("#hive02table tr:last");
  let textTohtml = "";
  for (let r = 0; r < hive02.getRowCount(); r++) {
    textTohtml +=
      "<tr><td>" +
      hive02.getRow(r).getString(0) +
      "</td><td>" +
      hive02.getRow(r).getString(1) +
      "</td></tr>";
  }
  table.after(textTohtml);
}

//Question 05 - The 5 teams who have lost the most number of matches
function _hive03() {
  let teams = [];
  let matchesLost = [];

  for (let i = 0; i < hive03.getRowCount(); i++) {
    teams.push(hive03.getRow(i).getString(1));
    matchesLost.push(hive03.getRow(i).getString(0));
  }
  var ctx = document.getElementById("hive03chart").getContext("2d");
  var hive01chart = new Chart(ctx, {
    type: "bar",
    options: {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
    data: {
      labels: [...teams],
      datasets: [
        {
          label: "Matches Lost",
          data: [...matchesLost],
          backgroundColor: "rgba(81, 203, 206,0.8)",
          borderColor: "rgba(81, 203, 206,0.8)",
          borderWidth: 1,
        },
      ],
    },
  });
}

//Question 06 - Percentage of countries that have hosted more than one type of tournament
function _spark01() {
  let labels_ = [];
  let datasets_ = [];
  for (let i = 1; i < spark01.getRowCount(); i++) {
    labels_.push(spark01.getRow(i).getString(1));
    datasets_.push(spark01.getRow(i).getString(2));
  }
  var ctx = document.getElementById("spark01chart").getContext("2d");
  var spark01chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: labels_,
      datasets: [
        {
          label: "Percentage",
          backgroundColor: ["#3e95cd", "#fbc658"],
          data: datasets_,
        },
      ],
    },
    options: {},
  });
}

//Question 07 - Histogram of the total number of matches played overtime in year granularity
function _spark02() {
  let labels_ = [];
  let datasets_ = [];
  for (let i = 1; i < spark02.getRowCount(); i++) {
    labels_.push(spark02.getRow(i).getString(1));
    datasets_.push(spark02.getRow(i).getString(2));
  }
  var ctx = document.getElementById("spark02chart").getContext("2d");
  var spark02chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels_,
      datasets: [
        {
          label: "Matches Played",
          backgroundColor: "#3e95cd",
          data: datasets_,
        },
      ],
    },
    options: {},
  });
}

//Question 08 - The total number of matches won, lost, and drawn by each team
function _spark03() {
  console.log(spark03);
  let table = $("#spark03table tr:last");
  let textTohtml = "";
  for (let r = 1; r < spark03.getRowCount(); r++) {
    textTohtml +=
      "<tr><td>" +
      spark03.getRow(r).getString(0) +
      "</td><td>" +
      spark03.getRow(r).getString(1) +
      "</td><td>"+
      spark03.getRow(r).getString(2) +
      "</td><td>"+
      spark03.getRow(r).getString(3) +
      "</td></tr>";
  }
  table.after(textTohtml);

  $("#spark03table").each(function () {
    var currentPage = 0;
    var numPerPage = 23;
    var $table = $("#spark03table");
    $table.bind("repaginate", function () {
      $table
        .find("tbody tr")
        .hide()
        .slice(currentPage * numPerPage, (currentPage + 1) * numPerPage)
        .show();
    });
    $table.trigger("repaginate");
    var numRows = $table.find("tbody tr").length;
    var numPages = Math.ceil(numRows / numPerPage);
    var $pager = $('<div class="pager"></div>');
    for (var page = 0; page < numPages; page++) {
      $('<span class="page-number"></span>')
        .text(page + 1)
        .bind(
          "click",
          {
            newPage: page,
          },
          function (event) {
            currentPage = event.data["newPage"];
            $table.trigger("repaginate");
            $(this).addClass("active").siblings().removeClass("active");
          }
        )
        .appendTo($pager)
        .addClass("clickable");
    }
    $pager
      .insertBefore($table)
      .find("span.page-number:first")
      .addClass("active");
  });
}
