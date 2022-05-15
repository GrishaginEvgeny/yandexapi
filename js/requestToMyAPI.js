document.forms.metro.elements.button.addEventListener('click', ()=>
{
    let form = new FormData();
    form.append('inputedAddress', document.forms.metro.elements.address.value)
    fetch('/yandex.php', {
        method: 'POST',
        body: form,
    }).then((response) => response.json()).then((jsonedResponse)=>{
            document.getElementById("response").classList.remove('invalid-feedback', 'valid-feedback')
            document.getElementById("addr").innerHTML = `<p>Адрес: ${jsonedResponse.fullAddress}</p>`;
            document.getElementById("addr").innerHTML += `<p>Широта: ${jsonedResponse.latitude}</p>`;
            document.getElementById("addr").innerHTML += `<p>Долгота: ${jsonedResponse.longitude}</p>`;
            if (jsonedResponse.status === true) {
                document.getElementById("response").classList.add('valid-feedback');
                document.getElementById("response").innerHTML = `<p>Метро: ${jsonedResponse.metro}</p>`;
            } else {
                document.getElementById("response").classList.add('invalid-feedback');
                document.getElementById("response").innerHTML = `<p>Поблизости нет метро.</p>`;
            }
    }).catch((e)=>{document.getElementById("addr").innerHTML = ``;
        document.getElementById("response").classList.add('invalid-feedback');
        document.getElementById("response").innerHTML = `Ошибка: вы ввели несущестующий адрес или адрес в неправильном формате`;})
})