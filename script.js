var apiUrl = "https://data.covid19india.org/v4/min/data.min.json";
var fetchedData = [];
async function apiDetails(url) {
  try {
    var res = await fetch(url);
    var data = await res.json();
    console.log(data);
    var tab = document.getElementById("tableRow");

    var tested = 0;
    var confirmed = 0;
    var recovered = 0;
    var deceased = 0;

    for (var i in data) {
      var row = document.createElement("tr");
      row.innerHTML = `<td>${i}</th>
                          <td>${data[i].total.tested}</td>
                          <td>${data[i].total.confirmed}</td>
                          <td>${data[i].total.recovered}</td>
                          <td>${data[i].total.deceased}</td>
          `;
      tab.append(row);

      tested += data[i].total.tested;
      confirmed += data[i].total.confirmed;
      recovered += data[i].total.recovered;
      deceased += data[i].total.deceased;
    }
    document.getElementById("testedNo").innerText = tested;
    document.getElementById("confirmedNo").innerText = confirmed;
    document.getElementById("recoveredNo").innerText = recovered;
    document.getElementById("deceasedNo").innerText = deceased;

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

apiDetails(apiUrl).then((data) => {
  fetchedData = data;
});

function displayData(i, data) {
  const resultsList = document.getElementById("results");
  resultsList.innerHTML = "";

  var searchInput = document.getElementById("searchInput");
  var searchTerm = searchInput.value.toLowerCase();

  const listItem = document.createElement("h4");
  listItem.classList.add("list-group-item");

  listItem.textContent = `The State ${i}'s Covid Status is: Total Tested cases: ${data.total.tested};
        Total Confirmed Cases: ${data.total.confirmed};
        Toal Recovered Cases: ${data.total.recovered};
        Total Deceased Cases: ${data.total.deceased}`;
  resultsList.appendChild(listItem);

  document.getElementById("testedNo").innerText = `${i}:${data.total.tested}`;
  document.getElementById("confirmedNo").innerText = `${i}:${data.total.confirmed}`;
  document.getElementById("recoveredNo").innerText = `${i}:${data.total.recovered}`;
  document.getElementById("deceasedNo").innerText = `${i}:${data.total.deceased}`;
}

function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchTerm = searchInput.value.toLowerCase();

  for (var i in fetchedData) {
    if (i.toLowerCase() == searchTerm) displayData(i, fetchedData[i]);
    else console.log("No such state Code");
  }
}

document.getElementById("searchInput").addEventListener("input", handleSearch);
