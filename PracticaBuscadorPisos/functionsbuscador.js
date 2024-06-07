let district = document.querySelector("#district");
let neighborhood = document.querySelector("#neighborhood");

$("#neighborhood").prop("disabled", true); 

$("#district").on("change", function(){
    let selectionValue = $(this).val(); 
    neighborhood.disabled = false;
    getNeighborhoodByDistrictId(selectionValue);
});
fetch('getDistrictes.php')
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
        data.forEach(item => {
            let optionsDistrict = document.createElement("option");
            optionsDistrict.value = item.id;
            optionsDistrict.text = item.name;
            district.appendChild(optionsDistrict);
        })
    });

    function showInfoForm(){
        let nameFlat = document.querySelector('#validationNom').value;
        let town = document.querySelector('#town');
        let price = document.querySelector('#validationPreu').value;
        let road = document.querySelector('#via');
        let street = document.querySelector('#carrer').value;
        let number = document.querySelector('#numero').value;
        let numberFlat = document.querySelector('#pis').value;
        let staircase = document.querySelector('#escala').value;
        let door = document.querySelector('#porta').value;
        let cp = document.querySelector('#cp').value;
        
        let selectedDistrict = district.selectedOptions[0].text;
        let selectedNeighborhood = neighborhood.selectedOptions[0].text;
        let selectedTown = town.selectedOptions[0].text;
        let selectedRoad = road.selectedOptions[0].text;
        let directionText = document.querySelector('#nomPis');
        let infoText = document.querySelector('#dir');
        let preuText = document.querySelector('#preu');
       
        directionText.innerText = `${nameFlat} ${selectedDistrict} ${selectedNeighborhood}`;
        infoText.innerText = `${selectedRoad} ${street} ${number} ${numberFlat} ${staircase} ${door} ${cp} ${selectedDistrict} ${selectedNeighborhood} ${selectedTown}`;
        preuText.innerText = `${price} €`;
      }

function getNeighborhoodByDistrictId(idDistrict){
    
    let formData = new FormData();
    formData.append("id",idDistrict);

    let options = {
        method: 'POST',
        body: formData
    }

    fetch('getBarris.php', options)
        .then((response)=> response.json())
        .then((data)=> {
            neighborhood.innerHTML = ""; 
            data.forEach(item => {               
                let optionsHood = document.createElement("option");
                optionsHood.value = item.id;
                optionsHood.text = item.name;
                neighborhood.appendChild(optionsHood);
                
            })
        });
     

        

}



let inputs = document.querySelectorAll('input'); 


inputs.forEach((input)=>{
  $(input).on("focusout", function(){
    let id = input.id;
    let value = input.value;
    if (id == "validationNom" || id == "validationPreu"){
        
        if (value == 0){
            input.classList.remove("is-valid");
            input.classList.add("is-invalid");
        }else {
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
        
    }
     
    
  });
});

document.querySelector(".btn-info").addEventListener("click", function(event) {
    event.preventDefault(); 
    showInfoForm();
});


