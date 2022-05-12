document.forms.metro.elements.button.addEventListener('click', ()=>
{
    let form = new FormData();
    form.append('inputedAddress', document.forms.metro.elements.address)
    fetch('yandex.php', {
        method: 'POST',
        body: form,
    }).then((response) => {return response.json()}).then((jsonedResponse)=>{
        document.getElementById("response").classList.remove('invalid-feedback', 'valid-feedback')
        if(jsonedResponse["status"]){

            document.getElementById("response").classList.add('valid-feedback');
            document.getElementById("response").innerHTML = "<p>Адрес: ${jsonedResponse.fullAddress}</p>";
            document.getElementById("response").innerHTML += "<p>Широта: ${jsonedResponse.latitude}</p>";
            document.getElementById("response").innerHTML += "<p>Долгота: ${jsonedResponse.longitude}</p>";
            document.getElementById("response").innerHTML += "<p>Метро: ${jsonedResponse.metro}</p>";
        }
        else{
            document.getElementById("response").classList.add('invalid-feedback');
            document.getElementById("response").innerHTML = "<p>Поблизости нет метро.</p>";
        }
    })
})