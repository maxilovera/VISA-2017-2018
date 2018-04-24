//promesa para cargar el archivo de datos.
d3.json("visualizacion_actividad_1.js").then(function (datos) {
    //callback de la funcion
    window.datos = datos;
    
    var d2009 = datos.filter(function (dato) { return dato.Anio == 2009 });
    var d2010 = datos.filter(function (dato) { return dato.Anio == 2010 });
    var d2011 = datos.filter(function (dato) { return dato.Anio == 2011 });
    var d2012 = datos.filter(function (dato) { return dato.Anio == 2012 });

    var nombresMeses = function (d) {
        switch (d) {
            case 1:
                return "Enero"
            case 2:
                return "Febrero"
            case 3:
                return "Marzo"
            case 4:
                return "Abril"
            case 5:
                return "Mayo"
            case 6:
                return "Junio"
            case 7:
                return "Julio"
            case 8:
                return "Agosto"
            case 9:
                return "Septiembre"
            case 10:
                return "Octubre"
            case 11:
                return "Noviembre"
            case 12:
                return "Diciembre"
            default:
                return d;
        }
    }
    
    var width = 1000; //ancho del graafico
    var height = 400; //alto del gráfico
    var margins = { top: 60, right: 40, bottom: 40, left: 40 }; //margnes
    
    var contenedor = d3.select("#grafico"),
        WIDTH = width,
        HEIGHT = height,
        MARGINS = margins,

        //escala de X, es una escala lineal donde el dominio va de 1 a 12 que son los valores de los meses. 
        //Como rango le ponemos desde donde inicia el margen izquierdo (LEFT), hasta el tamaño (WIDTH) menos el margen derecho (right)
        escalaX = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, 12]),

        //escala de X, el dominio va de 0 hasta el maximo valor de los datos (sumando 500 para dar mas contexto sobre el dato mayor)
        escalaY = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, d3.max(datos, function (d) { return d.Cantidad })]),

        //definicion del eje X, se cambia tambien el valor que viene en los datos por el nombre del mes.
        ejeX = d3.axisBottom(escalaX).tickFormat(function (d, i) {
            return nombresMeses(d);
        }),

        //Eje de Y a la izquierda usando la escala de Y
        ejeY = d3.axisLeft(escalaY);

    //Agregamos el eje X al grafico
    contenedor.append("svg:g")        
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(ejeX);

    //Agregamos el eje Y al grafico
    contenedor.append("svg:g")        
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(ejeY);

    //grafico de linea de d3, donde definimos el punto (x,y) que vamos a dibujar. Mes es el X y cantidad es la Y.
    var generarLinea = d3.line().x(function (d) {return escalaX(d.Mes);})
                           .y(function (d) {return escalaY(d.Cantidad);});

    //Se agrega al grafico la linea correspondiente al año 2009
    contenedor.append('svg:path')
        .attr('d', generarLinea(d2009))
        .attr('stroke', 'green') //color de la linea
        .attr('fill', 'none'); //relleno (area) lo dejamos en none, para que solo muestre la linea

    //Se agrega al grafico la linea correspondiente al año 2010
    contenedor.append('svg:path')
        .attr('d', generarLinea(d2010))
        .attr('stroke', 'blue')//color de la linea
        .attr('fill', 'none');//relleno (area) lo dejamos en none, para que solo muestre la linea

    //Se agrega al grafico la linea correspondiente al año 2011
    contenedor.append('svg:path')
        .attr('d', generarLinea(d2011))
        .attr('stroke', 'red')//color de la linea
        .attr('fill', 'none');//relleno (area) lo dejamos en none, para que solo muestre la linea

    //Se agrega al grafico la linea correspondiente al año 2012
    contenedor.append('svg:path')
        .attr('d', generarLinea(d2012)) 
        .attr('stroke', 'black')//color de la linea
        .attr('fill', 'none');//relleno (area) lo dejamos en none, para que solo muestre la linea

    //Agregamos un texto con la descripcion de eje X
    contenedor.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height) + ")")
        .style("text-anchor", "middle")
        .style("font-weight", "bold")
        .text("Meses");

    //Agregamos un texto de título
    contenedor.append("text")
        .attr("transform", "translate(" + (width / 2) + " , 20)") //posicion x, y donde se ubicará el texto
        .style("text-anchor", "middle") //posición centrada
        .style("font-weight", "bold") //ponemos la letra en negrita
        .style("font-size", "18px") //tamaño de la letra
        .text("Evolución de emigrantes españoles - Hombres"); //valor del texto

    //Definicion de los labels de cada año en las lineas. Se coloca cada label al lado de donde finaliza la linea correspondiente. 
    //Usa el mismo color de cada una de las líneas
    contenedor.append("text")
        .attr("transform", "translate(" + (escalaX(d2009[d2009.length - 1].Mes) + 10) + "," + (escalaY(d2009[d2009.length - 1].Cantidad) + 5) + ")")        
        .attr("font-size", "12").attr("font-weight", "normal").attr("stroke", "green").attr("text-anchor", "left")        
        .text("2009");

    contenedor.append("text")
        .attr("transform", "translate(" + (escalaX(d2010[d2010.length - 1].Mes) + 10) + "," + (escalaY(d2010[d2010.length - 1].Cantidad) + 5) + ")")
        .attr("font-size", "12").attr("font-weight", "normal").attr("stroke", "blue").attr("text-anchor", "left")        
        .text("2010");

    contenedor.append("text")
        .attr("transform", "translate(" + (escalaX(d2011[d2011.length - 1].Mes) + 10) + "," + (escalaY(d2011[d2011.length - 1].Cantidad) + 5) + ")")
        .attr("font-size", "12").attr("font-weight", "normal").attr("stroke", "red").attr("text-anchor", "left")        
        .text("2011");

    contenedor.append("text")
        .attr("transform", "translate(" + (escalaX(d2012[d2012.length - 1].Mes) + 10) + "," + (escalaY(d2012[d2012.length - 1].Cantidad) + 5) + ")")
        .attr("font-size", "12").attr("font-weight", "normal").attr("stroke", "black").attr("text-anchor", "left")
        .text("2012");

    //Se agregan los puntos de cada valor de mes en los años correspondientes, 
    //junto con un tooltip de visualización del dato particular de cantidad de emigrantes.
    var div = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

    contenedor.selectAll(".punto-2009")
        .data(d2009) //definimos los datos a utilizar
        .enter() //entramos los datos
        .append("svg:circle") //agregamos un circulo al gráfico
        .attr("r", 3) // circulo con radio 3
        .attr("cx", function (d, i) { escalaX(d.Mes) }) //definimos la posicion X del circulo
        .attr("cy", function (d) { escalaY(d.Cantidad) }) //definimos la posicion Y del circulo
        .on("mouseover", function (d) { //definimos la visualización del tooltip.
            div.transition().duration(200).style("opacity", 1);
            div.html(nombresMeses(d.Mes) + " 2009: " + d.Cantidad)
                .style("background", "#CCC")
                .style("padding", "5px")
                .style("left", (d3.event.pageX - 40) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
        }).on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); }) //definimos cuando se oculta el tooltip
        .attr("fill", "green") //definicion de relleno del color del año
        .attr("stroke", "green") //definicion del color de la linea
        .attr("transform", function (d) { return "translate(" + escalaX(d.Mes) + "," + escalaY(d.Cantidad) + ")"; }); //definición de 

    contenedor.selectAll(".punto-2010")
        .data(d2010) //uso de los datos de 2010
        .enter()
        .append("svg:circle")
        .attr("r", 3)
        .attr("cx", function (d, i) { escalaX(d.Mes) })
        .attr("cy", function (d) { escalaY(d.Cantidad) })
        .on("mouseover", function (d) {
            div.transition().duration(200).style("opacity", 1);
            div.html(nombresMeses(d.Mes) + " 2010: " + d.Cantidad)
                .style("background", "#CCC")
                .style("padding", "5px")
                .style("left", (d3.event.pageX - 40) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
        }).on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); })
        .attr("fill", "blue")
        .attr("stroke", "blue")
        .attr("transform", function (d) { return "translate(" + escalaX(d.Mes) + "," + escalaY(d.Cantidad) + ")"; });

    contenedor.selectAll(".punto-2011")
        .data(d2011) //uso de los datos de 2011
        .enter()
        .append("svg:circle")
        .attr("r", 3)
        .attr("cx", function (d, i) { escalaX(d.Mes) })
        .attr("cy", function (d) { escalaY(d.Cantidad) })
        .on("mouseover", function (d) {
            div.transition().duration(200).style("opacity", 1);
            div.html(nombresMeses(d.Mes) + " 2011: " + d.Cantidad)
                .style("background", "#CCC")
                .style("padding", "5px")
                .style("left", (d3.event.pageX - 40) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
        }).on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); })
        .attr("fill", "red")
        .attr("stroke", "red")
        .attr("transform", function (d) { return "translate(" + escalaX(d.Mes) + "," + escalaY(d.Cantidad) + ")"; });

    contenedor.selectAll(".punto-2012")
        .data(d2012) //uso de los datos de 2012
        .enter()
        .append("svg:circle")
        .attr("r", 3)
        .attr("cx", function (d, i) { escalaX(d.Mes) })
        .attr("cy", function (d) { escalaY(d.Cantidad) })
        .on("mouseover", function (d) {
            div.transition().duration(200).style("opacity", 1);
            div.html(nombresMeses(d.Mes) + " 2012: " + d.Cantidad)
                .style("background", "#CCC")                
                .style("padding", "5px")
                .style("left", (d3.event.pageX - 40) + "px")
                .style("top", (d3.event.pageY - 40) + "px");
        }).on("mouseout", function (d) { div.transition().duration(500).style("opacity", 0); })
        .attr("fill", "black")
        .attr("stroke", "black")
        .attr("transform", function (d) { return "translate(" + escalaX(d.Mes) + "," + escalaY(d.Cantidad) + ")"; });    
})