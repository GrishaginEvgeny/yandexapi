<?php

$params = [
    'apiKey' => parse_ini_file("config/params.ini", true)['apiKey'],
    'inputedAddress' => htmlspecialchars($_POST['inputedAddress']),
    'format' => 'json',
];
$result = array();
$curl_settings = curl_init();


curl_setopt($curl_settings,
    CURLOPT_URL , sprintf("https://geocode-maps.yandex.ru/1.x?geocode=%s&apikey=%s&format=%s&results=1",
        rawurlencode($params['inputedAddress']), $params['apiKey'], $params['format']));
curl_setopt($curl_settings,
    CURLOPT_RETURNTRANSFER , 1);


$response_for_address_on_inputed_data = curl_exec($curl_settings);
curl_close($curl_settings);
    $address_data = json_decode($response_for_address_on_inputed_data, 1);

    $coords = explode(" ", $address_data["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["Point"]["pos"]);
    $params['coords'] = $coords[0] . ',' . $coords[1];
    $result['latitude'] = $coords[1];
    $result['longitude'] = $coords[0];
    $result['fullAddress'] = $address_data['response']['GeoObjectCollection']['featureMember'][0]['GeoObject']['metaDataProperty']['GeocoderMetaData']['text'];

    $new_curl_settings = curl_init();
    curl_setopt($new_curl_settings,
        CURLOPT_URL, sprintf("https://geocode-maps.yandex.ru/1.x?geocode=%s&apikey=%s&format=%s&results=1&kind=metro",
            rawurlencode($params['coords']), $params['apiKey'], $params['format']));
    curl_setopt($new_curl_settings,
        CURLOPT_RETURNTRANSFER, 1);

    $metro_response = curl_exec($new_curl_settings);

    curl_close($new_curl_settings);

    $metro_data = json_decode($metro_response, 1);




    if($metro_data["response"]["GeoObjectCollection"]["featureMember"] == null) {
        $result["status"] = false;
    } else {
        $result["status"] = true;
        $result['metro'] = $metro_data["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["name"];
    }

echo json_encode($result);