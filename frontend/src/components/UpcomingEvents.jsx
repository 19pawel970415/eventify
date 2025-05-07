import React from 'react';
import EventCard from './EventCard';

export default function UpcomingEvents({ events }) {
  const now = Date.now();
  const weekLater = now + 7 * 24 * 60 * 60 * 1000;
  const upcoming = events
    .filter(e => {
      const t = new Date(e.eventDate).getTime();
      return t >= now && t <= weekLater;
    })
    .sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

  return (
    <section className="py-5 bg-light">
      <div className="container px-5">
        <h2 className="mb-4 text-center">Wydarzenia w ciągu najbliższych 7 dni</h2>
        <div className="row gx-5 justify-content-center">
          <div className="col-lg-8">
            <ul className="list-group">
              {upcoming.length > 0
                ? upcoming.map(evt => <EventCard key={evt.id} evt={evt} />)
                : <li className="list-group-item text-center">Brak wydarzeń w ciągu najbliższych 7 dni.</li>
              }
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
