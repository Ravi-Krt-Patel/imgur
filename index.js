
let page = 1;
let size = 8;
let txt;
let timerId;
var myHeaders = new Headers();
myHeaders.append("Authorization", "563492ad6f917000010000013ab3854d6f814e7aa3e75b0d42c70322");
function debounce(fun, delay) {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(() => {
    fun();
  }, delay);
};

function main() {
	txt = document.getElementById("navInput").value;
	if (txt.length > 2) {
	  let itemslist = document.getElementById("container");
	  itemslist.innerHTML = null;
	  page = 1;
	  getalldata();
	}
  }

  function getalldata() {
	if (txt) {
	  var api = `https://api.pexels.com/v1/search/?page=${page}&per_page=${size}&query=${txt}`;
	  console.log(txt);
	} else
	  var api = `https://api.pexels.com/v1/curated/?page=${page}&per_page=${size}`;
  
	fetch(api, {
	  method: "GET",
	  headers: myHeaders,
	})
	  .then((response) => response.json())
	  .then((result) => {
		result.photos.map((e) => {
		  let itemslist = document.getElementById("container");
		  let datamap = `<div id="item-div">
		  <a href="https://www.google.co.in/">
						  <img
						  id="div-img"
						  src="${e.src.medium}"
						  alt="${e.alt}"
						  /></a>
						  <p>${e.alt}</p>
						  <div id="contActivity">
							  <span>
							  Photographer : <b> ${e.photographer}<b/>
							  </span>
						  </div>
					  </div>`;
  
		  itemslist.insertAdjacentHTML("beforeend", datamap);
		});
		console.log(result.photos);
	
	  })
	  .catch((error) => console.log("error", error));
  }

  getalldata();


  const showData = () => {
	setTimeout(() => {
	  page++;
	  console.log(page);
	  getalldata();
	}, 200);
  };

  window.addEventListener("scroll", () => {
	const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
  
	if (scrollTop + clientHeight >= scrollHeight) {
	
	  showData();
	}
  });