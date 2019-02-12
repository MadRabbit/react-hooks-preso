import React, { useState, useEffect } from 'react';

export const Button = () => {
  const [count, setState] = useState(0);

  return (
    <button onClick={() => setState(count + 1)} style={{ padding: '1rem'}}>
      You have clicked this {count} times
    </button>
  )
}

const isVowel = () => {
  const vowels = 'aeiouyj';
  const [isVowel, setIsVowel] = useState(null);

  const onKeyDown = ({ key }) => {
    setIsVowel(vowels.includes(key));
  }

  useEffect(() => {
    addEventListener('keydown', onKeyDown)

    return () => {
      removeEventListener('keydown', onKeyDown);
    }
  }, []);

  return isVowel;
}

export const Vowels = () => {
  const value = isVowel();

  if (value === null) {
    return <p>havent pressed anything yet</p>;
  } else {
    return <p>what you pressed was {value ? '' : 'NOT'} a vowel</p>;
  }
}

const currentWeather = () => {
  const [{ weather, loading }, setWeather] = useState({ weather: null, loading: true });
  // const url = 'https://samples.openweathermap.org/data/2.5/weather?q=Sydney,au&appid=b6907d289e10d714a6e88b30761fae22';
  const url = 'https://api.darksky.net/forecast/2dbcddc142dbb47d651d3acc221362ce/33.8688,151.2093';
  const parse = (data) => {
    return data.daily.summary;
  }

  useEffect(() => {
    fetch(`https://cors-anywhere.herokuapp.com/${url}`)
    .then(response => response.json())
      .then(data => {
        new Promise(r => setTimeout(r, 1000)).then(() => {
          setWeather({
            weather: parse(data),
            loading: false
          })
        })
      })
  }, []);

  return { weather, loading }
}

export const Weather = () => {
  const { loading, weather } = currentWeather();

  if (loading) return <p>Loading...</p>;

  return <p>{weather}</p>;
}
