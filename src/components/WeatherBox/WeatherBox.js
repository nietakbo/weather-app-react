import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState(null);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const API_KEY = '714f5a85e89754c2e33bbd1cc688a60b';

  const handleCityChange = useCallback(city => {
    setPending(true);
    setError(false);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    ).then(res => {
      if (res.status === 200) {
        return res.json().then(data => {
          const newWeatherData = {
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          };
          setWeatherData(newWeatherData);
          setPending(false);
        });
      } else {
        setPending(false);
        setError(true);
      }
    });
  }, []);

  return (
    <section>
      <PickCity action={handleCityChange} />
      {weatherData && !pending && !error && <WeatherSummary {...weatherData} />}
      {pending && <Loader />}
      {error && <ErrorBox />}
    </section>
  )
};

export default WeatherBox;