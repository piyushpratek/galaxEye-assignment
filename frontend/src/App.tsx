import { useEffect, useState } from "react";
import { MapContainer, TileLayer, FeatureGroup, Polygon } from "react-leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import L, { LatLng, LatLngLiteral } from "leaflet";
import 'leaflet/dist/leaflet.css';
import "leaflet-draw/dist/leaflet.draw.css";
import tilesData from "./data/karnataka.json"
import booleanIntersects from "@turf/boolean-intersects";
import { GeoJSONTile } from "./types/types";

function App() {
  const [drawnLayers, setDrawnLayers] = useState<LatLngLiteral[][]>([]);
  const [intersectingTiles, setIntersectingTiles] = useState<GeoJSONTile[]>([]);

  useEffect(() => {
    const tiles = tilesData.features;
    const intersectingTiles: GeoJSONTile[] = [];

    tiles.forEach((tile: any) => {
      const tileCoords = tile.geometry.coordinates[0];
      const tileLatLngs: LatLng[] = tileCoords.map(
        (coord: number[]) => new LatLng(coord[1], coord[0])
      );

      if (drawnLayers.length > 0) {
        const drawnCoords = drawnLayers[0].map(
          (latLng: LatLngLiteral) => new LatLng(latLng.lat, latLng.lng)
        );

        const tilePolygon = L.polygon(tileLatLngs);
        const drawnPolygon = L.polygon(drawnCoords);

        const tileGeoJSON = L.geoJSON(tilePolygon.toGeoJSON());
        const drawnGeoJSON = L.geoJSON(drawnPolygon.toGeoJSON());

        if (booleanIntersects(tileGeoJSON.toGeoJSON(), drawnGeoJSON.toGeoJSON())) {
          intersectingTiles.push(tile);
        }
      }
    });

    setIntersectingTiles(intersectingTiles);
  }, [drawnLayers]);

  const onDrawCreated = (e: any) => {
    const layer = e.layer;
    const latLngs: L.LatLng[][] = layer.getLatLngs();
    const latLngArray: LatLngLiteral[] = latLngs[0].map((latLng: L.LatLng) => ({
      lat: latLng.lat,
      lng: latLng.lng,
    }));
    setDrawnLayers([latLngArray]);
  };

  return (
    <div className="App">
      <MapContainer center={[12.9716, 77.5946]} zoom={6} style={{ height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FeatureGroup>
          <EditControl
            position="topright"
            draw={{
              polygon: {
                allowIntersection: false,
                drawError: {
                  color: "#e1e100",
                  timeout: 1000,
                },
                shapeOptions: {
                  color: "#97009c",
                },
              },
              circlemarker: false,
              polyline: false,
              rectangle: false,
              circle: false,
              marker: false,
            }}
            onCreated={onDrawCreated}
          />
          {drawnLayers.map((latLngArray, index) => (
            <Polygon key={index} positions={latLngArray} color="red" />
          ))}
          {intersectingTiles.map((tile: GeoJSONTile, index: number) => (
            <Polygon
              key={`intersecting-tile-${index}`}
              positions={tile.geometry.coordinates[0].map(
                (coord: number[]) => new LatLng(coord[1], coord[0])
              )}
              color="blue"
            />
          ))}
          {tilesData.features.map((tile: GeoJSONTile, index: number) => (
            <Polygon
              key={`tile-${index}`}
              positions={tile.geometry.coordinates[0].map(
                (coord: number[]) => new LatLng(coord[1], coord[0])
              )}
              color="#00f"
              fillOpacity={0.2}
            />
          ))}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

export default App;
