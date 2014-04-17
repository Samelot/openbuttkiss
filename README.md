## Installation

1. Download openbuttkiss.

1. In terminal, cd to the plugin folder and run:

    npm install

1. Follow one of the methods below to set up the plugin with a Photoshop Generator.

**Built-in Generator**

Place the plugin inside the Photoshop Plug-ins folder:

`Applications/Adobe Photoshop CC/Plug-ins/Generator`

Open Photoshop.

Go to `Photoshop > Preferences > Plug-ins` and check `Enable Generator`. You may need to restart Photoshop for this to take effect.

**External Generator**

Run the plugin from a locally cloned [generator-core](https://github.com/adobe-photoshop/generator-core) library. My workflow consists of having all my plugins inside the generator-core plugins folder.

In terminal, cd to `generator-core` and run:

    node app.js -f test/plugins/openbuttkiss

This app.js contains all the magic needed to run our plugin. The plugin location is specified at the end of the command.

## Running

After completing the above steps, openbuttkiss should now be available for use.

In Photoshop, select the plugin from the drop down menu to enable it:

    File > Generate > openbuttkiss

Send an OSC message with an argument of 1 to `osc.udp://localhost:3333`.

When a message is recieved by the plugin, two things will happen in Photoshop:

1. **The foreground and background colors swap.**

1. **Photoshop is brought to the front of any other applications we have open.**

#### [sizeoverload.com/blog/osc-photoshop/](http://sizeoverload.com/blog/osc-photoshop/)
