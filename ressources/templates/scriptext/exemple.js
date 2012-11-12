importPackage(Packages.javax.swing);

function load(parentframe, profile) {
    println("debug");

	JOptionPane.showMessageDialog(parentframe,
		"Hello World!", "Test", javax.swing.JOptionPane.WARNING_MESSAGE);
}

function unload() {
}
