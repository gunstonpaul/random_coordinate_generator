const coordinateGenerator = async (boundary) =>{
    const longitudes = [];
    const lattidues = [];
    const coordinates = JSON.parse(boundary.boundary);
    for (let index = 0; index < coordinates.length; index++) {
        longitudes.push(coordinates[index][0]);
        lattidues.push(coordinates[index][1]);
    }
    lattidues.sort(function(a, b){return a-b});
    longitudes.sort(function(a, b){return a-b});

    const northMostPoint = lattidues.slice(-1)[0]; 
    const southMostPoint = lattidues[0];
    const westMostPoint = longitudes[0];
    const eastMostPoint = longitudes.slice(-1)[0];
    
    const getRandomCoordinatesWithinBoundardy = async function (northMostPoint, southMostPoint, westMostPoint, eastMostPoint) {
        const randomCoordinates = [];
        const generateRandomCoordinate = () => {
            const randomLattitude =   Math.random() * (northMostPoint - southMostPoint + 1) + southMostPoint;
            const randomLongitude = Math.random() * (eastMostPoint - westMostPoint + 1) + westMostPoint;
            return [randomLongitude.toFixed(6),randomLattitude.toFixed(6)];
        }
        for (let index = 0; index < 5; index++) {
            await randomCoordinates.push(generateRandomCoordinate());
        }
        return randomCoordinates;
    }

    const randomCoordinatesWithinBoundardy = await getRandomCoordinatesWithinBoundardy(northMostPoint, southMostPoint, westMostPoint, eastMostPoint);

    return new Promise((resolve, reject) => {
      resolve(randomCoordinatesWithinBoundardy);
      })
};

export {coordinateGenerator};