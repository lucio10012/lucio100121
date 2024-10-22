// Configuración de Firebase
var firebaseConfig = {
    apiKey: "eDQDzfdOyT4c977sCBL0ksd48BkqskFp48S06qFb",
    authDomain: "proyectocompostera-fed11.firebaseapp.com",
    databaseURL: "https://proyectocompostera-fed11-default-rtdb.firebaseio.com",
    projectId: "proyectocompostera-fed11",
    storageBucket: "proyectocompostera-fed11.appspot.com",
    messagingSenderId: "TU_SENDER_ID",
    appId: "TU_APP_ID"
  };

  
  // Inicializa Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  
  // Carga Google Charts
  google.charts.load('current', { packages: ['gauge'] });
  google.charts.setOnLoadCallback(drawChart);
  
  function drawChart() {
    // Solo mostramos la temperatura
    var data = google.visualization.arrayToDataTable([
      ['Label', 'Value'],
      ['', 0]
    ]);
  
    var options = {
      width: 500,
      height: 300,
      redFrom: 35, redTo: 50, // Definimos los rangos de temperatura
      yellowFrom: 30, yellowTo: 35,
      minorTicks: 5,
      max: 50  // Máxima temperatura en el gráfico
    };
  
    var chart = new google.visualization.Gauge(document.getElementById('chart_div'));
  
    chart.draw(data, options);
  
    // Escucha los cambios en la base de datos de Firebase
    database.ref('compostaje/estado_actual').on('value', function(snapshot) {
      var compostData = snapshot.val();
      data.setValue(0, 1, compostData.tempera_compos); // Actualiza la temperatura de la compostera
      chart.draw(data, options); // Dibuja el gráfico actualizado
    });
  }
  