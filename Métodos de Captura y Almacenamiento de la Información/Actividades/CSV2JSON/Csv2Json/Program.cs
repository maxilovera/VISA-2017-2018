using System;
using System.Linq;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Newtonsoft.Json;

namespace Csv2Json
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Ingrese nombre de archivo");
            string filename = Console.ReadLine();
            string pathFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, filename);

            int counter = 0;
            string line;
            List<Dictionary<string, object>> data = new List<Dictionary<string, object>>();
            string[] columns = new string[] { };
            Console.WriteLine(DateTime.Now + " procesando archivo CSV");

            // Lectura del archivo linea por linea.  
            StreamReader file = new StreamReader(pathFile);
            while ((line = file.ReadLine()) != null)
            {
                if (counter == 0)
                {
                    columns = line.Split(',');
                }
                else
                {
                    var info = line.Split(',');
                    Dictionary<string, object> rowData = new Dictionary<string, object>();
                    for (int i = 0; i < columns.Length; i++)
                    {
                        if (info.Length == columns.Length)
                        {
                            switch (columns[i])
                            {
                                case "category_id":
                                    rowData.Add(columns[i], int.Parse(info[i]));
                                    break;
                                case "publish_time":
                                    rowData.Add(columns[i], DateTime.Parse(info[i]));
                                    break;
                                case "views":
                                    rowData.Add(columns[i], int.Parse(info[i]));
                                    break;
                                case "likes":
                                    rowData.Add(columns[i], int.Parse(info[i]));
                                    break;
                                case "dislikes":
                                    rowData.Add(columns[i], int.Parse(info[i]));
                                    break;
                                case "comment_count":
                                    rowData.Add(columns[i], int.Parse(info[i]));
                                    break;
                                case "comments_disabled":
                                    rowData.Add(columns[i], bool.Parse(info[i]));
                                    break;
                                case "ratings_disabled":
                                    rowData.Add(columns[i], bool.Parse(info[i]));
                                    break;
                                case "video_error_or_removed":
                                    rowData.Add(columns[i], bool.Parse(info[i]));
                                    break;                                         
                                default:
                                    rowData.Add(columns[i], info[i].Replace("\\",""));
                                    break;
                            }                            
                        }
                    }

                    data.Add(rowData);
                }

                counter++;
            }

            file.Close();

            string destinationFile = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, filename + "-converted.json");

            Console.WriteLine(DateTime.Now + " serializando información");
            var csv = JsonConvert.SerializeObject(data);

            Console.WriteLine(DateTime.Now + " guardando archivo en disco");
            File.WriteAllText(destinationFile, csv.ToString());

            Console.WriteLine(DateTime.Now + " Proceso finalizado. Archivo generado: "+ filename + "-converted.json");
            Console.ReadLine();
        }
    }
}
