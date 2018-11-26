'use strict';

{
  function fetchJSON(url, cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status < 400) {
        cb(null, xhr.response);
      } else {
        cb(new Error(`Network error: ${xhr.status} - ${xhr.statusText}`));
      }
    };
    xhr.onerror = () => cb(new Error('Network request failed'));
    xhr.send();
  }

  function renderLaureates(laureates) {
    const root = document.getElementById('root');
    const listContainer = document.createElement('ul');
    root.appendChild(listContainer);
    listContainer.id = 'list-container';

    laureates.forEach(laureate => {
      const listItem = document.createElement('li');
      listItem.className = 'list-item';
      listContainer.appendChild(listItem);
      const table = document.createElement('table');
      listItem.appendChild(table);
      const tbody = document.createElement('tbody');
      table.appendChild(tbody);
      const tr = document.createElement('tr');
      tbody.appendChild(tr);
      const td1 = document.createElement('td');
      tr.appendChild(td1);
      td1.className = 'label';
      td1.innerText = 'Name:';
      const td2 = document.createElement('td');
      tr.appendChild(td2);
      td2.innerText = laureate.firstname + ' ' + (laureate.surname || '');
    });
  }

  function main(url) {
    fetchJSON(url, (err, data) => {
      if (err) {
        console.error(err.message);
        return;
      }
      renderLaureates(data.laureates);
    });
  }

  const NOBEL_PRIZE_API_END_POINT = 'http://api.nobelprize.org/v1/laureate.json?gender=female';

  window.onload = () => main(NOBEL_PRIZE_API_END_POINT);
}
