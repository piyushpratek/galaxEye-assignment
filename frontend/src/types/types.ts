export interface GeoJSONTile {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
    properties: {
        // type: string
        fill: string
    }
}