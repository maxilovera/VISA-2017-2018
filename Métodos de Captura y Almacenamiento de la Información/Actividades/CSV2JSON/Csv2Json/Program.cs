using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace Csv2Json
{
    class Dato
    {
        public string Longitud { get; set; }
        public string Latitud { get; set; }
        public string Enero { get; set; }
        public string Febrero { get; set; }
        public string Marzo { get; set; }
        public string Abril { get; set; }
        public string Mayo { get; set; }
        public string Junio { get; set; }
        public string Julio { get; set; }
        public string Agosto { get; set; }
        public string Septimbre { get; set; }
        public string Octubre { get; set; }
        public string Noviembre { get; set; }
        public string Diciembre { get; set; }
        public string Media { get; set; }
        public string Desviacion { get; set; }
    }

    class Program
    {
        static void Main(string[] args)
        {
            string pathFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "result.csv");

            int counter = 0;
            string line;
            List<Dato> data = new List<Dato>();

            // Lectura del archivo linea por linea.  
            StreamReader file = new StreamReader(pathFile);
            while ((line = file.ReadLine()) != null)
            {
                if (counter > 0 && counter < 6)
                {
                    data.Add(ProcessData(line));
                }

                counter++;
            }

            file.Close();

            string destinationFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "converted.json");

            var csv = JsonConvert.SerializeObject(data);

            File.WriteAllText(destinationFile, csv.ToString());
        }

        private static Dato ProcessData(string line)
        {
            string[] data = line.Split(',');

            return new Dato()
            {
                Longitud = data[0].ToString(),
                Latitud = data[1].ToString(),
                Enero = data[2].ToString(),
                Febrero = data[3].ToString(),
                Marzo = data[4].ToString(),
                Abril = data[5].ToString(),
                Mayo = data[6].ToString(),
                Junio = data[7].ToString(),
                Julio = data[8].ToString(),
                Agosto = data[9].ToString(),
                Septimbre = data[10].ToString(),
                Octubre = data[11].ToString(),
                Noviembre = data[12].ToString(),
                Diciembre = data[13].ToString(),
                Media = data[14].ToString(),
                Desviacion = data[15].ToString(),
            };
        }
    }
}
