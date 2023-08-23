import { GeoJSON } from "react-leaflet";
import "./mapStyle.css"
import { Feature } from "./getIntersectingTiles";
import { GeoJsonObject } from "../types";


interface LocationMarkerProps {
    intersectingTiles: Feature[];
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ intersectingTiles }) => {

    return (
        <div id="map-container" className="map-container" >
            <div className="location-marker">
                {intersectingTiles.map((tile, index) => {
                    const geoJsonFeature: GeoJsonObject = {
                        type: "Feature",
                        properties: tile.properties,
                        geometry: {
                            type: "Polygon",
                            coordinates: tile.geometry.coordinates,
                        },
                    };

                    return (
                        <GeoJSON
                            key={index}
                            data={geoJsonFeature}
                            style={() => ({ fill: true })}
                        />
                    );
                })}


            </div>
        </div>
    );
};

export default LocationMarker;
