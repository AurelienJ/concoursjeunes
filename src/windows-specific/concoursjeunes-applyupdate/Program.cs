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
	class Program {
		static void Main(string[] args)
		{
			if (args.Length == 2)
			{
				string javaPath = GetJVMPath();
				
                if (!string.IsNullOrEmpty(javaPath))
                {
					ProcessStartInfo startInfo = new ProcessStartInfo(javaPath + @"\bin\javaw.exe");
					startInfo.Arguments = Properties.Settings.Default.VMArgs 
                            + " -cp " + Properties.Settings.Default.ClassPath
                            + " " + Properties.Settings.Default.MainClass + " \"" + args[0] + "\" \"" + args[1] + "\"";
					if(Environment.OSVersion.Platform == PlatformID.Win32NT && Environment.OSVersion.Version.Major >= 6)
						startInfo.Verb = "runas";
					Process updateProcess = Process.Start(startInfo);
                    updateProcess.WaitForExit();
				} else {
					MessageBox.Show("Java doit �tre install� pour lancer l'application"); 
				}
			} else {
				Console.WriteLine("usage:");
				Console.WriteLine("concoursjeunes-applyupdate updatePath programPath");
				Console.WriteLine("");
				Console.WriteLine("\t* updatePath: the temp path who contains updated file");
				Console.WriteLine("\t* programPath: the definitive path of application file");
				Console.ReadLine();
				
				//Process.
			}
		}

		/// <summary>
		/// Get the directory of jvm.
		/// Use by default value of jvmPath properties and use desktop default jvm if jvmPath if empty by
		/// reading registry java environment
		/// </summary>
		/// <returns>The path to jvm</returns>
		private static string GetJVMPath()
		{
			string javaPath = null;

			if (!string.IsNullOrEmpty(Properties.Settings.Default.jvmPath))
				javaPath = Properties.Settings.Default.jvmPath;

			if (string.IsNullOrEmpty(javaPath?.Trim()) || !Directory.Exists(javaPath))
			{
				RegistryKey HKLM = Registry.LocalMachine;
				RegistryKey javaReg = HKLM.OpenSubKey(@"SOFTWARE\JavaSoft\Java Runtime Environment");

				if (javaReg == null)
					javaReg = HKLM.OpenSubKey(@"SOFTWARE\Wow6432Node\JavaSoft\Java Runtime Environment");

				if (javaReg != null)
				{
					object version = javaReg.GetValue(@"CurrentVersion");
					javaPath = javaReg.OpenSubKey((string)version).GetValue("JavaHome") as string;
				}
			}

			return javaPath;
		}
	}
}
