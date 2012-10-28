using System;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;
using System.IO;
using Microsoft.Win32;
using System.Windows.Forms;
using System.Security.Permissions;

namespace AJDeveloppement.ArcCompetition
{
    //[assembly: RegistryPermissionAttribute(SecurityAction.RequestMinimum, ViewAndModify = "HKEY_CURRENT_USER")]
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length == 2)
            {
                string javaPath = GetJavaPath();

                if (javaPath != null)
                {
                    ExecuteUpdateCommand(javaPath, args[0], args[1]);
                }
                else
                {
                    MessageBox.Show("Java doit être installé pour lancer l'application");
                }

                if (!String.IsNullOrEmpty(Properties.Settings.Default.AfterUpdateCommand))
                    ExecuteAfterUpgradeCommand(Properties.Settings.Default.AfterUpdateCommand, null);
            }
            else
            {
                Console.WriteLine("usage:");
                Console.WriteLine("concoursjeunes-applyupdate updatePath programPath");
                Console.WriteLine("");
                Console.WriteLine("\t* updatePath: the temp path who contains updated file");
                Console.WriteLine("\t* programPath: the definitive path of application file");
                Console.ReadLine();
            }
        }

        private static string GetJavaPath()
        {
            RegistryKey HKLM = Registry.LocalMachine;
            RegistryKey javaReg = HKLM.OpenSubKey(@"SOFTWARE\JavaSoft\Java Runtime Environment");

            if (javaReg == null)
                javaReg = HKLM.OpenSubKey(@"SOFTWARE\Wow6432Node\JavaSoft\Java Runtime Environment");

            if (javaReg != null)
            {
                object version = javaReg.GetValue(@"CurrentVersion");
                return (string)javaReg.OpenSubKey((string)version).GetValue("JavaHome");
            }

            return null;
        }

        private static void ExecuteUpdateCommand(string javaPath, string updatPath, string programPath)
        {
            string applyUpdateLib =  Properties.Settings.Default.ApplyUpdateLib;
            if (File.Exists(Path.Combine(updatPath + @"\files", Properties.Settings.Default.ApplyUpdateLib)))
                applyUpdateLib = Path.Combine(updatPath + @"\files", Properties.Settings.Default.ApplyUpdateLib);

            ProcessStartInfo startInfo = new ProcessStartInfo(javaPath + @"\bin\javaw.exe");
            startInfo.Arguments = Properties.Settings.Default.VMArgs
                    + " -cp " + applyUpdateLib
                    + " " + Properties.Settings.Default.MainClass + " \"" + updatPath + "\" \"" + programPath + "\"";
            if (Environment.OSVersion.Platform == PlatformID.Win32NT && Environment.OSVersion.Version.Major >= 6)
                startInfo.Verb = "runas";
            Process updateProcess = Process.Start(startInfo);
            updateProcess.WaitForExit();
        }

        private static void ExecuteAfterUpgradeCommand(string command, string args = null)
        {
            ProcessStartInfo startInfo = new ProcessStartInfo(command);
            if (args != null)
                startInfo.Arguments = args;
            Process.Start(startInfo);
        }
    }
}
