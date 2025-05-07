import React from 'react';

export default function EventCard({ evt }) {
  const date = new Date(evt.eventDate).toLocaleString();
  const apt = evt.apartmentNumber ? `/${evt.apartmentNumber}` : '';
  return (
    <li className="list-group-item p-4 mb-3 shadow rounded">
      <h5 className="text-primary">{evt.title}</h5>
      <p>
        <strong>Data:</strong> {date}<br />
        <strong>Miasto:</strong> {evt.cityName}<br />
        <strong>Adres:</strong> {evt.street} {evt.buildingNumber}{apt}<br />
        <strong>Cena:</strong> {evt.price} zł
      </p>
    </li>
  );
}
