export interface TileFeature {
    type: string;
    properties: {
        [key: string]: string | number | boolean;
    };
    geometry: {
        type: string;
        coordinates: number[][][];
    };
}

export type GeoJsonObject = {
    type: "Feature" | "Polygon" | "Point" | "MultiPoint" | "LineString" | "MultiLineString" | "MultiPolygon" | "GeometryCollection" | "FeatureCollection";

    properties: {
        [key: string]: string | number | boolean;
    };
    geometry: {
        type: string;
        coordinates: number[][][];
    };
};