/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import skyImage from '../../assets/images/sky.png';

import styles from './home.module.scss';

import sadImage from '../../assets/icons/sad.svg';
import { GET_PERSONS, GET_LOCATIONS } from './querys';
import PersonCard from './components/PersonCard';
import LocationCard from './components/LocationCard';

import {
  addPersonToCreateEpisode,
  removePersonToCreateEpisode,
} from '../../store/modules/addEpisode/actions';
import {
  addLocationToCreateEpisode,
  removeLocationToCreateEpisode,
} from '../../store/modules/addLocation/actions';

import { IState } from '../../store';
import { IPerson } from '../../store/modules/addEpisode/types';
import { ILocation } from '../../store/modules/addLocation/types';

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
  const history = useHistory();
  const [listPersons, setListPersons] = useState<Person[]>([]);
  const [listLocations, setListLocations] = useState<Location[]>([]);

  const dispatch = useDispatch();
  const boxAddPersons = useSelector<IState, IPerson[]>(
    state => state.listPersons?.persons,
  );
  const boxAddLocations = useSelector<IState, ILocation[]>(
    state => state.listLocations?.locations,
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

  const handleIsSelectedLocation = useCallback(
    (location: Location) => {
      if (location.isSelected === false) {
        const newArrayLocations = listLocations.map(item =>
          item.id === location.id ? { ...item, isSelected: true } : item,
        );
        setListLocations(newArrayLocations);
        const locationIsSelectedForRedux = newArrayLocations.find(
          personLocation => personLocation.id === location.id,
        );
        if (locationIsSelectedForRedux) {
          dispatch(addLocationToCreateEpisode(locationIsSelectedForRedux));
        }
      }
    },
    [dispatch, listLocations],
  );

  const handleRemoveListLocation = useCallback(
    (location: Location) => {
      const newArrayLocations = listLocations.map(item =>
        item.id === location.id ? { ...item, isSelected: false } : item,
      );
      setListLocations(newArrayLocations);
      const locationIsSelectedForRedux = newArrayLocations.find(
        locationSearch => locationSearch.id === location.id,
      );
      if (locationIsSelectedForRedux !== undefined) {
        dispatch(removeLocationToCreateEpisode(locationIsSelectedForRedux));
      }
    },
    [dispatch, listLocations],
  );

  function handleCreateEpisode() {
    if (boxAddPersons?.length <= 0 || boxAddLocations?.length <= 0) {
      alert('Adicione um personagem e uma localização!');
    } else {
      const listEpisodes = localStorage.getItem('rickandmorty:storage');
      if (listEpisodes) {
        const episodes = JSON.parse(listEpisodes);
        episodes.push([boxAddPersons, boxAddLocations]);
        localStorage.setItem('rickandmorty:storage', JSON.stringify(episodes));
        history.push('/my-episodes');
      } else {
        const episodes = [];
        episodes.push([boxAddPersons, boxAddLocations]);
        localStorage.setItem('rickandmorty:storage', JSON.stringify(episodes));
        history.push('/my-episodes');
      }
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
        <div
          className={
            boxAddPersons.length > 0 || boxAddLocations.length > 0
              ? styles.boxAdd
              : styles.boxAddFlex
          }
        >
          {boxAddPersons.length > 0 || boxAddLocations.length > 0 ? (
            <>
              {boxAddPersons?.map(person => (
                <div className={styles.cardAddPerson} key={person.id}>
                  <button
                    type="button"
                    onClick={() => handleRemoveList(person)}
                  >
                    x
                  </button>
                  <img src={person.image} alt={person.name} />
                </div>
              ))}
              <>
                {boxAddLocations?.map(location => (
                  <div className={styles.cardAddPerson} key={location.id}>
                    <button
                      type="button"
                      onClick={() => handleRemoveListLocation(location)}
                    >
                      x
                    </button>
                    <img src={skyImage} alt={location.name} />
                  </div>
                ))}
              </>
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
