import * as turf from '@turf/turf';

interface Geometry {
    type: string;
    coordinates: number[][][];
}

interface Properties {
    [key: string]: string | number | boolean;
}

export interface Feature {
    type: string;
    properties: Properties;
    geometry: Geometry;
}


export function getIntersectingTiles(aoi: Feature, tiles: Feature[]): Feature[] {
    const intersectingTiles = tiles.filter((tile) => {
        const intersection = turf.intersect(aoi.geometry, tile.geometry);
        return intersection !== null;
    });

    return intersectingTiles;
}

