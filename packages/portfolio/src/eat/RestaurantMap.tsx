import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Center, Match } from "./model";
export default function RestaurantMap({
  center,
  radius,
  restaurants,
  selected,
  onSelect,
}: {
  center: Center;
  radius: number;
  restaurants: Match[];
  selected?: string;
  onSelect: (id: string) => void;
}) {
  const element = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map>();
  const markers = useRef(new Map<string, L.Marker>());
  const callback = useRef(onSelect);
  callback.current = onSelect;
  const boundsRef = useRef<L.LatLngBounds>();
  const selectionRef = useRef(selected);
  selectionRef.current = selected;
  const [tileError, setTileError] = useState(false);
  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const m = L.map(element.current, {
      zoomControl: false,
      zoomAnimation: !reduce,
      fadeAnimation: !reduce,
      markerZoomAnimation: !reduce,
    }).setView([center.lat, center.lon], 12);
    map.current = m;
    L.control.zoom({ position: "bottomright" }).addTo(m);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    })
      .on("tileerror", () => setTileError(true))
      .addTo(m);
    const observer = new ResizeObserver(() => {
      if (!element.current?.clientWidth || !element.current?.clientHeight)
        return;
      m.invalidateSize({ animate: false });
      if (boundsRef.current)
        m.fitBounds(boundsRef.current, {
          padding: [45, 45],
          maxZoom: 15,
          animate: false,
        });
      const selectedMarker = markers.current.get(selectionRef.current);
      if (selectedMarker)
        m.panTo(selectedMarker.getLatLng(), { animate: false });
    });
    observer.observe(element.current);
    return () => {
      observer.disconnect();
      m.remove();
      map.current = undefined;
    };
  }, []);
  useEffect(() => {
    const m = map.current;
    if (!m) return;
    const group = L.layerGroup().addTo(m);
    markers.current.clear();
    const circle = L.circle([center.lat, center.lon], {
      radius: radius * 1609.344,
      color: "#607863",
      fillOpacity: 0.035,
      weight: 1,
      dashArray: "5 7",
      interactive: false,
    }).addTo(group);
    const label = document.createElement("span");
    label.textContent = center.label;
    L.circleMarker([center.lat, center.lon], {
      color: "#fff",
      fillColor: "#365ac6",
      fillOpacity: 1,
      radius: 7,
      weight: 3,
    })
      .bindTooltip(label)
      .addTo(group);
    restaurants.forEach((r, i) => {
      const marker = L.marker([r.lat, r.lon], {
        title: r.name,
        alt: `Select ${r.name}`,
        keyboard: true,
        icon: L.divIcon({
          className: "eat-pin",
          html: `<span>${i + 1}</span>`,
          iconSize: [40, 44],
          iconAnchor: [20, 44],
        }),
      });
      const popup = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = r.name;
      const distance = document.createElement("p");
      distance.textContent = `${r.distance.toFixed(1)} mi · straight-line`;
      popup.append(name, distance);
      marker.bindPopup(popup);
      marker.on("click", () => callback.current(r.id));
      marker.addTo(group);
      markers.current.set(r.id, marker);
    });
    const bounds = restaurants.length
      ? L.latLngBounds([
          [center.lat, center.lon],
          ...restaurants.map((r) => [r.lat, r.lon] as L.LatLngTuple),
        ])
      : circle.getBounds();
    boundsRef.current = bounds;
    if (element.current.clientWidth && element.current.clientHeight)
      m.fitBounds(bounds, { padding: [45, 45], maxZoom: 15, animate: false });
    return () => {
      group.remove();
      markers.current.clear();
    };
  }, [center, radius, restaurants]);
  useEffect(() => {
    for (const [id, marker] of markers.current) {
      marker.getElement()?.classList.toggle("is-selected", id === selected);
      marker.setZIndexOffset(id === selected ? 1000 : 0);
      if (id === selected) {
        marker.openPopup();
        map.current?.panTo(marker.getLatLng(), {
          animate: !matchMedia("(prefers-reduced-motion: reduce)").matches,
        });
      } else marker.closePopup();
    }
  }, [selected, restaurants]);
  return (
    <div className="eat-map-shell">
      <div
        ref={element}
        className="eat-map"
        aria-label="Interactive restaurant map"
      />
      <div className="eat-map-legend">
        <i /> Search center <span>Dashed circle: {radius} mi</span>
      </div>
      {tileError && (
        <p className="eat-tile-error" role="status">
          Map tiles are unavailable. Restaurant markers and the list still work.
        </p>
      )}
    </div>
  );
}
