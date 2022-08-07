import { useState, useEffect, useCallback } from "react";
import { BiCalendarEvent } from "react-icons/bi";
import Search from "./components/Search";
import AddAppointment from './components/AddAppointment';
import AppointmentInfo from "./components/AppointmentInfo";

function App() {

  let [appointmentList, setAppointmentList] = useState([]);

  const fetchData = useCallback(() => {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        setAppointmentList(data)
      })
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDeleteAppointment = (appointmentId) => {
    const filteredList = appointmentList.filter(appointment => appointment.id !== appointmentId);
    setAppointmentList(filteredList);
  }

  return (
    <div className="App container mx-auto mt-3 font-thin">
      <h1 className="text-5xl mb-5">
        < BiCalendarEvent className="inline-block align-top text-blue-500" /> Your Appointments
      </h1>
      <AddAppointment />
      <Search />
      <ul className="divide-y divide-gray-200">
        {
          appointmentList.map(appointment => (
            <AppointmentInfo key={appointment.id} appointment={appointment} onDeleteAppointment={onDeleteAppointment} />
          ))
        }
      </ul>
    </div>
  );
}

export default App;
