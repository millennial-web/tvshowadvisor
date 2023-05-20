import { useEffect, useState } from 'react';

import s from './style.module.css';

export const TvShowProviders = ({ providers, defaultCountry }) => {
  const [selected, setSelected] = useState(defaultCountry);
  const [details, setDetails] = useState(null);

  const setDefaultSelected = () => {
    const defaultData = providers.find((obj) => {
      return obj.country === defaultCountry;
    });
    if (defaultData) {
      setSelected(defaultCountry);
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

  return (
    <>
      <h4>Where to watch:</h4>
      <div className={s.container}>
        <div className={s.country_col}>
          <p className={s.selectLabel}>Select a Country</p>
          <select
            onChange={(e) => {
              setSelected(e.target.value);
            }}
            value={selected}
          >
            {providers.map((prov) => {
              return (
                <option key={prov.country} value={prov.country}>
                  {prov.country}
                </option>
              );
            })}
          </select>
        </div>
        <div className={s.details}>
          {details && (
            <a href={details.link} target="_blank" rel="noreferrer">
              <img
                className={s.provider_logo}
                src={`${process.env.REACT_APP_PROVIDER_BASE_URL}${details.flatrate[0].logo_path}`}
                alt={details.flatrate[0].provider_name}
              />
            </a>
          )}
        </div>
      </div>
    </>
  );
};
