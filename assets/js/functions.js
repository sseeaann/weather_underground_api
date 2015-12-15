$(function(){

	var getWeather = function(){

		var getWeatherUrl = function(location){
			if($('#zipCode').val() === ''){
				var weatherUrl = 'http://api.wunderground.com/api/'+ YOUR_API_KEY +'/geolookup/conditions/forecast/q/autoip.json';
			} else {
				location = $('#zipCode')[0].value;
				var weatherUrl = 'http://api.wunderground.com/api/'+ YOUR_API_KEY +'/geolookup/conditions/forecast/q/'+ location +'.json';
			}
			return weatherUrl;
		};

		$.ajax({
			url : getWeatherUrl(location),
				dataType : "jsonp",
			success : function(data) {
				var city = data.current_observation.display_location.city,
					state = data.current_observation.display_location.state,
					temp_f = data.current_observation.temp_f,
					conditions = data.current_observation.weather,
					weatherData = data.forecast.simpleforecast.forecastday;

				for(var i = 0; i < weatherData.length; i++){

					if(i === 0){
						$('#location').text(city+', '+state);
						$('#today .weather-img img').attr('src', weatherData[i]['icon_url']);
						$('.degrees').html(temp_f+'&deg;');
						$('#conditions').text(conditions);
					}

					if(i === 1){
						$('#todayPlus1 .weather-img img').attr('src', weatherData[i]['icon_url']);
						$('#todayPlus1 .temp p').html(weatherData[i]['high']['fahrenheit']+'&deg;');
						$('#todayPlus1 .day p').html(weatherData[i]['date']['weekday']);
					}

					if(i === 2){
						$('#todayPlus2 .weather-img img').attr('src', weatherData[i]['icon_url']);
						$('#todayPlus2 .temp p').html(weatherData[i]['high']['fahrenheit']+'&deg;');
						$('#todayPlus2 .day p').html(weatherData[i]['date']['weekday']);
					}

					if(i === 3){
						$('#todayPlus3 .weather-img img').attr('src', weatherData[i]['icon_url']);
						$('#todayPlus3 .temp p').html(weatherData[i]['high']['fahrenheit']+'&deg;');
						$('#todayPlus3 .day p').html(weatherData[i]['date']['weekday']);
					}

				}
			}
		});
	};
	getWeather();

	$('.submitZip').click(function(){
		getWeather();
		$('#zipCode').val('');
	});

});
