import './DashboardPage.css';
import React, { useState, useEffect } from 'react';
import StatsSection from '../../components/StatsSection/StatsSection';
import Map from '../../components/Map/Map';
import CountiesSection from '../../components/CountiesSection/CountiesSection';
import DateSection from '../../components/DateSection/DateSection';
const axios = require('axios').default;

export default function DashboardPage({ user }) {
  const [usData, setUsData] = useState([]);
  const [historicalUsData, setHistoricalUsData] = useState([]);
  const [usCountiesCases, setUsCountiesCases] = useState([]);
  const [usCountiesDeaths, setUsCountiesDeaths] = useState([]);
  const onDashboard = true;

  function getUSData() {
    axios.get('https://corona.lmao.ninja/v2/countries/USA?yesterday=true&strict=true&query')
    .then(res => {
      const apiDataArr = Object.entries(res.data).map(([stat, val]) => ({stat, val}));
      setUsData(apiDataArr);
    })
    .catch(err => {
      console.log(err);
    });
  };

  function getHistoricalUSData() {
    axios.get('https://corona.lmao.ninja/v2/historical/USA?lastdays=30')
    .then(res => {
      const apiDataArr = Object.entries(res.data).map(([stat, val]) => ({stat, val}));
      setHistoricalUsData(apiDataArr[2].val);
    })
    .catch(err => {
      console.log(err);
    });
  }

  function getTopCountiesData() {
    axios.get('https://corona.lmao.ninja/v2/jhucsse/counties')
    .then(res => {
      const apiDataArr = Object.entries(res.data).map(([stat, val]) => ({stat, val})).sort((acc, curr) => curr.val.stats.confirmed - acc.val.stats.confirmed);
      const sortedCountiesCases = apiDataArr.sort((acc, curr) => curr.val.stats.confirmed - acc.val.stats.confirmed);
      const usCountiesCasesTemp = sortedCountiesCases.slice(0, 25);
      setUsCountiesCases(usCountiesCasesTemp);
      const sortedCountiesDeaths = apiDataArr.sort((acc, curr) => curr.val.stats.deaths - acc.val.stats.deaths);
      const usCountiesDeathsTemp = sortedCountiesDeaths.slice(0, 25);
      setUsCountiesDeaths(usCountiesDeathsTemp);
    })
    .catch(err => {
      console.log(err);
    });
  };

  useEffect(() => getUSData() , []);
  useEffect(() => getHistoricalUSData() , []);
  useEffect(() => getTopCountiesData(), []);

  return (
    <div className="dashboard flex-ctr-ctr">
      <div className="stats"><StatsSection onDashboard={onDashboard} dbData={usData} dbHistoricalData={historicalUsData} /></div>
      <div className="map"><Map onDashboard={onDashboard} /></div>
      <div className="counties"><CountiesSection onDashboard={onDashboard} dbCountiesCases={usCountiesCases} dbCountiesDeaths={usCountiesDeaths} /></div>
      <div className="date"><DateSection user={user} /></div>
    </div>
  );
}