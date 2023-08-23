import LocationMarker from "./component/LocationMarker"
import "./App.css"
import { getIntersectingTiles } from "./component/getIntersectingTiles";
import tilesData from "./data/karnataka.json"
import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-draw";
import { MapContainer, TileLayer } from "react-leaflet";
import { TileFeature } from "./types";

const App: React.FC = () => {
  const [aoi, setAoi] = useState<L.Layer | null>(null);
  const [intersectingTiles, setIntersectingTiles] = useState<TileFeature[]>([]);

  useEffect(() => {
    if (tilesData.features.length > 0 && aoi) {
      let aoiGeoJSON;

      if (aoi instanceof L.Marker) {
        const marker = aoi as L.Marker;
        aoiGeoJSON = marker.toGeoJSON();
      } else if (aoi instanceof L.Polygon) {
        const polygon = aoi as L.Polygon;
        aoiGeoJSON = polygon.toGeoJSON();
      } else if (aoi instanceof L.Polyline) {
        const polyline = aoi as L.Polyline;
        aoiGeoJSON = polyline.toGeoJSON();
      }

      const intersectingTiles = getIntersectingTiles(
        aoiGeoJSON,
        tilesData.features
      );
      setIntersectingTiles(intersectingTiles);
    }
  }, [aoi]);

  useEffect(() => {
    const map = L.map("map");
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          shapeOptions: {
            color: "blue",
          },
        },
        rectangle: false,
        circle: false,
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e: L.LeafletEvent) => {
      drawnItems.clearLayers();
      const layer = (e as L.DrawEvents.Created).layer;
      drawnItems.addLayer(layer);
      setAoi(layer);
    });
    return () => {
      map.remove()
    }
  }, []);
  const mapRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className="app">
        <h1>GalaxEye Dashboard</h1>
        <div ref={mapRef} id="map" style={{ height: "100vh", width: "100%" }} />
        <MapContainer
          id="map"
          center={[12.9716, 77.5946]}
          zoom={13}
          style={{ height: "100vh", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          />
        </MapContainer>
        <LocationMarker intersectingTiles={intersectingTiles} />
      </div>
    </>
  )
}

export default App


