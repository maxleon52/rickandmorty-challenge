/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import styles from './home.module.scss';

import sadImage from '../../assets/icons/sad.svg';
import { GET_PERSONS, GET_LOCATIONS } from './querys';
import PersonCard from './components/PersonCard';
import LocationCard from './components/LocationCard';

import {
  addPersonToCreateEpisode,
  removePersonToCreateEpisode,
} from '../../store/modules/addEpisode/actions';

import { IState } from '../../store';
import { IPerson } from '../../store/modules/addEpisode/types';

interface Location {
  id: string;
  name: string;
  dimension: string;
  isSelected: boolean;
}
interface Person {
  id: string;
  name: string;
  species: string;
  gender: string;
  image: string;
  isSelected: boolean;
}

function Home() {
  const [listPersons, setListPersons] = useState<Person[]>([]);
  const [listLocations, setListLocations] = useState<Location[]>([]);

  const dispatch = useDispatch();
  const boxAdd = useSelector<IState, IPerson[]>(
    state => state.listPersons?.persons,
  );

  const { loading, data } = useQuery(GET_PERSONS);
  const { loading: loadingLocations, data: dataLocations } = useQuery(
    GET_LOCATIONS,
  );

  useEffect(() => {
    if (data) {
      const persons = data.characters.results.map((person: Person) => ({
        ...person,
        isSelected: false,
      }));
      setListPersons(persons);
    }
  }, [data]);

  useEffect(() => {
    if (dataLocations !== undefined) {
      const locations = dataLocations.locations.results.map(
        (location: Location) => ({
          ...location,
          isSelected: false,
        }),
      );
      setListLocations(locations);
    }
  }, [dataLocations]);

  const handleIsSelected = useCallback(
    (person: Person) => {
      if (person.isSelected === false) {
        const newArrayPersons = listPersons.map(item =>
          item.id === person.id ? { ...item, isSelected: true } : item,
        );
        setListPersons(newArrayPersons);
        const personIsSelectedForRedux = newArrayPersons.find(
          personSearch => personSearch.id === person.id,
        );
        if (personIsSelectedForRedux) {
          dispatch(addPersonToCreateEpisode(personIsSelectedForRedux));
        }
      }
    },
    [dispatch, listPersons],
  );

  const handleIsSelectedLocation = useCallback(
    (location: Location) => {
      if (location.isSelected === false) {
        const newArraLocations = listLocations.map(item =>
          item.id === location.id ? { ...item, isSelected: true } : item,
        );
        setListLocations(newArraLocations);
      }
    },
    [listLocations],
  );

  const handleRemoveList = useCallback(
    (person: Person) => {
      const newArrayPersons = listPersons.map(item =>
        item.id === person.id ? { ...item, isSelected: false } : item,
      );
      setListPersons(newArrayPersons);
      const personIsSelectedForRedux = newArrayPersons.find(
        personSearch => personSearch.id === person.id,
      );
      if (personIsSelectedForRedux !== undefined) {
        dispatch(removePersonToCreateEpisode(personIsSelectedForRedux));
      }
    },
    [dispatch, listPersons],
  );

  function handleCreateEpisode() {
    const listEpisodes = localStorage.getItem('rickandmorty:storage');
    if (listEpisodes) {
      const episodes = JSON.parse(listEpisodes);
      episodes.push(boxAdd);
      localStorage.setItem('rickandmorty:storage', JSON.stringify(episodes));
    } else {
      const episodes = [];
      episodes.push(boxAdd);
      localStorage.setItem('rickandmorty:storage', JSON.stringify(episodes));
    }
  }

  if (loading && loadingLocations) {
    <h1>Carregando...</h1>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.listPersonsLocations}>
        <section>
          {listPersons.map(person => (
            <PersonCard
              key={person.id}
              name={person.name}
              gender={person.gender}
              image={person.image}
              species={person.species}
              isSelected={person.isSelected}
              onClick={() => handleIsSelected(person)}
            />
          ))}
        </section>
        <section>
          {listLocations.map(location => (
            <LocationCard
              key={location.id}
              name={location.name}
              dimension={location.dimension}
              isSelected={location.isSelected}
              onClick={() => handleIsSelectedLocation(location)}
            />
          ))}
        </section>
      </div>
      <div className={styles.listCreateEpisode}>
        <div className={boxAdd.length > 0 ? styles.boxAdd : styles.boxAddFlex}>
          {boxAdd.length > 0 ? (
            <>
              {boxAdd?.map(person => (
                <div className={styles.cardAdd} key={person.id}>
                  <button
                    type="button"
                    onClick={() => handleRemoveList(person)}
                  >
                    x
                  </button>
                  <img src={person.image} alt={person.name} />
                </div>
              ))}
            </>
          ) : (
            <>
              <img src={sadImage} alt="icone de carinha triste" />
              <p>Você ainda não adicionou nada.</p>
            </>
          )}
        </div>
        <footer className={styles.footer}>
          <Button onClick={() => handleCreateEpisode()}>Criar epísodio</Button>
        </footer>
      </div>
    </div>
  );
}

export default Home;
