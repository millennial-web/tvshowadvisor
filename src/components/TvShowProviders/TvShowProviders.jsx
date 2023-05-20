import { useEffect, useState } from 'react';
import { PROVIDER_BASE_URL } from '../../config';

import s from './style.module.css';

export const TvShowProviders = ({ providers, defaultCountry}) => {
  const [selected, setSelected] = useState(null);
  const [details, setDetails] = useState(null);

  const setDefaultSelected = () => {
    const defaultData = providers.find((obj) => {
      return obj.country === 'US';
    });
    if (defaultData) {
      setSelected('US');
    }
  };

  useEffect(() => {
    const data = providers.find((obj) => {
      return obj.country === selected;
    });
    setDetails(data);
  }, [selected, providers]);

  useEffect(() => {
    setDefaultSelected();
  }, []);

  console.log(details);
  //  //
  //   {
  //     "country": "US",
  //     "link": "https://www.themoviedb.org/tv/44217-vikings/watch?locale=US",
  //     "buy": [
  //         {
  //             "logo_path": "/5NyLm42TmCqCMOZFvH4fcoSNKEW.jpg",
  //             "provider_id": 10,
  //             "provider_name": "Amazon Video",
  //             "display_priority": 13
  //         },
  //         {
  //             "logo_path": "/tbEdFQDwx5LEVr8WpSeXQSIirVq.jpg",
  //             "provider_id": 3,
  //             "provider_name": "Google Play Movies",
  //             "display_priority": 14
  //         }
  //     ],
  //     "flatrate": [
  //         {
  //             "logo_path": "/emthp39XA2YScoYL1p0sdbAH2WA.jpg",
  //             "provider_id": 9,
  //             "provider_name": "Amazon Prime Video",
  //             "display_priority": 1
  //         },
  //         {
  //             "logo_path": "/zxrVdFjIjLqkfnwyghnfywTn3Lh.jpg",
  //             "provider_id": 15,
  //             "provider_name": "Hulu",
  //             "display_priority": 6
  //         },
  //         {
  //             "logo_path": "/xTHltMrZPAJFLQ6qyCBjAnXSmZt.jpg",
  //             "provider_id": 387,
  //             "provider_name": "Peacock Premium",
  //             "display_priority": 12
  //         }
  //     ],
  //     "ads": [
  //         {
  //             "logo_path": "/t6N57S17sdXRXmZDAkaGP0NHNG0.jpg",
  //             "provider_id": 300,
  //             "provider_name": "Pluto TV",
  //             "display_priority": 107
  //         }
  //     ]
  // }

  return (
    <>
      <h4>Where to watch:</h4>
      <div className={s.container}>
        <select
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          value={selected}
        >
          <option value="">Select Country</option>
          {providers.map((prov) => {
            // const isSel = prov.country === 'US' ? true : false;
            return (
              <option key={prov.country} value={prov.country}>
                {prov.country}
              </option>
            );
          })}
        </select>
        <div className={s.details}>
          {details && (
            <a href={details.link} target="_blank" rel="noreferrer">
              <img
                className={s.provider_logo}
                src={`${PROVIDER_BASE_URL}${details.flatrate[0].logo_path}`}
                alt={details.flatrate[0].provider_name}
              />
            </a>
          )}
        </div>
      </div>
    </>
  );
};
