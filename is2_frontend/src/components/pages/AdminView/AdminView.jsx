// AdminView.js
import React, { useEffect, useState } from "react";
import APIService from "../../services/APIService";
import PriorityForm from "./PriorityForm";
import StatusForm from "./StatusForm";
import Filter from "./Filter";
import TicketRow from "./TicketRow";
import TicketExpansion from "./TicketExpansion";
import "./TablaAdmin.css";

function AdminView() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState("");
  const [devs, setDevs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSoftware, setSelectedSoftware] = useState("");
  const [selectedUrgency, setSelectedUrgency] = useState("");
  const [selectedFilterDev,setSelectedFilterDev] = useState("");    
  const api_service = new APIService();
  const statusColors = {
    Pending: "status-pending",
    ToDo: "status-to-do",
    Testing: "status-testing",
    Closed: "status-closed",
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSoftwareChange = (event) => {
    setSelectedSoftware(event.target.value);
  };

  const handleUrgencyChange = (event) => {
    setSelectedUrgency(event.target.value);
  };
  const handleFilterDevChange = (event) => {
    setSelectedFilterDev(event.target.value);
  };  
  const filteredBugReports = reports.filter((reports) => {
    const title = reports.title.toString().toLowerCase();
    const status = reports.status.toString().toLowerCase();
    const software = reports.software_name?.toString().toLowerCase();
    const developer = reports.dev_name?.toString().toLowerCase();
    const urgency = reports.urgency.toString().toLowerCase();
    const isMatchingUrgency = selectedUrgency
      ? urgency === selectedUrgency.toLowerCase()
      : true;
      const isMatchingDev = selectedFilterDev
      ? developer === selectedFilterDev.toLowerCase()
      : true;
    const isMatchingTitle = title.includes(searchTerm.toLowerCase());
    const isMatchingStatus = selectedStatus
      ? status === selectedStatus.toLowerCase()
      : true;
    const isMatchingSoftware = selectedSoftware
      ? software === selectedSoftware.toLowerCase()
      : true;
    return (
      isMatchingUrgency &&
      isMatchingTitle &&
      isMatchingStatus &&
      isMatchingSoftware &&
      isMatchingDev
    );
  },[]);
  const statusOptions = Object.keys(statusColors);
  const softwareOptions = [
    ...new Set(reports.map((reports) => reports.software_name)),
  ];
  const urgencyOptions = [
    ...new Set(reports.map((reports) => reports.urgency)),
  ];
  const devOptions = [
    ...new Set(reports.map((reports) => reports.dev_name)),
  ];

  const showData = async () => {
    try {
      const reportsResponse = await api_service.get("reports");
      console.log("reports", reportsResponse);
      setReports(reportsResponse);

      const devsResponse = await api_service.get("devs");
      console.log("devs", devsResponse);
      setDevs(devsResponse || []); // Ensure devsResponse is not undefined
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  /* const handleAssignDeveloper = (ticket, selectedDeveloper) => {
    if (selectedDeveloper) {
      const updatedTicket = {
        ...ticket,
        assignedDeveloper: selectedDeveloper.id,
      };
      updateTicket(updatedTicket);
      // Handle the logic for assigning the selected developer to the ticket
    }
  }; */


  const deleteReport = (report) => {
    if (window.confirm("Estas seguro de que quieres eliminar el reporte?")) {
      api_service.delete("reports", report.id);
      setReports(reports?.filter((item) => item !== report));
    }
  };

  const updateTicket = (updatedTicket) => {
    console.log(updatedTicket);
    const updateTicket = async () => {
      try {
        await api_service.put("reports", updatedTicket.id, updatedTicket);
        setReports(
          reports.map((report) =>
            report.id === updatedTicket.id ? updatedTicket : report
          )
        );
        console.log("Ticket updated successfully:", updatedTicket);
      } catch (error) {
        console.error("Error updating ticket:", error);
      }
    };
    updateTicket();
  };

  const [selectedTicket, setSelectedTicket] = useState(null);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket === selectedTicket ? null : ticket);
  };

  useEffect(() => {
    showData();
    console.log("right here boss");
  }, []);

  return (
    <div className="container mt-4">
      <h1>Vista de lista de bugs</h1>
      <hr />
      {/* <SearchBar search={search} handleSearch={handleSearch} />
      <br />
      <PriorityForm api_service={api_service} />
      <br />
      <StatusForm api_service={api_service} />
      <br /> */}
        <Filter searchTerm={searchTerm}
        selectedStatus={selectedStatus}
        selectedSoftware={selectedSoftware}
        selectedUrgency={selectedUrgency}
        selectedFilterDev={selectedFilterDev}
        filteredBugReports={filteredBugReports}
        handleSearch={handleSearch}
        handleStatusChange={handleStatusChange}
        handleSoftwareChange={handleSoftwareChange}
        handleUrgencyChange={handleUrgencyChange} 
        handleFilterDevChange={handleFilterDevChange}
        statusOptions={statusOptions}
        softwareOptions={softwareOptions}
        urgencyOptions={urgencyOptions}
        devOptions={devOptions}/>      
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Tracking ID</th>
            <th scope="col">Titulo</th>
            <th scope="col">Usuario</th>
            <th scope="col">Software</th>
            <th scope="col">Fecha</th>
            <th scope="col">Prioridad</th>
            <th scope="col">Depurador</th>
            <th scope="col">Estado</th>
            <th scope="col">Accion</th>
          </tr>
        </thead>
        <tbody>
          {filteredBugReports &&
            filteredBugReports.map((ticket, key) => (
              <React.Fragment key={key}>
                <TicketRow
                  ticket={ticket}
                  handleClick={handleTicketClick}
                  deleteReport={deleteReport}
                  selectedTicket={selectedTicket}
                />
                {selectedTicket === ticket && (
                  <TicketExpansion
                    developers={devs}
                    ticket={ticket}
                    handleSubmit={updateTicket}
                  />
                )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminView;
