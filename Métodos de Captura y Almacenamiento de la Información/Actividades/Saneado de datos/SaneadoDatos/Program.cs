using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace SaneadoDatos
{
    class Program
    {
        static void Main(string[] args)
        {
            string pathFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "dataset.txt");

            int counter = 0;
            string line;
            List<string> data = new List<string>();

            // Lectura del archivo linea por linea.  
            StreamReader file = new StreamReader(pathFile);
            while ((line = file.ReadLine()) != null)
            {
                if (counter == 0)
                    data.Add(ProcessHeader(line));
                else
                {
                    data.Add(ProcessData(line));
                }

                counter++;
            }

            file.Close();            

            string destinationFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "result.csv");
            var csv = new StringBuilder();            
            
            foreach (var item in data)
            {
                csv.AppendLine(item);
            }

            File.WriteAllText(destinationFile, csv.ToString());
        }

        private static string ProcessData(string line)
        {
            var data = line.Split(" ").Select(x => x.Trim()).Where(x => x.Length > 0).ToList();

            //Que el carácter decimal sea el ‘.’ (punto)
            for (int i = 0; i < data.Count; i++)
            {                
                data[i]= data[i].Replace(',', '.');
            }

            //Eliminar los caracteres extraños de longitud y latitud
            data[0] = data[0].Replace("º", "");
            data[1] = data[1].Replace("º", "");

            //Ponerle el símbolo de temperatura a todas las medidas
            for (int i = 2; i < data.Count; i++)
            {
                if (data[i].IndexOf("º") == -1)
                data[i] = data[i]+ "º";
            }

            //Comprobar que la media es la media aritmética de las temperaturas de los meses del año. 
            //En el caso que no sea correcta indicarlo en una columna adicional con un número que indique la desviación.
            double countTemp = 0;
            for (int i = 2; i < 14; i++)
            {                                
                countTemp+= float.Parse(data[i].Replace("º", ""));
            }

            double media = Math.Round(float.Parse(data[14].Replace("º", "")),1);
            double calculatMedia = Math.Round(countTemp / 12, 1);

            double desv = 0;

            if (media != calculatMedia)
                desv = media - calculatMedia;

            data.Add(desv.ToString("N2"));

            return string.Join(",", data);
        }

        /// <summary>
        /// Obtiene las columnas del encabezado con un split por tab y agrega la columna para la desviación
        /// </summary>
        /// <param name="line"></param>
        /// <returns></returns>
        private static string ProcessHeader(string line)
        {
            var parsedLine = line.Split('\t').Select(x => x.Trim()).Where(x => x.Length > 0).ToList();
            parsedLine.Add("Desviación");

            return string.Join(",", parsedLine);
        }
    }
}
