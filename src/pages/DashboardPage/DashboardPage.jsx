import './DashboardPage.css';
import React  from 'react';
import USStatsSection from '../../components/USStatsSection/USStatsSection';
import USMap from '../../components/USMap/USMap';
import CountyStatsSection from '../../components/CountyStatsSection/CountyStatsSection';
import DateSection from '../../components/DateSection/DateSection';
// import * as userService from '../../utilities/users-service';


export default function DashboardPage() {
  // async function handleCheckToken() {
  //   const expDate = await userService.checkToken();
  //   console.log(expDate);
  // };

  return (
    <div className="dashboard flex-ctr-ctr">
      <div className="usStats"><USStatsSection /></div>
      <div className="usMap"><USMap /></div>
      <div className="countyStats"><CountyStatsSection /></div>
      <div className="date"><DateSection /></div>
    </div>
  );
}