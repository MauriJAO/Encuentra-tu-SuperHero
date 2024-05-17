
$(document).ready(function() {
    $('#searchButton').click(function() {
      const heroId = $('#heroId').val();
  
      if (!heroId || isNaN(heroId) || heroId < 1 || heroId > 732) {
        alert('Debes ingresar un ID válido');
        return;
      }
  
      const url = `https://www.superheroapi.com/api.php/4905856019427443/${heroId}`;
  
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            console.log(data);
          if (!data) {
            alert('No se encontró información para el ID especificado');
            return;
          }
          //Tarjeta de información
          const heroInfo = `
            <div class="card mb-3" style="width: 100%;">
                <div class="row col-12">
                    <div class="col-md-4">
                        <img src="${data.image.url}" class="img-fluid rounded-start" style="height: 100%; alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">${data.name}</h5>
                        <hr>
                        <p class="card-text"><strong>Conexiones:</strong>${data.connections["group-affiliation"]}</p>
                        <p class="card-text"><strong>Publicado por:</strong> ${data.biography.publisher}</p>
                        <hr>
                        <p class="card-text"><strong>Ocupación:</strong> ${data.work.occupation}</p>
                        <hr>
                        <p class="card-text"><strong>Altura:</strong> ${data.appearance.height[1]}</p>
                        <hr>
                        <p class="card-text"><strong>Peso:</strong> ${data.appearance.weight[1]}</p>
                        <hr>
                        <p class="card-text"><strong>Alianzas:</strong> ${data.biography.aliases}</p>
                    </div>
                    </div>
                </div>
            </div>
            
            `
            ;

            $('#heroInfo').html(heroInfo);

            const stats = [
                { y: parseInt(data.powerstats.intelligence), label: "intelligence" },
                { y: parseInt(data.powerstats.strength), label: "strength" },
                { y: parseInt(data.powerstats.speed), label: "speed" },
                { y: parseInt(data.powerstats.durability), label: "durability" },
                { y: parseInt(data.powerstats.power), label: "power" },
                { y: parseInt(data.powerstats.combat), label: "combat" },
            ];

            
            const filteredStats = stats.filter(stat => !isNaN(stat.y) && stat.y !== null);

            //Powestats de mayor a menor
            if (filteredStats.length === 0) {
                $('#stats').html('No hay valores para mostrar');
            } else {    
                const sortedStats = filteredStats.sort((a, b) => b.y - a.y);

                const sortedYValues = [];
                for (const stat of sortedStats) {
                    sortedYValues.push(stat.y + "-" + stat.label);
                }

                const sortedYString = 'Valores de stats ordenados de mayor a menor: ' + sortedYValues.join(', ');

                $('#stats').html(sortedYString);
            }
            
            //Grafico de pastel
            const options = {
                backgroundColor: "#E5E5D7",
                title: {
                    text: `Estadísticas de Poder para ${data.name}`
                },
                animationEnabled: true,
                data: [{
                    type: "pie",
                    startAngle: 40,
                    toolTipContent: "<b>{label}</b>: {y}",
                    showInLegend: "true",
                    legendText: "{label}",
                    indexLabelFontSize: 16,
                    indexLabel: "{label} - {y}",
                    dataPoints: filteredStats
                }]
            };

            $("#myChart").CanvasJSChart(options);
        },
        error: function(error) {
          console.error('Error al buscar superhéroe:', error);
          alert('Error al buscar superhéroe');
        }
      });
    });
  });
  

