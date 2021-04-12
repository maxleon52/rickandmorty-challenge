import React, { useEffect, useState } from 'react';

import styles from './myEpisodes.module.scss';

interface Episodes {
  episodes: string[];
}

function MyEpisodes() {
  const [myEpisodes, setMyEpisodes] = useState<Episodes[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('rickandmorty:storage');
    if (storage) {
      const myEpisodesConverted = JSON.parse(storage);
      setMyEpisodes(myEpisodesConverted);
    }
  }, []);

  return (
    <div className={styles.container}>
      {myEpisodes.length > 0 && (
        <>
          {myEpisodes.map((episode, index) => (
            <div className={styles.card}>
              <div className={styles.cardListPersons}>
                {episode.episodes?.map(img => (
                  <img src={img} alt="avatar" />
                ))}
              </div>
              <footer className={styles.footer}>
                <h6>As aventutas de Rick and Morty</h6>
                <h6>{`Epísodio ${index + 1}`}</h6>
              </footer>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default MyEpisodes;
