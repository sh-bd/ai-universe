const allData = (dataLimit) => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
        .then(res => res.json())
        .then(data => universeData(data.data.tools, dataLimit))
}
const universeData = (data, dataLimit) => {
    toggleLoader(true);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = "";
    // show 6 card by show more button
    const showMore = document.getElementById('see-more');

    if (dataLimit && data.length > 6) {
        showMore.classList.remove('d-none');
        data = data.slice(0, 6);
    }
    else {
        showMore.classList.add('d-none');
    }
    data.forEach(singleData => {
        // console.log(singleData);
        document.getElementById('sort-by-date').addEventListener('click', function () {
            const date = singleData.published_in.sort(function sort(a, b) {
                const dateA = new Date(a.singleData.published_in);
                const dateB = new Date(b.singleData.published_in);
                if (dateA > dateB) {
                    return 1
                }
                else if (dateA < dateB) {
                    return -1
                }
                else {
                    return 0
                }
            });
            // console.log(date);
        })
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col');
        cardDiv.innerHTML = `
        <div class="card h-100 pt-3 px-3">
            <img src="${singleData.image}" class="card-img-top rounded-3" alt="...">
            <div class="card-body">
                <h5 class="card-title fw-bolder">Features</h5>
                <p class="card-text p-0 m-0">1. ${singleData.features[0]}</p>
                <p class="card-text p-0 m-0">2. ${singleData.features[1]}</p>
                <p class="card-text p-0 m-0">3. ${singleData.features[2]}</p>
            </div>
            <hr>
            <div class="footer pb-3 px-3 d-flex justify-content-between align-items-center">
                <div>
                    <p class="p-0 m-0 fw-bolder pb-2">${singleData.name}</p>
                    <div class="d-flex align-items-center gap-2">
                        <i class="fa-solid fa-calendar-days"></i>
                        <p class="p-0 m-0">${singleData.published_in}</p>
                    </div>
                </div>
                    <i class="fa-solid fa-circle-arrow-right bg-red" data-bs-toggle="modal" data-bs-target="#card-Modal" onclick="modalFetch('${singleData.id}')"></i>
            </div>
        </div>
        `;
        cardContainer.appendChild(cardDiv);
        toggleLoader(false)
    })
}
const modalFetch = (id) => {
    fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`)
        .then(res => res.json())
        .then(data => modalDetails(data.data))
}
const modalDetails = (data) => {
    const modal = document.getElementById('modal');
    modal.innerHTML = "";
    const modalDiv = document.createElement('div');
    modal.classList.add('modal-content');
    modalDiv.innerHTML = `        
    <div class="modal-header ">        
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body ">
<div class="row row-cols-1 row-cols-md-2 g-4">
<div class="col bg-danger-subtle px-4 rounded-3">
  <div class="">
    <div class="card-body">
        <h5 class="card-title fw-bolder fs-3 text mt-4">${data.description ? data.description : 'Did not found any description'}</h5>
        <p class="card-text"></p>
        <div class="row d-flex justify-content-between py-3 mx-1 mb-3 gap-3">
            <div class="col bg-light rounded-3 pt-3 d-flex align-items-center justify-content-center">
                <p class="text-center fw-semibold text-success">${data.pricing ? data.pricing[0].price + ' <br>' + data.pricing[0].plan : 'Free of Cost/Basic'}</p>
            </div>
            <div class="col bg-light rounded-3 pt-3 d-flex align-items-center justify-content-center">
                <p class="text-center fw-semibold text-primary">${data.pricing ? data.pricing[1].price + ' <br>' + data.pricing[1].plan : 'Free Of Cost/Pro'}</p>
            </div>
            <div class="col bg-light rounded-3 pt-3 d-flex align-items-center justify-content-center">
                <p class="text-center fw-semibold text-info">${data.pricing ? data.pricing[2].price + ' <br>' + data.pricing[2].plan : 'Free of Cost /Enterprise'}</p>
            </div>
        </div>        
        <div class="row d-flex justify-content-between pb-4 gap-3">
            <div class="col ">
                <h3 class="fw-bolder">Features</h3>
                <p class="m-0 p-0">${data.features ? data.features[1].feature_name : 'No features found'}</p>
                <p class="m-0 p-0">${data.features ? data.features[2].feature_name : 'No features found'}</p>
                <p class="m-0 p-0">${data.features ? data.features[3].feature_name : 'No features found'}</p>
            </div>
            <div class="col">
                <h3 class="fw-bolder">Integrations</h3>
                <p class="m-0 p-0">${data.integrations ? data.integrations[0] : 'No data Found'}</p>
                <p class="m-0 p-0">${data.integrations ? data.integrations[1] : 'No data Found'}</p>
                <p class="m-0 p-0">${data.integrations ? data.integrations[2] : 'No data Found'}</p>
            </div>
        </div>
    </div>
  </div>
</div>
<div class="col rounded-3">
  <div class="card position-relative">
    <img src="${data.image_link[0]}" class="card-img-top" alt="...">
    <button class="btn btn-danger position-absolute top-0 end-0"" weight="100px">${data.accuracy ? data.accuracy.score : "No accuracy"}% accuracy</button>
    <p ></p>
    <div class="card-body text-center">
      <h5 class="card-title">${data.input_output_examples[0].input}</h5>
      <p class="card-text">${data.input_output_examples[1].output}</p>
    </div>
  </div>
</div>
</div>
</div>
<div class="modal-footer">
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
</div>
    `;
    modal.appendChild(modalDiv);
};
document.getElementById('see-more').addEventListener('click', function () {

    allData();
})
const loader = document.getElementById('loader');
const toggleLoader = (isLoading) => {
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
};

/// custom sort function
const sort = (a, b) => {
    const dateA = new Date(a.published_in);
    const dateB = new Date(b.published_in);
    if (dateA > dateB) {
        return 1
    }
    else if (dateA < dateB) {
        return -1
    }
    else {
        return 0
    }
}