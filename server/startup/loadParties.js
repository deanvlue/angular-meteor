Meteor.startup(function(){
  if (Parties.find().count() === 0){
    var parties = [
      {
        'name': 'Dubstep-Free Zone A',
        'description': 'Stop the dubstep for just one moment'
      },
      {
        'name': 'All dubstep all the time',
        'description': 'Puros drops de dusbtep all day long'
      },
      {
        'name': 'Savage lounging',
        'description': 'Desde esquivel hasta emmanuel'
      }
    ];

    for (var i = 0; i < parties.length; i++){
      Parties.insert(parties[i]);
    }
  }
});
