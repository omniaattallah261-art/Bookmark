// variabels

var siteInput = document.getElementById("siteName");
var urlInput = document.getElementById("siteURL");
var modal = document.getElementById("modal")


var sites = [];

if (localStorage.getItem("links")!==null) {
    sites = JSON.parse(localStorage.getItem("links")) ;
    showSite()
}

// First function

function enterSite() {
  if (
    validateInputs (siteInput)&&
    validateInputs (urlInput) 
  )

{
    var site = {
        name: siteInput.value,
        url: urlInput.value,
    }

    sites.push(site)
    showSite()
    localStorage.setItem("links" , JSON.stringify(sites))
    clear ()
}
else {
    validateModal()
}
}
// Adding function

function showSite() {
    var content = ""
    for (var i = 0; i < sites.length; i++)
        content += `
    
  <tr>
                <th scope="row">${i + 1}</th>
                <td>${sites[i].name}</td>
                <td class="visit">
                  <button id="visit" class="btn" onclick = "visitSite(${i})"> <i class="fa-solid fa-eye"></i> Visit</button>
                </td>
                <td class="delete">
                  <button id="delete" class="btn" onclick="deleteSite(${i})"> <i class="fa-solid fa-trash"></i> Delete</button>
                </td>
              </tr>

   `

    document.getElementById("data").innerHTML = content


}

// Visit function

function visitSite(index) {
    window.open(sites[index].url, "_blank");

}

// Delete function

function deleteSite(index) {
    sites.splice(index, 1);
    showSite()
    localStorage.setItem("links" , JSON.stringify(sites))

} 

// Clear function

 function clear () {
    siteInput.value="";
    urlInput.value="";
    urlInput.classList.remove("is-valid");
    siteInput.classList.remove("is-valid");
    urlInput.classList.remove("is-invalid");
    siteInput.classList.remove("is-invalid");
 }

 // Validation part 

 function validateInputs (element) {
    var text = element.value ;
    var regex = {
       siteName :  /^[A-Za-z0-9\s-]{3,}$/ , 
       siteURL :   /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?(\/\S*)?$/ ,
    }
    if (regex[element.id].test(text) == true ) {
        element.classList.add ("is-valid");
        element.classList.remove("is-invalid");
        return true
    }

    else {
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        return false
    }
 }
 
 function validateModal () {
    document.getElementById("modal").classList.replace("d-none","d-block")
 }

 // close function

 function closeModal () {
    document.getElementById("modal").classList.replace("d-block","d-none")
 }