export class TripService{
trips = [
    {
        id : 1,
        name : 'Gros Trip'
    },
    {
        id : 2,
        name : 'Samerlipopette'
    }
];

addTrip(name: string) {
    const tripObject = {
      id: 0,
      name: '',
    };
    tripObject.name = name;
    tripObject.id = this.trips[(this.trips.length - 1)].id + 1;
    this.trips.push(tripObject);
}
getTripById(id: number) {
    const trip = this.trips.find(
      (s) => {
        return s.id === id;
      }
    );
    return trip;
}


}